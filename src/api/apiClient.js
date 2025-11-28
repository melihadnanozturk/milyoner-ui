import axios from "axios";


axios.defaults.baseUrl = "http://localhost:8080"
axios.defaults.withCredentials = true;

const methods = {
    get: (url) => axios.get(url).then((response) => response.data),
    post: (url, body) => axios.post(url, body).then((response) => response.data),
    delete: (url) => axios.post(url).then((response) => response.data),
}

// burada yer alan gameId ve playerId bilgileri token üzerinden gönderilecek !!
const gameplay = {
    startGame: (username) => methods.post("game/start", username),
    getQuestion: (body) => methods.get("game/questions", body),
    setAnswer: (body) => methods.post("game/questions", body),
    getResult: (body) => methods.get("game/result", body),
}

const request = {
    gameplay
}

export default request;