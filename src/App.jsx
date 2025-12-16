import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import StartGamePage from "./page/gamePlay/StartGamePage.jsx";
import GamePage from "./page/gamePlay/GamePage.jsx";
import ResultPage from "./page/gamePlay/ResultPage.jsx";
import AdminLoginForm from "./component/AdminLoginForm.jsx";


const router = createBrowserRouter([
    {path: "/", element: <StartGamePage/>},
    {path: "/game", element: <GamePage/>},
    {path: "/result", element: <ResultPage/>},
    {path: "/admin", children:[
            {index: true, element: <AdminLoginForm/>},
        ]},

])

function App() {
    return <RouterProvider router={router}/>
}

export default App
