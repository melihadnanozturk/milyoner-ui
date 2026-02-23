import {createAsyncThunk, createSlice, isPending, isRejected,isFulfilled} from "@reduxjs/toolkit";
import request from "../../../api/apiClient.js";

const tokenFromStorage = localStorage.getItem("accessToken");

const initialState = {
    //burada ilk başta nasıl null olarak vereceğiz, bunun kontrolunu sağlamak lazım
    gameState: null,
    token: tokenFromStorage ? tokenFromStorage : null,
    isAuthenticated: !!tokenFromStorage,
    username: null, //todo: burada username yazılması gerekir
    question: null,
    loading: false, error: null,
    result: null
}


//todo: burada yer alan auth işlemlerini ayırabiliriz ?
export const fetchStartGame = createAsyncThunk("game/startGame", async (body) => {
    const response = await request.gameplay.startGame(body);
    return response;
})

export const fetchNextQuestion = createAsyncThunk("game/nextQuestion", async (body) => {
    const response = await request.gameplay.getQuestion(body);
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchStartGame.fulfilled, (state, action) => {
                const { token, gameState } = action.payload.data;
                
                state.token = token;
                state.gameState = gameState;
                localStorage.setItem("accessToken", token);
            })
            .addCase(fetchNextQuestion.fulfilled, (state, action) => {
            state.question = action.payload.data.question;
        }).addCase(fetchSetAnswer.fulfilled, (state, action) => {
            state.gameState = action.payload.gameState;
        }).addCase(fetchGetResult.fulfilled, (state, action) => {
            //burada bir hata olabilir !!
            console.log("fetchGetResult",action.payload.data);
            console.log("REDUX_STATE",state);
            state.result = action.payload.data;
        })
            .addMatcher(isPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.error = "Beklenmeyen bir hata oluştu " + (action.error.message || "Bilinmiyor");
            })
            .addMatcher(isFulfilled, (state) => {
                state.loading = false;
            })
    }
})

export default gameSlice.reducer