import {Container} from "@mui/material";
import LoginForm from "../../component/LoginForm.jsx";
import {useDispatch, useSelector} from "react-redux";
import AdminLoginForm from "../../component/AdminLoginForm.jsx";

function StartGamePage() {
    return (
        <Container maxWidth={"md"}>
            <AdminLoginForm/>
        </Container>
    )
}

export default StartGamePage;