import {Container} from "@mui/material";
import LoginForm from "../../component/LoginForm.jsx";
import {useDispatch, useSelector} from "react-redux";

function StartGamePage() {
    return (
        <Container maxWidth={"md"}>
            <LoginForm/>
        </Container>
    )
}

export default StartGamePage;