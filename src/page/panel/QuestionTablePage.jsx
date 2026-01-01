import {useGetAllQuestionsQuery} from "./slice/panelApi.js";
import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {Search} from "@mui/icons-material";
import {useNavigate} from "react-router";

export default function QuestionTablePage() {

    const {data: questions, isLoading} = useGetAllQuestionsQuery({});
    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400, width: 400}}>
                <CircularProgress/>
            </Box>
        );
    }

    return (
        <Box sx={{width: '100%'}}>
            <TableContainer component={Paper} sx={{
                maxHeight: 'calc(100vh - 200px)',
                minWidth: '800px',
                overflowX: 'hidden',
                overflowY: 'auto',
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
                            <TableCell sx={{fontWeight: 'bold'}}> Detay </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {questions?.data?.map((row) => (
                            <TableRow key={row.id}
                                      hover>
                                <TableCell> {row.questionId} </TableCell>
                                <TableCell> {row.questionText} </TableCell>
                                <TableCell> <Chip
                                    label={row.isActivate ? "Aktif" : "Pasif"}
                                    color={row.isActivate ? "success" : "error"}
                                    variant="outlined"
                                    size="small"
                                /> </TableCell>
                                <TableCell> <Chip
                                    label={row.questionLevel}
                                    color="warning"
                                    variant="outlined"
                                    size="small"
                                />
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Soru detayına git">
                                        <IconButton
                                            color="primary"
                                            onClick={() => navigate(`/panel/question/${row.questionId}`)}
                                        >
                                            <Search/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )


}