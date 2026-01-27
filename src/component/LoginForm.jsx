import Form from "./Form.jsx";
import {Box, Button, InputAdornment, Link, Paper, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {fetchStartGame} from "../page/gameplay/slices/GameSlice.js";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickButton = async (data) => {
        const body = {
            username: data.username
        }
        try {
            //burada hata olabilir
            await dispatch(fetchStartGame(body)).unwrap();
            navigate("/game");
        } catch (error) {
            alert("INTERNAL_SERVER_ERROR :: " + error.message)
        }
    }

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({defaultValues: {username: ""}})


    // Burada hata mesajlarını helperText içerisine değil de, paper içerisine alert olarak ekleyebiliriz :)
    return (
        <Paper sx={{
            padding: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            boxShadow: 'none',
            maxWidth: 500,
            width: '100%'
        }}>
            <Stack spacing={3} alignItems="center">
                {/* Yıldız İkonu */}
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: '#D4AF37',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 1
                    }}
                >
                    <StarIcon sx={{color: 'white', fontSize: 35}}/>
                </Box>

                {/* Başlık */}
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontWeight: "bold",
                        color: 'white',
                        fontSize: {xs: '2rem', sm: '2.5rem', md: '3rem'},
                        lineHeight: 1.2
                    }}
                >
                    Kim İslami Bilgisini Test Etmek İster ? 
                </Typography>

                {/* Hoş geldiniz mesajı */}
                <Typography
                    variant="body1"
                    align="center"
                    sx={{
                        color: 'white',
                        fontSize: '1.1rem',
                        mb: 2
                    }}
                >
                    Yarışmaya hoş geldiniz. Hazırsanız başlayalım.
                </Typography>

                <Form onSubmit={handleSubmit(handleClickButton)}>
                    <Stack spacing={3} sx={{width: '100%'}}>
                        {/* Input Alanı */}
                        <TextField
                            {...register("username", {
                                required: "Kullanıcı adi girmeniz zorunludur!",
                                minLength: {
                                    value: 3,
                                    message: "İsminizin uzunluğu en az 3 birim olmalıdır !"
                                },
                                maxLength: {
                                    value: 25,
                                    message: "İsminizin uzunluğu en fazla 25 birim olabilir !"
                                }
                            })}
                            placeholder="Adınızı girin"
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{color: 'rgba(255, 255, 255, 0.6)'}}/>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                    borderRadius: 2,
                                    color: 'white',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.7)',
                                    },
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                    opacity: 1,
                                },
                                '& .MuiInputBase-input': {
                                    color: 'white',
                                },
                                '& .MuiFormHelperText-root': {
                                    color: 'rgba(255, 255, 255, 0.8)',
                                }
                            }}
                        />

                        {/* Başlat Butonu */}
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            type="submit"
                            endIcon={<PlayArrowIcon/>}
                            sx={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1.1rem',
                                padding: '12px 24px',
                                borderRadius: 2,
                                textTransform: 'uppercase',
                                '&:hover': {
                                    backgroundColor: '#1565c0',
                                }
                            }}
                        >
                            OYUNA BAŞLA
                        </Button>

                        {/* Kullanım Koşulları */}
                        <Typography
                            variant="caption"
                            align="center"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '0.85rem',
                                mt: 1
                            }}
                        >
                            Katılarak{' '}
                            <Link
                                href="#"
                                sx={{
                                    color: 'white',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                Kullanım Koşullarını
                            </Link>
                            {' '}kabul etmiş olursunuz.
                        </Typography>
                    </Stack>
                </Form>
            </Stack>
        </Paper>

    );
}

export default LoginForm;