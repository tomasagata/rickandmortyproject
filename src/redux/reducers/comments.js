import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';


const initialState = {
    entities: [],
    status: null,
};


const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    let snapshot = await database().ref('comment_data').once('value');
    return snapshot.val();
});


const pushComment = createAsyncThunk('comments/pushComment', async (queryObject) => {
    let response = await database().ref('comment_data').push().set(queryObject);
    return {
        status: response,
        queryObject,
    };
});


const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchComments.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                if (action.payload !== null) {
                    state.entities = action.payload;
                }
                state.entities = [];
                state.status = 'idle';
            })
            .addCase(pushComment.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(pushComment.fulfilled, (state, action) => {
                if (action.payload.status === null) { //Se cargó bien
                    state.entities = [...state.entities, action.payload.queryObject];
                }
                state.status = 'idle';
            });
    },
});

export default commentsSlice.reducer;
