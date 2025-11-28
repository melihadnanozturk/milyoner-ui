import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    question: "State içerisinde yer alan soru"
}

export const gameSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            state.question = action.payload;
        }
    }
})

export const {setQuestion} = gameSlice.actions

export default gameSlice.reducer