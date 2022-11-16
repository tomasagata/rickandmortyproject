import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    entities: [],
    status: null,
};


const placeholder = createSlice({
    name: 'placeholder',
    initialState,
    reducers: {

    },
});

export default placeholder.reducer;
