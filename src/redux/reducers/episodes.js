import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    entities: [],
    status: null,
};


const fetchEpisode = createAsyncThunk('episodes/fetchEpisode', async uriEpisode => {
    let response = await fetch(uriEpisode).then(res => res.json());
    return response;
});


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
                if (action.payload.error !== undefined) {
                    state.entities = [...state.entities, action.payload];
                }
                state.status = 'idle';
            });
    },
});

export default episodesSlice.reducer;
