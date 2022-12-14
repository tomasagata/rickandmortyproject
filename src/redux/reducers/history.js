import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

const initialState = {
    entities: [],
    status: null,
};

export const addHistoryItem = createAsyncThunk('history/addItem', async (queryObject) => {
    // Push empty and get key
    let data_key = database().ref('history').push().key;

    let new_data = {
        ...queryObject,
        history_id: data_key,
    };

    // Wait for data to set
    let response = await database()
        .ref('history')
        .child(data_key)
        .set(new_data);

    return {
        queryObject,
        response,
    };
});

export const getHistory = createAsyncThunk('history/getHistory', async () => {
    return (await database().ref('history').once('value')).val();
    // if (history !== undefined && history !== null){
    //     history.sort((a, b) => )
    // }
});

export const selectAllHistory = state => {
    return state.history.entities;
};

const historySlice = createSlice({
    name: 'history',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getHistory.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getHistory.fulfilled, (state, action) => {
                if (action.payload !== null){
                    if (action.payload !== undefined){
                        state.entities = Object.values(action.payload);
                    } else {
                        state.entities = [];
                    }
                }
                state.status = 'idle';
            })
            .addCase(addHistoryItem.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(addHistoryItem.fulfilled, (state, action) => {
                if (action.payload.response === null && action.payload.queryObject !== undefined){
                    state.entities = [...state.entities, Object.values(action.payload.queryObject)];
                }
                state.status = 'idle';
            });
    },
});

export default historySlice.reducer;
