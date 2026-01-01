import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import StartGamePage from "./page/gameplay/StartGamePage.jsx";
import GamePage from "./page/gameplay/GamePage.jsx";
import ResultPage from "./page/gameplay/ResultPage.jsx";
import AdminLoginPage from "./page/panel/AdminLoginPage.jsx";
import AdminLayout from "./component/admin/AdminLayout.jsx";
import AdminPanelLayout from "./page/panel/AdminPanelLayout.jsx";
import QuestionTablePage from "./page/panel/QuestionTablePage.jsx";
import AnswerPage from "./page/panel/QuestionOperationPage.jsx";
import QuestionDetailPage from "./page/panel/QuestionDetailPage.jsx";


const router = createBrowserRouter([
    {path: "/", element: <StartGamePage/>},
    {path: "/game", element: <GamePage/>},
    {path: "/result", element: <ResultPage/>},
    {
        path: "panel", element: <AdminLayout/>, children: [
            {path: "login", element: <AdminLoginPage/>},
            {path: "", element: <AdminPanelLayout/>, children: [
                    {path: "question", element: <QuestionTablePage/>},
                    {path: "question/:questionId", element: <QuestionDetailPage/>},
                    {path: "answer", element: <AnswerPage/>},
                ]
            }
        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App
