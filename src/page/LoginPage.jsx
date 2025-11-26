import {Container, Paper, Typography} from "@mui/material";
import LoginForm from "../component/LoginForm.jsx";

function LoginPage() {
    return (
        <Container maxWidth={"md"}>
            <Paper sx={{padding: 2, backgroundColor: 'white'}}>
                <Typography variant="h4" align="center" sx={{fontWeight: "bold", mb: 3, mt: 3}}>Milyoner'e Hoşgeldiniz
                    :)</Typography>
                <LoginForm/>

            </Paper>
        </Container>
    )
}

export default LoginPage;