import './App.css'
import {RouterProvider} from "react-router";
import {createAppRouter} from "./router/AppRouter.jsx";

const router = createAppRouter();

function App() {
    return <RouterProvider router={router}/>
}

export default App
