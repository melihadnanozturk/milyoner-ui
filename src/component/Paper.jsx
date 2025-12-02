import {Container, Paper} from "@mui/material";

function GamePaper({children}) {
    return (
        <Container maxWidth="md" sx={{mt: 5}}>
            <Paper elevation={3} sx={{padding: 4, borderRadius: 2}}>
                {children}
            </Paper>
        </Container>)
}

export default GamePaper;