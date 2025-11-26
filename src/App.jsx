import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import LoginPage from "./page/LoginPage.jsx";
import GamePage from "./page/GamePage.jsx";
import ResultPage from "./page/ResultPage.jsx";


const router = createBrowserRouter([
    {path: "/", element: <LoginPage/>},
    {path: "/game", element: <GamePage/>},
    {path: "/result", element: <ResultPage/>}
])

function App() {
    return <RouterProvider router={router}/>
}

export default App
