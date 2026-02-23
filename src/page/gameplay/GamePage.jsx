import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchNextQuestion, fetchSetAnswer} from "./slices/GameSlice.js";
import {useNavigate} from "react-router";
import GamePaper from "../../component/Paper.jsx";
import gameplayBg from "../../assets/M_Gameplay.png";

function GamePage() {
    const {question, gameState} = useSelector((state) => state.game);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [selection, setSelection] = useState(null);

    useEffect(() => {

        dispatch(fetchNextQuestion());
    }, [dispatch]);

    const handleConfirmAnswer = async () => {
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
            {/* Arka plan görseli - %80 blur */}
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
                {/* Soru Kutusu - Altıgen */}
                <Box
                    sx={{
                        width: {xs: '95%', sm: '85%', md: '75%', lg: '65%'},
                        maxWidth: '900px',
                        minHeight: '120px',
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        border: '2px solid #D4AF37',
                        clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: {xs: 3, sm: 4, md: 5},
                        mb: 5,
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontWeight: "bold",
                            color: 'white',
                            fontSize: {xs: '1.3rem', sm: '1.6rem', md: '1.9rem', lg: '2.2rem'},
                            lineHeight: 1.3,
                        }}
                    >
                        {question?.questionText}
                    </Typography>
                </Box>

                {/* Şıklar - Sabit konum ve genişlikte, karşılıklı ve ortalanmış */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        gap: 8,
                        width: '100%',
                        maxWidth: '1000px',
                        flexWrap: {xs: 'wrap', sm: 'nowrap'},
                    }}
                >
                    {/* Sol Sütun - A ve C */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: {xs: '100%', sm: '300px'},
                            flexShrink: 0,
                        }}
                    >
                        {/* A Şıkkı */}
                        {question?.answers[0] && (() => {
                            const option = question.answers[0];
                            const isSelected = selection?.id === option.id;
                            const isDisabled = selection && !isSelected;

                            return (
                                <Box
                                    key={option.id}
                                    onClick={() => !isDisabled && setSelection(option)}
                                    sx={{
                                        width: '400px',
                                        maxWidth: '100%',
                                        minHeight: '100px',
                                        backgroundColor: isSelected
                                            ? 'rgba(212, 175, 55, 0.3)'
                                            : 'rgba(30, 30, 30, 0.9)',
                                        border: isSelected ? '3px solid #D4AF37' : '2px solid #D4AF37',
                                        clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: {xs: 2, sm: 3},
                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                        opacity: isDisabled ? 0.5 : 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: isDisabled
                                                ? 'rgba(30, 30, 30, 0.9)'
                                                : 'rgba(212, 175, 55, 0.2)',
                                            transform: isDisabled ? 'none' : 'scale(1.02)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1.5rem', sm: '1.8rem', md: '2rem'},
                                                fontWeight: 'bold',
                                                color: '#FFD700',
                                                minWidth: '40px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            A
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                color: 'white',
                                                fontWeight: 500,
                                                flex: 1,
                                            }}
                                        >
                                            {option.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })()}

                        {/* C Şıkkı */}
                        {question?.answers[2] && (() => {
                            const option = question.answers[2];
                            const isSelected = selection?.id === option.id;
                            const isDisabled = selection && !isSelected;

                            return (
                                <Box
                                    key={option.id}
                                    onClick={() => !isDisabled && setSelection(option)}
                                    sx={{
                                        width: '400px',
                                        maxWidth: '100%',
                                        minHeight: '100px',
                                        backgroundColor: isSelected
                                            ? 'rgba(212, 175, 55, 0.3)'
                                            : 'rgba(30, 30, 30, 0.9)',
                                        border: isSelected ? '3px solid #D4AF37' : '2px solid #D4AF37',
                                        clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: {xs: 2, sm: 3},
                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                        opacity: isDisabled ? 0.5 : 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: isDisabled
                                                ? 'rgba(30, 30, 30, 0.9)'
                                                : 'rgba(212, 175, 55, 0.2)',
                                            transform: isDisabled ? 'none' : 'scale(1.02)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1.5rem', sm: '1.8rem', md: '2rem'},
                                                fontWeight: 'bold',
                                                color: '#FFD700',
                                                minWidth: '40px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            C
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                color: 'white',
                                                fontWeight: 500,
                                                flex: 1,
                                            }}
                                        >
                                            {option.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })()}
                    </Box>

                    {/* Sağ Sütun - B ve D */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: {xs: '100%', sm: '300px'},
                            flexShrink: 0,
                        }}
                    >
                        {/* B Şıkkı */}
                        {question?.answers[1] && (() => {
                            const option = question.answers[1];
                            const isSelected = selection?.id === option.id;
                            const isDisabled = selection && !isSelected;

                            return (
                                <Box
                                    key={option.id}
                                    onClick={() => !isDisabled && setSelection(option)}
                                    sx={{
                                        width: '400px',
                                        maxWidth: '100%',
                                        minHeight: '100px',
                                        backgroundColor: isSelected
                                            ? 'rgba(212, 175, 55, 0.3)'
                                            : 'rgba(30, 30, 30, 0.9)',
                                        border: isSelected ? '3px solid #D4AF37' : '2px solid #D4AF37',
                                        clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: {xs: 2, sm: 3},
                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                        opacity: isDisabled ? 0.5 : 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: isDisabled
                                                ? 'rgba(30, 30, 30, 0.9)'
                                                : 'rgba(212, 175, 55, 0.2)',
                                            transform: isDisabled ? 'none' : 'scale(1.02)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1.5rem', sm: '1.8rem', md: '2rem'},
                                                fontWeight: 'bold',
                                                color: '#FFD700',
                                                minWidth: '40px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            B
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                color: 'white',
                                                fontWeight: 500,
                                                flex: 1,
                                            }}
                                        >
                                            {option.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })()}

                        {/* D Şıkkı */}
                        {question?.answers[3] && (() => {
                            const option = question.answers[3];
                            const isSelected = selection?.id === option.id;
                            const isDisabled = selection && !isSelected;

                            return (
                                <Box
                                    key={option.id}
                                    onClick={() => !isDisabled && setSelection(option)}
                                    sx={{
                                        width: '400px',
                                        maxWidth: '100%',
                                        minHeight: '100px',
                                        backgroundColor: isSelected
                                            ? 'rgba(212, 175, 55, 0.3)'
                                            : 'rgba(30, 30, 30, 0.9)',
                                        border: isSelected ? '3px solid #D4AF37' : '2px solid #D4AF37',
                                        clipPath: 'polygon(8% 0%, 92% 0%, 100% 50%, 92% 100%, 8% 100%, 0% 50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: {xs: 2, sm: 3},
                                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                                        opacity: isDisabled ? 0.5 : 1,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: isDisabled
                                                ? 'rgba(30, 30, 30, 0.9)'
                                                : 'rgba(212, 175, 55, 0.2)',
                                            transform: isDisabled ? 'none' : 'scale(1.02)',
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '100%',
                                            gap: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1.5rem', sm: '1.8rem', md: '2rem'},
                                                fontWeight: 'bold',
                                                color: '#FFD700',
                                                minWidth: '40px',
                                                textAlign: 'center',
                                            }}
                                        >
                                            D
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: {xs: '1rem', sm: '1.1rem', md: '1.2rem'},
                                                color: 'white',
                                                fontWeight: 500,
                                                flex: 1,
                                            }}
                                        >
                                            {option.text}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })()}
                    </Box>
                </Box>

                {/* Onay Butonları - Dialog Pop-up */}
                <Dialog
                    open={!!selection}
                    onClose={() => setSelection(null)}
                    maxWidth="sm"
                    fullWidth
                    PaperProps={{
                        sx: {
                            backgroundColor: 'rgba(30, 30, 30, 0.95)',
                            border: '2px solid #D4AF37',
                            borderRadius: 2,
                            clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
                        }
                    }}
                >
                    <DialogTitle
                        sx={{
                            textAlign: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            pb: 2,
                        }}
                    >
                        Cevabınızı Onaylıyor musunuz?
                    </DialogTitle>
                    <DialogContent>
                        {selection && (
                            <Box
                                sx={{
                                    backgroundColor: 'rgba(212, 175, 55, 0.2)',
                                    border: '1px solid #D4AF37',
                                    borderRadius: 1,
                                    padding: 2,
                                    mb: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: '#FFD700',
                                        fontWeight: 'bold',
                                        fontSize: '1.1rem',
                                        mb: 1,
                                    }}
                                >
                                    Seçtiğiniz Cevap:
                                </Typography>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '1rem',
                                    }}
                                >
                                    {selection.text}
                                </Typography>
                            </Box>
                        )}
                        <Typography
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                textAlign: 'center',
                                fontSize: '0.95rem',
                            }}
                        >
                            Bu cevabınızı onaylamak istediğinizden emin misiniz?
                        </Typography>
                    </DialogContent>
                    <DialogActions
                        sx={{
                            padding: 3,
                            justifyContent: 'center',
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleConfirmAnswer}
                            sx={{
                                backgroundColor: '#D4AF37',
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                padding: '10px 28px',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: '#B8941F',
                                },
                            }}
                        >
                            Son Kararım
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setSelection(null)}
                            sx={{
                                borderColor: '#D4AF37',
                                color: '#D4AF37',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                padding: '10px 28px',
                                borderRadius: 1,
                                '&:hover': {
                                    borderColor: '#B8941F',
                                    color: '#B8941F',
                                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                },
                            }}
                        >
                            Biraz daha düşüneceğim
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>

    )
}

export default GamePage;