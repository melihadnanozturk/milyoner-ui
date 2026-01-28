import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Typography} from "@mui/material";
import {fetchGetResult} from "./slices/GameSlice.js";
import {useEffect} from "react";
import {useNavigate} from "react-router";
import gameplayBg from "../../assets/M_Gameplay.png";
import StarIcon from "@mui/icons-material/Star";

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
    }, [dispatch, gameId, playerId]);

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
                overflow: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Arka plan görseli - Blur */}
            <Box
                sx={{
                    position: "fixed",
                    top: "-10%",
                    left: "-10%",
                    width: "120%",
                    height: "120%",
                    backgroundImage: `url(${gameplayBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "blur(10px)",
                    zIndex: 0,
                }}
            />

            {/* İçerik */}
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 4,
                    px: 2,
                }}
            >
                {/* Yıldız İkonu */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: '#D4AF37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                    }}
                >
                    <StarIcon sx={{color: 'white', fontSize: 50}}/>
                </Box>

                {/* Sonuç Mesajı Kutusu - Altıgen */}
                <Box
                    sx={{
                        width: {xs: '95%', sm: '85%', md: '75%', lg: '65%'},
                        maxWidth: '800px',
                        minHeight: '120px',
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        border: '2px solid #D4AF37',
                        clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: {xs: 3, sm: 4, md: 5},
                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            color: 'white',
                            fontSize: {xs: '1.5rem', sm: '1.8rem', md: '2.1rem', lg: '2.4rem'},
                            lineHeight: 1.3,
                        }}
                    >
                        {result?.message}
                    </Typography>
                </Box>

                {/* Kullanıcı Bilgileri - Altıgen */}
                <Box
                    sx={{
                        width: {xs: '90%', sm: '70%', md: '60%', lg: '50%'},
                        maxWidth: '600px',
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        border: '2px solid #D4AF37',
                        clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: {xs: 3, sm: 4},
                        mb: 4,
                        gap: 2,
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: {xs: '1.2rem', sm: '1.4rem', md: '1.6rem'},
                            fontWeight: 'bold',
                            color: '#FFD700',
                            textAlign: 'center',
                        }}
                    >
                        {result?.username}
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: '1px',
                            backgroundColor: '#D4AF37',
                            my: 1,
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: {xs: '1.1rem', sm: '1.3rem', md: '1.5rem'},
                            fontWeight: 'bold',
                            color: 'white',
                            textAlign: 'center',
                        }}
                    >
                        Skorunuz: <span style={{color: '#FFD700'}}>{result?.score}</span>
                    </Typography>
                </Box>

                {/* Tekrar Başla Butonu */}
                <Button
                    variant="contained"
                    onClick={() => navigate("/")}
                    endIcon={<StarIcon/>}
                    sx={{
                        backgroundColor: '#D4AF37',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                        padding: {xs: '10px 24px', sm: '12px 32px'},
                        borderRadius: 2,
                        textTransform: 'uppercase',
                        '&:hover': {
                            backgroundColor: '#B8941F',
                        },
                    }}
                >
                    Tekrar Başlamak İstiyorum
                </Button>
            </Box>
        </Box>
    )
}

export default ResultPage;