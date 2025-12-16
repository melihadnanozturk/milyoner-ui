import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080"
axios.defaults.withCredentials = true;

let injectedStore = null;

export const setStore = (storeInstance) => {
    injectedStore = storeInstance;
}

const isAuthExcluded = (config) => {
    // Per-request override: axios.get(url, { skipAuth: true })
    console.log("isAuthExcluded", config);

    if (config?.skipAuth === true) return true;
}

axios.interceptors.request.use(
    (config) => {
        if (isAuthExcluded(config)) {
            console.log("AUTH_SKIPPED");
            if (config?.headers?.Authorization) {
                delete config.headers.Authorization;
            }
            return config;
        }


        const store = injectedStore.getState();
        // TODO: token'ı hangi slice'ta tutuyorsan burayı değiştir
        // örn: const token = state.auth?.token;
        const token = store.game?.token;


        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);


const methods = {
    get: (url) => axios.get(url).then((response) => response.data),
    post: (url, body, config) => axios.post(url, body, config).then((response) => response.data),
    put: (url, body) => axios.put(url, body).then((response) => response.data),
    delete: (url) => axios.delete(url).then((response) => response.data),
}

// burada yer alan gameId ve playerId bilgileri token üzerinden gönderilecek !!
const gameplay = {
    startGame: (username) => methods.post("game/start", username),
    getQuestion: () => methods.post("game/questions"),
    setAnswer: (body) => methods.post("game/answer", body),
    getResult: () => methods.post("game/result"),
}

const panelAuth = {
    login: (body) => methods.post("panel/auth/login", body, {skipAuth : true})
}

const panelOperation = {
    createNewAnswer: (body) => methods.post("panel/answers/operation", body),
    deleteAnswer: (answerId) => methods.post(`panel/answers/operation/${answerId}`),
    createNewQuestion: (body) => methods.post("panel/questions/operation", body),
    updateQuestion: (questionId, body) => methods.put(`panel/questions/operation/${questionId}`, body),
    deleteQuestion: (questionId) => methods.post(`panel/questions/operation/${questionId}`)
}

const panelQuery = {
    getQuestionsById: (questionId) => methods.get(`panel/questions/${questionId}`),
    getAllQuestions: (body) => methods.get(`panel/questions`, body),
    getAnswerById: (answerId) => methods.get(`panel/answers/${answerId}`),
}

const request = {
    gameplay,
    panelAuth,
    panelQuery,
    panelOperation
}

export default request;