import {Box, Button, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchNextQuestion, fetchSetAnswer} from "./slices/GameSlice.js";
import {useNavigate} from "react-router";
import GamePaper from "../../component/Paper.jsx";

function GamePage() {
    const {question, gameState} = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [selection, setSelection] = useState(null);

    useEffect(() => {

        dispatch(fetchNextQuestion());
    }, [dispatch]);

    const handleConfirmAnswer = async () => {
        // todo : olsa ne olmasa ne ? ;
        // if (!selection) return;
        const body = {
            questionId: question.questionId,
            answerId: selection.id,
        }

        try {
            const result = await dispatch(fetchSetAnswer(body)).unwrap();
            console.log("CEVAP_GELDI : ", result.data);

            if (result.data.gameState === "IN_PROGRESS") {
                setSelection(null);

                dispatch(fetchNextQuestion())
            } else if (result.data.gameState === "WON") {
                alert("Tebrikler! Oyunu KAZANDINIZ! 🏆");
                navigate("/result");
            } else if (result.data.gameState === "LOST") {
                alert("Üzgünüm, yanlış cevap. KAYBETTİNİZ. ❌");
                navigate("/result");
            }


        } catch (error) {
            console.error("Hata oluştu:", error);
            alert("Sunucu ile iletişimde bir sorun oluştu.");
        }
    }

    return (
        <GamePaper>
            <Box sx={{p: 5}}>
                <Typography variant="h5" align="center" fontWeight="bold">
                    {question?.questionText}
                </Typography>

            </Box>
            <Box sx={{pb: 5}}>
                <Grid container spacing={10}>
                    {/* Sol sütun - İlk 2 cevap alt alta */}
                    <Grid item xs={6}>
                        <Grid container spacing={3} direction="column">
                            {question?.answers.slice(0, 2).map((option) => (
                                <Grid item key={option.id}>
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
                    </Grid>
                    {/* Sağ sütun - Son 2 cevap alt alta */}
                    <Grid item xs={6}>
                        <Grid container spacing={3} direction="column">
                            {question?.answers.slice(2, 4).map((option) => (
                                <Grid item key={option.id}>
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
                    </Grid>
                </Grid>
            </Box>

            <Box>
                {selection ? (<>
                    <Button variant="contained" sx={{mr: 5}} onClick={handleConfirmAnswer}>Son Kararım </Button>
                    <Button variant="contained" color="error" onClick={() => setSelection(null)}>Biraz daha
                        düşüneceğim </Button>
                </>) : <></>}
            </Box>
        </GamePaper>

    )
}

export default GamePage;