import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import request from "../../api/apiClient.js";

const initialState = {
    //burada ilk başta nasıl null olarak vereceğiz, bunun kontrolunu sağlamak lazım
    gameState: null,
    gameId: null,
    playerId: null,
    question: null,
    loading: false, error: null
}

export const fetchNextQuestion = createAsyncThunk("game/nextQuestion", async (body) => {
    const response = await request.gameplay.getQuestion(body);
    return response;
})

export const fetchStartGame = createAsyncThunk("game/startGame", async (body) => {
    const response = await request.gameplay.startGame(body);
    return response;
})

export const fetchSetAnswer = createAsyncThunk("game/setAnswer", async (body) => {
    const response = await request.gameplay.setAnswer(body);
    return response;
})

export const fetchGetResult = createAsyncThunk("game/getResult", async (body) => {
    const response = await request.gameplay.getResult(body);
    return response;
})

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            console.log("SLICE_ICERISDE_DISPATCH _YAPILDI")
            state.question = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStartGame.pending, (state) => {
            state.loading = true;
        }).addCase(fetchStartGame.fulfilled, (state, action) => {
            state.loading = false;
            state.gameId = action.payload.data.gameId;
            state.playerId = action.payload.data.playerId;
            state.gameState = action.payload.data.gameState;
        }).addCase(fetchStartGame.rejected, (state, action) => {
            state.loading = false;
            state.error = "Beklenmeyen bir hata oluştu " + action.error.message;
        }).addCase(fetchNextQuestion.pending, (state) => {
            state.loading = true;
        }).addCase(fetchNextQuestion.fulfilled, (state, action) => {
            state.loading = false;
            console.log("getQuestion", action.payload);
            console.log("question", action.payload.data.question);
            state.question = action.payload.data.question;
        }).addCase(fetchNextQuestion.rejected, (state, action) => {
            state.loading = false;
            state.error = "Beklenmeyen bir hata oluştu " + action.error.message;
        }).addCase(fetchSetAnswer.pending, (state, action) => {
            state.loading = true;
        }).addCase(fetchSetAnswer.fulfilled, (state, action) => {
            state.loading = false;
            console.log("fetchSetAnswer_ACTION : ",action);
            state.gameState = action.payload.gameState;
        }).addCase(fetchSetAnswer.rejected, (state, action) => {
            state.loading = false;
            state.error = "Beklenmeyen bir hata oluştu " + action.error.message;
        })
    }

})

export const {setQuestion} = gameSlice.actions

export default gameSlice.reducer