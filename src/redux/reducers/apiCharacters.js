import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    entities: [],
    status: null,
};


const fetchAPICharacters = createAsyncThunk('apiCharacters/fetchCharacters', async uriCharacter => {
    let {results} = await fetch(uriCharacter).then(res => res.json());
    return results;
});

const fetchMoreCharacters = createAsyncThunk('apiCharacters/fetchMoreCharacters', async uriCharacter => {
    let {results} = await fetch(uriCharacter).then(res => res.json());
    return results;
});


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
                }
                state.status = 'idle';
            });
    },
});

export default apiCharactersSlice.reducer;

