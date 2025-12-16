import Form from "./Form.jsx";
import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {fetchAdminLogin} from "../page/panel/slice/AdminAuthSlice.js";

function AdminLoginForm() {
    const dispatch = useDispatch();

    const handleClickButton = async (data) => {
        const body = {
            username: data.username,
            password: data.password,
        }
        try {
            //burada hata olabilir
            await dispatch(fetchAdminLogin(body)).unwrap();
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
            <Typography variant="h4" align="center" sx={{fontWeight: "bold", mb: 3, mt: 3}}>Maoco Milyoner Admin
                Panel </Typography>
            <Form onSubmit={handleSubmit(handleClickButton)}>
                <Stack direction="row" spacing={2} justifyContent='space-between' alignItems="center" sx={{m: 7}}>
                    <Typography>İsmi</Typography>
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

                {/*todo: burada passwordun gözükmemesi gerekir*/}
                <Stack direction="row" spacing={2} justifyContent='space-between' alignItems="center" sx={{m: 7}}>
                    <Typography>Şifre</Typography>
                    <TextField
                        {...register("password", {
                            required: "Şİfre girmeniz zorunludur!",
                            //todo: password için must have ibareleri gereklidir
                        })}
                        label="password"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        variant="outlined"/>
                </Stack>
                <Button variant="contained" fullWidth size="large" color="primary" type="submit">Giriş Yap</Button>
            </Form>
        </Paper>

    );
}

export default AdminLoginForm;