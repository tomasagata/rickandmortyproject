import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';


const initialState = {
    data_entities: [],
    id_entities: [],
    status: null,
};


const fetchFavoritesIds = createAsyncThunk('favoriteCharacters/fetchFavoritesIds', async (arg, thunkAPI) => {
    return (await database().ref('favorite_ids').once('value')).val();
});


const fetchFavoritesData = createAsyncThunk('favoriteCharacters/fetchFavoritesData', async (arg, thunkAPI) => {
    return (await database().ref('favorite_data').once('value')).val();
});

const fetchCompleteFavorites = createAsyncThunk('favoriteCharacters/fetchCompleteFavorites', async (arg, thunkAPI) => {
    let favorite_ids =  (await database().ref('favorite_ids').once('value')).val();
    let favorite_data =  (await database().ref('favorite_data').once('value')).val();

    return {
        favorite_ids,
        favorite_data,
    };
});


const addToFavorites = createAsyncThunk('favoriteCharacters/addToFavorites', async (arg, thunkAPI) => {

    // Push empty and get key
    let data_key = database().ref('favorite_data').push().key;

    // Wait for data to set
    let char_data_response = await database().ref('favorite_data').child(data_key).set(arg.characterData);

    // Get key to generate a 'light' favoriteIdObject with pointer to real data object
    let id_object_key = database().ref('favorite_ids').push().key;

    // Create the object to be set
    let favorite_id_object = {
        object_id: id_object_key,
        character_id: arg.characterData.id,
        database_id: data_key,
    };

    // Use id key to set the real data
    let char_id_response = await database().ref('favorite_ids').child(id_object_key).set(favorite_id_object);

    console.log('added to favorites');

    return {
        char_data_response,
        char_id_response,
    };
});


const removeFromFavorites = createAsyncThunk('favoriteCharacters/removeFromFavorites', async (arg, thunkAPI) => {
    let char_data_response = await database().ref('favorite_data').child(arg.database_id).set(null);
    let char_id_response = await database().ref('favorite_data').child(arg.object_id).set(null);
    console.log('Removed character id ' + arg.character_id + ' from favorites');
    return {
        char_data_response,
        char_id_response,
    };
});


const favoriteCharactersSlice = createSlice({
    name: 'favoriteCharacters',
    initialState,
    reducers: {

    },
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
                if (action.payload.favorite_ids !== null && action.payload.favorite_data !== null) {
                    state.id_entities = Object.values(action.payload.favorite_ids);
                    state.data_entities = Object.values(action.payload.favorite_data);
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
                state.status = 'idle';
            })
            .addCase(removeFromFavorites.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(removeFromFavorites.fulfilled, (state, action) => {
                state.status = 'idle';
            });
    },
});

export default favoriteCharactersSlice.reducer;
