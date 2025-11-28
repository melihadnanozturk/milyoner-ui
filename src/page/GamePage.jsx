import {Box, Button, Container, Grid, Paper, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import setQuestion from "./slices/GameSlice";

function GamePage() {
    const question = useSelector((state) => state.game.question);
    const dispatch = useDispatch();

    const [selection, setSelection] = useState(null);

    const questionData = {
        text: "React kütüphanesini kim geliştirmiştir?",
        options: [
            {id: 1, label: "A", text: "Google"},
            {id: 2, label: "B", text: "Facebook (Meta)"},
            {id: 3, label: "C", text: "Microsoft"},
            {id: 4, label: "D", text: "Twitter"}
        ]
    };

    return (
        <Container maxWidth="md" sx={{mt: 5}}>
            <Paper elevation={3} sx={{padding: 4, borderRadius: 2}}>
                <Box sx={{p: 5}}>
                    <Typography variant="h5" align="center" fontWeight="bold">
                        {question}
                    </Typography>
                    <Button variant="contained" sx={{mr: 5}} onClick={() => dispatch(setQuestion("Soruyu degistirdim :)"))}>Change
                        Question </Button>

                </Box>
                <Box sx={{pb: 5}}>
                    <Grid container spacing={2}>
                        {questionData.options.map((option) => (
                            <Grid
                                item
                                xs={6}  // Mobilde 2 sütun
                                key={option.id}
                            >
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    disabled={selection && option.id !== selection?.id}
                                    onClick={() => setSelection(option)}
                                    sx={{
                                        height: '100%',
                                        minHeight: '60px',
                                        textTransform: 'none',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        px: 3,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    <b style={{marginRight: '10px'}}>{option.label})</b> {option.text}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box>
                    {selection ? (<>
                        <Button variant="contained" sx={{mr: 5}}>Son Kararım </Button>
                        <Button variant="contained" color="error" onClick={() => setSelection(null)}>Biraz daha
                            düşüneceğim </Button>
                    </>) : <></>}
                </Box>
            </Paper>
        </Container>
    )
}

export default GamePage;