import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    entities: [],
    status: null,
};


export const fetchEpisode = createAsyncThunk('episodes/fetchEpisode', async uriEpisode => {
    let response = await fetch(uriEpisode).then(res => res.json());
    return response;
});


export const selectEpisodeByURI = episodeURI => state => {
    return state.episodes.entities.filter(ep => ep.url === episodeURI)[0];
};


const episodesSlice = createSlice({
    name: 'episodes',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchEpisode.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchEpisode.fulfilled, (state, action) => {
                if (action.payload.error === undefined) {
                    state.entities = [...state.entities, action.payload];
                }
                state.status = 'idle';
            });
    },
});

export default episodesSlice.reducer;
