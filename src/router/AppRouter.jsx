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

export const getAdminPanelAuthToken = () => {
    return localStorage.getItem("adminAccessToken");
};

export const getGameplayAuthToken = () => {
    return localStorage.getItem("accessToken");
};

export const adminPanelCheckAuthLoader = () => {
    const token = getAdminPanelAuthToken();
    if (!token) {
        return redirect("/panel/login");
    }
    return token;
};

export const gameplayCheckAuthLoader = () => {
    const token = getGameplayAuthToken();
    if (!token) {
        return redirect("/");
    }
    return token;
};

export const adminPanelRedirectIfAuthenticated = () => {
    const token = getAdminPanelAuthToken();
    if (token) {
        return redirect("/panel/question");
    }
    return null;
};

export const createAppRouter = () => {
    return createBrowserRouter([
        {path: "/", element: <StartGamePage/>},
        {path: "/game", element: <GamePage/>, loader: gameplayCheckAuthLoader},
        {path: "/result", element: <ResultPage/>, loader: gameplayCheckAuthLoader},
        {
            path: "panel", element: <AdminLayout/>, children: [
                {path: "login", element: <AdminLoginPage/>, loader: adminPanelRedirectIfAuthenticated},
                {path: "", element: <AdminPanelLayout/>, loader: adminPanelCheckAuthLoader, children: [
                        {path: "question", element: <QuestionTablePage/>, loader: adminPanelCheckAuthLoader},
                        {path: "question/:questionId", element: <QuestionDetailPage/>, loader: adminPanelCheckAuthLoader},
                        {path: "answer", element: <AnswerPage/>, loader: adminPanelCheckAuthLoader},
                    ]
                }
            ]
        },
    ]);
};
