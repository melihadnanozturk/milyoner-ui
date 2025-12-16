import Form from "./Form.jsx";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {fetchStartGame} from "../page/gamePlay/slices/GameSlice.js";

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
        <Paper sx={{padding: 2, backgroundColor: 'white'}}>
            <Typography variant="h4" align="center" sx={{fontWeight: "bold", mb: 3, mt: 3}}>Milyoner'e Hoşgeldiniz
                :)</Typography>
            <Form onSubmit={handleSubmit(handleClickButton)}>
                <Stack direction="row" spacing={2} justifyContent='space-between' alignItems="center" sx={{m: 7}}>
                    <Typography>İsminizi Giriniz</Typography>
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
                        label="username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        variant="outlined"/>
                </Stack>
                <Button variant="contained" fullWidth size="large" color="primary" type="submit">Başla</Button>
            </Form>
        </Paper>

    );
}

export default LoginForm;