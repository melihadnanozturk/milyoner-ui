import {createBrowserRouter, redirect} from "react-router";
import StartGamePage from "../page/gameplay/StartGamePage.jsx";
import GamePage from "../page/gameplay/GamePage.jsx";
import ResultPage from "../page/gameplay/ResultPage.jsx";
import AdminLoginPage from "../page/panel/AdminLoginPage.jsx";
import AdminLayout from "../component/admin/AdminLayout.jsx";
import AdminPanelLayout from "../page/panel/AdminPanelLayout.jsx";
import QuestionTablePage from "../page/panel/QuestionTablePage.jsx";
import AnswerPage from "../page/panel/QuestionOperationPage.jsx";
import QuestionDetailPage from "../page/panel/QuestionDetailPage.jsx";

export const getAuthToken = () => {
    return localStorage.getItem("adminAccessToken");
};

export const checkAuthLoader = () => {
    const token = getAuthToken();
    if (!token) {
        return redirect("/panel/login");
    }
    return token;
};

export const redirectIfAuthenticated = () => {
    const token = getAuthToken();
    if (token) {
        return redirect("/panel/question");
    }
    return null;
};

export const createAppRouter = () => {
    return createBrowserRouter([
        {path: "/", element: <StartGamePage/>},
        {path: "/game", element: <GamePage/>},
        {path: "/result", element: <ResultPage/>},
        {
            path: "panel", element: <AdminLayout/>, children: [
                {path: "login", element: <AdminLoginPage/>, loader: redirectIfAuthenticated},
                {path: "", element: <AdminPanelLayout/>, loader: checkAuthLoader, children: [
                        {path: "question", element: <QuestionTablePage/>, loader: checkAuthLoader},
                        {path: "question/:questionId", element: <QuestionDetailPage/>, loader: checkAuthLoader},
                        {path: "answer", element: <AnswerPage/>, loader: checkAuthLoader},
                    ]
                }
            ]
        },
    ]);
};
