import { Box, Container } from "@mui/material";


function Form({ maxWidth = "xl", onSubmit, children, disableGutters = false }) {
    if (maxWidth === false) {
        return (
            <Box
                sx={{
                    width: '100%',
                }}
            >
                <Box component="form" onSubmit={onSubmit}>
                    {children}
                </Box>
            </Box>
        );
    }

    return (
        <Container
            maxWidth={maxWidth}
            disableGutters={disableGutters}
            sx={{
                width: '100%',
            }}
        >
            <Box component="form" onSubmit={onSubmit}>
                {children}
            </Box>
        </Container>
    );
}

export default Form;