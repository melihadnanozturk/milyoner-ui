import {Box, Button, Container, Grid, Paper, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchNextQuestion, fetchSetAnswer} from "./slices/GameSlice";
import {useNavigate} from "react-router";

function GamePage() {
    const {question, gameId, playerId, gameState} = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [selection, setSelection] = useState(null);

    useEffect(() => {

        const body = {
            gameId: gameId,
            playerId: playerId
        }

        dispatch(fetchNextQuestion(body));
    }, [dispatch]);

    const handleConfirmAnswer = async () => {
        // todo : olsa ne olmasa ne ? ;
        // if (!selection) return;
        const body = {
            gameId: gameId,
            playerId: playerId,
            questionId: question.questionId,
            answerId: selection.id,
        }

        try {
            const result = await dispatch(fetchSetAnswer(body)).unwrap();
            console.log("CEVAP_GELDI : ",result.data);

            if (result.data.gameState === "IN_PROGRESS") {
                setSelection(null);

                const nextQuestionBody = {
                    gameId: gameId,
                    playerId: playerId
                }

                dispatch(fetchNextQuestion(nextQuestionBody))
            } else if (result.data.gameState === "WON") {
                alert("Tebrikler! Oyunu KAZANDINIZ! 🏆");
                navigate("/");
            } else if (result.data.gameState === "LOST") {
                alert("Üzgünüm, yanlış cevap. KAYBETTİNİZ. ❌");
                navigate("/");
            }


        } catch (error) {
            console.error("Hata oluştu:", error);
            alert("Sunucu ile iletişimde bir sorun oluştu.");
        }
    }

    return (
        <Container maxWidth="md" sx={{mt: 5}}>
            <Paper elevation={3} sx={{padding: 4, borderRadius: 2}}>
                <Box sx={{p: 5}}>
                    <Typography variant="h5" align="center" fontWeight="bold">
                        {question?.questionText}
                    </Typography>

                </Box>
                <Box sx={{pb: 5}}>
                    <Grid container spacing={2}>
                        {question?.answers.map((option) => (
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
                                >{option.text}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box>
                    {selection ? (<>
                        <Button variant="contained" sx={{mr: 5}} onClick={handleConfirmAnswer}>Son Kararım </Button>
                        <Button variant="contained" color="error" onClick={() => setSelection(null)}>Biraz daha
                            düşüneceğim </Button>
                    </>) : <></>}
                </Box>
            </Paper>
        </Container>
    )
}

export default GamePage;