import Form from "./Form.jsx";
import {Button, Stack, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";

function LoginForm() {

    const handleClickButton = async (data) => {
        console.log(data)
    }

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({defaultValues: {username: ""}})

    return (
        <Form onSubmit={handleSubmit(handleClickButton)}>
            <Stack direction="row" spacing={2} justifyContent='space-between' alignItems="center" sx={{m: 7}}>
                <Typography>İsminizi Giriniz</Typography>
                <TextField
                    {...register("username",{
                        required:"Kullanıcı adi girmeniz zorunludur!",
                        minLength:3,
                        maxLength:25
                    })}
                    label="username"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    variant="outlined"/>
            </Stack>
            <Button variant="contained" fullWidth size="large" color="primary" type="submit">Başla</Button>
        </Form>
    );
}

export default LoginForm;