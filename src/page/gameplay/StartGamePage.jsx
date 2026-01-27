import {Box, Container} from "@mui/material";
import LoginForm from "../../component/LoginForm.jsx";
import stageBg from "../../assets/Milyoner_Background.png";

function StartGamePage() {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                margin: 0,
                padding: 0,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    width: "120%",
                    height: "120%",
                    backgroundImage: `url(${stageBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(4px)",
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    px: 2,
                }}
            >
                <Container maxWidth="md" sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <LoginForm/>
                </Container>
            </Box>
        </Box>
    )
}

export default StartGamePage;