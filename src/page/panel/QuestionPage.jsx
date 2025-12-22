import {useGetAllQuestionsQuery} from "./slice/panelApi.js";
import {
    Box,
    Chip,
    CircularProgress, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export default function QuestionPage() {

    const {data: questions, isLoading} = useGetAllQuestionsQuery({});

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, width: 400}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', overflow: 'hidden', p: { xs: 1, md: 3 } }}>
            <TableContainer  component={Paper} sx={{
                maxHeight: 'calc(100vh - 160px)',
                width: '100%',
                // Scrollbar Özelleştirme
                '&::-webkit-scrollbar': {
                    width: '8px',
                    height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'background.paper',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'primary.main', // Temadaki parlak yeşil
                    borderRadius: '10px',
                    '&:hover': {
                        backgroundColor: 'primary.dark', // Hover durumunda biraz daha koyu yeşil
                    },
                },
                // Firefox için
                scrollbarWidth: 'thin',
                scrollbarColor: '#00E676 #11221F',
            }}>
                <Table stickyHeader aria-label="Soru Listesi tablo">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{fontWeight: 'bold'}}> ID </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}> Soru </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}> Aktiflik </TableCell>
                            <TableCell sx={{fontWeight: 'bold'}}> Level </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {questions?.data?.map((row) => (
                            <TableRow key={row.id}
                                      hover>
                                <TableCell> {row.questionText} </TableCell>
                                <TableCell> {row.questionText} </TableCell>
                                <TableCell> <Chip
                                    label={row.isActivate ? "Aktif" : "Pasif"}
                                    color={row.isActivate ? "success" : "error"}
                                    variant="outlined"
                                    size="small"
                                /> </TableCell>
                                <TableCell> {row.questionLevel} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}