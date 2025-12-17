import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import StartGamePage from "./page/gamePlay/StartGamePage.jsx";
import GamePage from "./page/gamePlay/GamePage.jsx";
import ResultPage from "./page/gamePlay/ResultPage.jsx";
import AdminLoginPage from "./page/panel/AdminLoginPage.jsx";
import AdminPanelPage from "./page/panel/AdminPanelPage.jsx";
import AdminLayout from "./component/AdminLayout.jsx";


const router = createBrowserRouter([
    {path: "/", element: <StartGamePage/>},
    {path: "/game", element: <GamePage/>},
    {path: "/result", element: <ResultPage/>},
    {
        path: "/admin", element: <AdminLayout/>, children: [
            {index: true, element: <AdminLoginPage/>},
            {path: "panel", element: <AdminPanelPage/>}
        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App
