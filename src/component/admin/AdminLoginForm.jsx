import Form from "../Form.jsx";
import {
    Alert,
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchAdminLogin} from "../../page/panel/slice/AdminAuthSlice.js";
import {useNavigate} from "react-router";
import {useState} from "react";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

function AdminLoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleClickButton = async (data) => {
        setSubmitError("");

        const body = {
            username: data.username,
            password: data.password,
        };

        try {
            const result = await dispatch(fetchAdminLogin(body)).unwrap();
            if (result) navigate("/panel/question");
        } catch (error) {
            setSubmitError("Giriş başarısız. Lütfen bilgilerini kontrol edip tekrar dene.");
        }
    };

    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting}
    } = useForm({defaultValues: {username: "", password: ""}});

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                px: 2
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={8}
                    sx={{
                        p: {xs: 3, sm: 4},
                        borderRadius: 3
                    }}
                >
                    <Stack spacing={2.5}>
                        <Box>
                            <Typography variant="h4" sx={{fontWeight: 800}}>
                                Maoco Milyoner Admin
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Devam etmek için giriş yap.
                            </Typography>
                        </Box>

                        {submitError ? <Alert severity="error">{submitError}</Alert> : null}

                        <Form onSubmit={handleSubmit(handleClickButton)}>
                            <Stack spacing={2}>
                                <TextField
                                    {...register("username", {
                                        required: "Kullanıcı adı girmeniz zorunludur!",
                                        minLength: {value: 3, message: "Kullanıcı adı en az 3 karakter olmalıdır!"},
                                        maxLength: {value: 25, message: "Kullanıcı adı en fazla 25 karakter olabilir!"}
                                    })}
                                    label="Kullanıcı adı"
                                    autoComplete="username"
                                    fullWidth
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                    variant="outlined"
                                />

                                <TextField
                                    {...register("password", {
                                        required: "Şifre girmeniz zorunludur!"
                                    })}
                                    label="Şifre"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    fullWidth
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword((v) => !v)}
                                                    edge="end"
                                                    aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                                                >
                                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    color="primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Giriş yapılıyor..." : "Giriş Yap"}
                                </Button>
                            </Stack>
                        </Form>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}

export default AdminLoginForm;