import GamePaper from "../component/Paper.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Grid, Typography} from "@mui/material";
import {fetchGetResult} from "./slices/GameSlice.js";
import {useEffect} from "react";
import {useNavigate} from "react-router";

function ResultPage() {
    const {result, gameState, gameId, playerId} = useSelector((state) => state.game);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const body = {
            gameId: gameId,
            playerId: playerId
        }
        dispatch(fetchGetResult(body))
    }, [dispatch]);

    return (
        <GamePaper>
            <Box sx={{mb: 3}}>
                <Typography variant="h5" align="center" fontWeight="bold">
                    {result?.message}
                </Typography>
            </Box>
            <Box>
                <Grid container direction="column" spacing={2}>
                    <Grid item>{result?.username}</Grid>
                    <Grid item>
                        <Typography>Skorunuz : {result?.score}</Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{mt: 3}}>
                <Button variant="contained" onClick={()=> navigate("/")}>Tekrar Başlamak İstiyorum</Button>
            </Box>
        </GamePaper>
    )
}

export default ResultPage;