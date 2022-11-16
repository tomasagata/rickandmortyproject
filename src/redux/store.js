import { configureStore } from '@reduxjs/toolkit';
import apiCharactersReducer from './reducers/apiCharacters';
import commentsReducer from './reducers/comments';
import favoriteCharactersReducer from './reducers/favoriteCharacters.js';
import episodesReducer from './reducers/episodes';

const store = configureStore({
    reducer: {
        comments: commentsReducer,
        favoriteCharacters: favoriteCharactersReducer,
        episodes: episodesReducer,
        apiCharacters: apiCharactersReducer,
    },
});

export default store;
