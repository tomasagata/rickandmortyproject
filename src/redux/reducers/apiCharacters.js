import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    entities: [],
    status: null,
    offset: 1,
};


export const fetchAPICharacters = createAsyncThunk('apiCharacters/fetchCharacters', async (queryObject, thunkAPI) => {
    let uri = 'https://rickandmortyapi.com/api/character/?page=' + 1 + '&name=' + queryObject.name + '&status=' + queryObject.status + '&species=' + queryObject.species + '&gender=' + queryObject.gender;
    let {results} = await fetch(uri).then(res => res.json());
    return results;
});

export const fetchMoreCharacters = createAsyncThunk('apiCharacters/fetchMoreCharacters', async (queryObject, thunkAPI) => {
    let uri = 'https://rickandmortyapi.com/api/character/?page=' + thunkAPI.getState().apiCharacters.offset + '&name=' + queryObject.name + '&status=' + queryObject.status + '&species=' + queryObject.species + '&gender=' + queryObject.gender;
    let {results} = await fetch(uri).then(res => res.json());
    return results;
});


export const selectShownCharacters = state => {
    let excludedCharacters = state.favoriteCharacters.id_entities.map(char => char.character_id);
    let shownCharacters = state.apiCharacters.entities.filter((char) => excludedCharacters.includes(char.id) === false);
    return shownCharacters;
};


const apiCharactersSlice = createSlice({
    name: 'apiCharacters',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAPICharacters.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAPICharacters.fulfilled, (state, action) => {
                if (action.payload !== undefined) {
                    state.entities = action.payload;
                    state.offset = 2;
                } else {
                    state.entities = [];
                }
                state.status = 'idle';
            })
            .addCase(fetchMoreCharacters.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMoreCharacters.fulfilled, (state, action) => {
                if (action.payload !== undefined) {
                    state.entities = [...state.entities, ...action.payload];
                    state.offset = state.offset + 1;
                }
                state.status = 'idle';
            });
    },
});

export default apiCharactersSlice.reducer;

