import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';


const initialState = {
    entities: [],
    status: null,
};


export const fetchComments = createAsyncThunk('comments/fetchComments', async () => {
    let snapshot = await database().ref('comment_data').once('value');
    return snapshot.val();
});


export const pushComment = createAsyncThunk('comments/pushComment', async (queryObject) => {
    let comment_key = database().ref('comment_data').push().key;
    let comment_with_id = {...queryObject, comment_id: comment_key};
    let response = await database().ref('comment_data').child(comment_key).set(comment_with_id);
    return {
        status: response,
        data: comment_with_id,
    };
});

export const editComment = createAsyncThunk('comments/editComment', async (queryObject) => {
    let comment_key = await database().ref(`comment_data/${queryObject.comment_id}`).update({
        comment_string: queryObject.comment_string
    })
});

export const removeComment = createAsyncThunk('comments/removeComment', async (queryObject) => {
    let comment_key = await database().ref(`comment_data/${queryObject.comment_id}`).remove()
});


export const selectCommentsByCharacterId = id => state => {
    return state.comments.entities.filter(comment => comment.character_id === id);
};


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
                    state.entities = Object.values(action.payload);
                } else {
                    state.entities = [];
                }
                state.status = 'idle';
            })
            .addCase(pushComment.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(pushComment.fulfilled, (state, action) => {
                if (action.payload.status === null) { //Se cargó bien
                    state.entities = [...state.entities, action.payload.data];
                }
                state.status = 'idle';
            });
    },
});

export default commentsSlice.reducer;
