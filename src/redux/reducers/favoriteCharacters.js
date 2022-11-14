import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    entities: [],
    status: null,
};


const fetchFavorites = createAsyncThunk('favoriteCharacters/fetchFavorites', async () => {

});


const addToFavorites = createAsyncThunk('favoriteCharacters/addToFavorites', async () => {

});


const removeFromFavorites = createAsyncThunk('favoriteCharacters/removeFromFavorites', async () => {

});


const favoriteCharactersSlice = createSlice({
    name: 'favoriteCharacters',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase()
            .addCase()
            .addCase()
            .addCase()
            .addCase()
            .addCase();
    },
});

export default favoriteCharactersSlice.reducer;
