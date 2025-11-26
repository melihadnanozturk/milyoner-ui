import {Box, Container} from "@mui/material";


function Form({maxWidth, onSubmit, children}) {
    return (
        <Container maxWidth={maxWidth}>
            <Box component="form" onSubmit={onSubmit}>
                <div>{children}</div>
            </Box>
        </Container>);
}

export default Form;