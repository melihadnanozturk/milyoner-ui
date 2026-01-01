import {useGetQuestionByIdQuery} from "./slice/panelApi.js";
import {
    Box,
    Chip,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {useParams} from "react-router";

export default function QuestionDetailPage() {
    const {questionId} = useParams();
    const {data: question, isLoading} = useGetQuestionByIdQuery(questionId);

    if (isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400}}>
                <CircularProgress/>
            </Box>
        );
    }

    if (!question?.data) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400}}>
                <Typography variant="h6" color="error">Soru bulunamadı</Typography>
            </Box>
        );
    }

    const questionData = question.data;

    return (
        <Box sx={{width: '100%', padding: 3, display: 'flex', gap: 3, flexWrap: 'wrap'}}>
            {/* Soru Detayları Formu */}

            <Paper sx={{padding: 3, flex: 1, minWidth: '400px'}}>
                <Typography variant="h5" sx={{marginBottom: 3, fontWeight: 'bold'}}>
                    Soru Detayları
                </Typography>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>

                    <TextField
                        label="Level"
                        value={questionData.questionLevel || ''}
                        InputProps={{readOnly: true}}
                        fullWidth
                    />

                    <TextField
                        label="Soru Metni"
                        value={questionData.questionText || ''}
                        InputProps={{readOnly: true}}
                        fullWidth
                        multiline
                        rows={3}
                    />


                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <Typography sx={{marginRight: 2}}>Durum:</Typography>
                        <Chip
                            label={questionData.isActivate ? "Aktif" : "Pasif"}
                            color={questionData.isActivate ? "success" : "error"}
                            variant="outlined"
                        />
                    </Box>
                </Box>
            </Paper>

            {/* Cevaplar Tablosu */}
            <Paper sx={{padding: 3, flex: 1, minWidth: '400px'}}>
                <Typography variant="h5" sx={{marginBottom: 3, fontWeight: 'bold'}}>
                    Cevaplar
                </Typography>

                <TableContainer sx={{
                    maxHeight: '300px', // Belli bir limite kadar uzar, sonra scroll
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'background.paper',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'primary.main',
                        borderRadius: '10px',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        },
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#00E676 #11221F',
                }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: 'bold'}}>Doğru Cevap</TableCell>
                                <TableCell sx={{fontWeight: 'bold'}}>Cevap Metni</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {questionData.answers?.length > 0 ? (
                                questionData.answers.map((answer) => (
                                    <TableRow key={answer.answerId} hover>
                                        <TableCell>
                                            <Chip
                                                label={answer.isCorrect ? "Doğru" : "Yanlış"}
                                                color={answer.isCorrect ? "success" : "default"}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>{answer.answerText}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography color="textSecondary">
                                            Bu soruya ait cevap bulunmamaktadır.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    )
}
