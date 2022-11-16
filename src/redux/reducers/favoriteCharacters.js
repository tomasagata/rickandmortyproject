import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

const initialState = {
    data_entities: [],
    id_entities: [],
    status: null,
};

export const fetchFavoritesIds = createAsyncThunk(
    'favoriteCharacters/fetchFavoritesIds',
    async (arg, thunkAPI) => {
        return (await database().ref('favorite_ids').once('value')).val();
    },
);

export const fetchFavoritesData = createAsyncThunk(
    'favoriteCharacters/fetchFavoritesData',
    async (arg, thunkAPI) => {
        return (await database().ref('favorite_data').once('value')).val();
    },
);

export const fetchCompleteFavorites = createAsyncThunk(
    'favoriteCharacters/fetchCompleteFavorites',
    async (arg, thunkAPI) => {
        let favorite_ids = (
            await database().ref('favorite_ids').once('value')
        ).val();
        let favorite_data = (
            await database().ref('favorite_data').once('value')
        ).val();
        return {
            favorite_ids,
            favorite_data,
        };
    },
);

export const addToFavorites = createAsyncThunk('favoriteCharacters/addToFavorites', async (arg, thunkAPI) => {
    // Push empty and get key
    let data_key = database().ref('favorite_data').push().key;

    // Wait for data to set
    await database()
        .ref('favorite_data')
        .child(data_key)
        .set(arg.characterData);

    // Get key to generate a 'light' favoriteIdObject with pointer to real data object
    let id_object_key = database().ref('favorite_ids').push().key;

    // Create the object to be set
    let favorite_id_object = {
        object_id: id_object_key,
        character_id: arg.characterData.id,
        database_id: data_key,
    };

    // Use id key to set the real data
    await database()
        .ref('favorite_ids')
        .child(id_object_key)
        .set(favorite_id_object);

    return {
        id_entity: favorite_id_object,
        data_entity: arg.characterData,
    };
});

export const removeFromFavorites = createAsyncThunk('favoriteCharacters/removeFromFavorites', async (arg, thunkAPI) => {
        await database().ref('favorite_data').child(arg.database_id).set(null);
        await database().ref('favorite_ids').child(arg.object_id).set(null);
        return arg;
    },
);

export const selectFavoriteIdObjects = state => {
    return state.favoriteCharacters.id_entities;
};

export const selectFavoriteIdObjectByCharacterId = id => state => {
    return state.favoriteCharacters.id_entities.filter(
        id_obj => id_obj.character_id === id
    )[0];
};

export const selectAllSavedData = state => {
    return state.favoriteCharacters.id_entities.map(id_ent => {
        let pairing_entity = state.favoriteCharacters.data_entities.filter(
            data_ent => data_ent.id === id_ent.character_id,
        )[0];
        return {
            favorite_data: pairing_entity,
            favorite_id: id_ent,
        };
    });
};

export const selectAllFavoriteCharacterData = state => {
    return state.favoriteCharacters.data_entities;
};

const favoriteCharactersSlice = createSlice({
    name: 'favoriteCharacters',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFavoritesIds.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchFavoritesIds.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.id_entities = Object.values(action.payload);
                } else {
                    state.id_entities = [];
                }
                state.status = 'idle';
            })
            .addCase(fetchFavoritesData.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchFavoritesData.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.data_entities = Object.values(action.payload);
                } else {
                    state.data_entities = [];
                }
                state.status = 'idle';
            })
            .addCase(fetchCompleteFavorites.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCompleteFavorites.fulfilled, (state, action) => {
                if (
                    action.payload.favorite_ids !== null &&
                    action.payload.favorite_data !== null
                ) {
                    state.id_entities = Object.values(
                        action.payload.favorite_ids,
                    );
                    state.data_entities = Object.values(
                        action.payload.favorite_data,
                    );
                } else {
                    state.id_entities = [];
                    state.data_entities = [];
                }
                state.status = 'idle';
            })
            .addCase(addToFavorites.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addToFavorites.fulfilled, (state, action) => {
                state.id_entities = [...state.id_entities, action.payload.id_entity];
                state.data_entities = [...state.data_entities, action.payload.data_entity];
                state.status = 'idle';
            })
            .addCase(removeFromFavorites.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.id_entities = state.id_entities.filter(id_ent => id_ent.character_id !== action.payload.character_id);
                state.data_entities = state.data_entities.filter(data_ent => data_ent.id !== action.payload.character_id);
                state.status = 'idle';
            });
    },
});

export default favoriteCharactersSlice.reducer;
