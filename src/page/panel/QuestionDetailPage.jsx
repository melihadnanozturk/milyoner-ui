import {useState, useEffect, useCallback} from "react";
import {
    useGetQuestionByIdQuery,
    useUpdateQuestionMutation,
    useUpdateAnswerMutation,
    useDeleteQuestionMutation
} from "./slice/panelApi.js";
import {
    Box,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon} from "@mui/icons-material";
import {useParams, useNavigate} from "react-router";
import {QUESTION_CONSTANTS} from "../../component/admin/constants/questionConstants.js";
import DeleteConfirmationDialog from "../../component/admin/DeleteConfirmationDialog.jsx";

export default function QuestionDetailPage() {
    const {questionId} = useParams();
    const navigate = useNavigate();
    const {data: question, isLoading} = useGetQuestionByIdQuery(questionId);
    const [updateQuestion, {isLoading: isUpdatingQuestion}] = useUpdateQuestionMutation();
    const [updateAnswer, {isLoading: isUpdatingAnswer}] = useUpdateAnswerMutation();
    const [deleteQuestion, {isLoading: isDeleting}] = useDeleteQuestionMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        questionText: '',
        questionLevel: 1,
        isActivate: true,
        answers: []
    });
    const [originalData, setOriginalData] = useState(null);
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    // Initialize form data when question is loaded
    useEffect(() => {
        if (question?.data && !isEditMode) {
            const questionData = question.data;
            setFormData({
                questionText: questionData.questionText || '',
                questionLevel: questionData.questionLevel || 1,
                isActivate: questionData.isActivate ?? true,
                answers: questionData.answers?.map(answer => ({
                    answerId: answer.answerId,
                    answerText: answer.answerText || '',
                    isCorrect: answer.isCorrect ?? false,
                    isActive: answer.isActive ?? true
                })) || []
            });
            setOriginalData({
                questionText: questionData.questionText || '',
                questionLevel: questionData.questionLevel || 1,
                isActivate: questionData.isActivate ?? true,
                answers: questionData.answers?.map(answer => ({
                    answerId: answer.answerId,
                    answerText: answer.answerText || '',
                    isCorrect: answer.isCorrect ?? false,
                    isActive: answer.isActive ?? true
                })) || []
            });
        }
    }, [question?.data, isEditMode]);

    const handleEditClick = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const handleCancel = useCallback(() => {
        if (originalData) {
            setFormData({...originalData});
        }
        setIsEditMode(false);
    }, [originalData]);

    const handleQuestionFieldChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const handleAnswerChange = useCallback((index, field, value) => {
        setFormData(prev => ({
            ...prev,
            answers: prev.answers.map((answer, i) =>
                i === index ? {...answer, [field]: value} : answer
            )
        }));
    }, []);

    const handleSave = useCallback(async () => {
        try {
            // Update question
            await updateQuestion({
                questionId: Number(questionId),
                questionText: formData.questionText.trim(),
                questionLevel: formData.questionLevel,
                isActivate: formData.isActivate
            }).unwrap();

            // Update modified answers
            if (originalData) {
                const answerPromises = formData.answers.map(async (answer, index) => {
                    const originalAnswer = originalData.answers[index];
                    if (!originalAnswer) return;

                    // Check if answer was modified
                    const isModified =
                        answer.answerText !== originalAnswer.answerText ||
                        answer.isCorrect !== originalAnswer.isCorrect ||
                        answer.isActive !== originalAnswer.isActive;

                    if (isModified) {
                        return updateAnswer({
                            answerId: answer.answerId,
                            questionId: Number(questionId),
                            answerText: answer.answerText.trim(),
                            isCorrect: answer.isCorrect,
                            isActive: answer.isActive
                        }).unwrap();
                    }
                    return Promise.resolve();
                });

                await Promise.all(answerPromises);
            }

            setSnackbar({
                open: true,
                message: 'Soru başarıyla güncellendi!',
                severity: 'success'
            });
            setIsEditMode(false);
            setOriginalData({...formData});
        } catch (error) {
            setSnackbar({
                open: true,
                message: error?.data?.message || error?.message || 'Güncelleme sırasında bir hata oluştu!',
                severity: 'error'
            });
        }
    }, [formData, originalData, questionId, updateQuestion, updateAnswer]);

    const handleCloseSnackbar = useCallback(() => {
        setSnackbar(prev => ({...prev, open: false}));
    }, []);

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleDeleteClick = useCallback(() => {
        setDeleteDialogOpen(true);
    }, []);

    const handleCloseDeleteDialog = useCallback(() => {
        if (!isDeleting) {
            setDeleteDialogOpen(false);
        }
    }, [isDeleting]);

    const handleConfirmDelete = useCallback(async () => {
        try {
            await deleteQuestion(Number(questionId)).unwrap();
            setSnackbar({
                open: true,
                message: 'Soru başarıyla silindi!',
                severity: 'success'
            });
            setDeleteDialogOpen(false);
            // Navigate to question list page after a short delay to show success message
            setTimeout(() => {
                navigate('/panel/question');
            }, 500);
        } catch (error) {
            setSnackbar({
                open: true,
                message: error?.data?.message || error?.message || 'Silme işlemi sırasında bir hata oluştu!',
                severity: 'error'
            });
        }
    }, [questionId, deleteQuestion, navigate]);

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
    const isSaving = isUpdatingQuestion || isUpdatingAnswer;

    return (
        <Box sx={{width: '100%', padding: 3, position: 'relative'}}>
            {/* Geri Butonu - Sağ Üst */}
            <Box sx={{
                position: 'absolute',
                top: 3,
                right: 3,
                marginBottom: '3px'
            }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon/>}
                    onClick={handleBack}
                    disabled={isLoading}
                >
                    Geri dön
                </Button>
            </Box>

            <Box sx={{display: 'flex', gap: 3, flexWrap: 'wrap', marginTop: '48px'}}>
            {/* Soru Detayları Formu */}
            <Paper sx={{padding: 3, flex: 1, minWidth: '400px'}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3}}>
                    <Typography variant="h5" sx={{fontWeight: 'bold'}}>
                        Soru Detayları
                    </Typography>
                    {!isEditMode ? (
                        <Box sx={{display: 'flex', gap: 1}}>
                        <Tooltip title="Düzenle">
                            <IconButton
                                color="primary"
                                onClick={handleEditClick}
                                disabled={isLoading}
                            >
                                <EditIcon/>
                            </IconButton>
                        </Tooltip>
                            <Tooltip title="Sil">
                                <IconButton
                                    color="error"
                                    onClick={handleDeleteClick}
                                    disabled={isLoading}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ) : (
                        <Box sx={{display: 'flex', gap: 1}}>
                            <Tooltip title="Kaydet">
                                <IconButton
                                    color="success"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    <SaveIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="İptal">
                                <IconButton
                                    color="error"
                                    onClick={handleCancel}
                                    disabled={isSaving}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    {isEditMode ? (
                        <>
                            <FormControl fullWidth required>
                                <InputLabel id="question-level-label">Soru Seviyesi</InputLabel>
                                <Select
                                    labelId="question-level-label"
                                    id="question-level-select"
                                    value={formData.questionLevel}
                                    label="Soru Seviyesi"
                                    onChange={(e) => handleQuestionFieldChange('questionLevel', e.target.value)}
                                    disabled={isSaving}
                                >
                                    {Array.from(
                                        {length: QUESTION_CONSTANTS.MAX_LEVEL},
                                        (_, i) => i + QUESTION_CONSTANTS.MIN_LEVEL
                                    ).map((level) => (
                                        <MenuItem key={level} value={level}>
                                            Seviye {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Soru Metni"
                                value={formData.questionText}
                                onChange={(e) => handleQuestionFieldChange('questionText', e.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                                required
                                disabled={isSaving}
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={formData.isActivate}
                                        onChange={(e) => handleQuestionFieldChange('isActivate', e.target.checked)}
                                        disabled={isSaving}
                                    />
                                }
                                label="Aktif Soru"
                            />
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </Box>
            </Paper>

            {/* Cevaplar Tablosu */}
            <Paper sx={{padding: 3, flex: 1, minWidth: '400px'}}>
                <Typography variant="h5" sx={{marginBottom: 3, fontWeight: 'bold'}}>
                    Cevaplar
                </Typography>

                <TableContainer sx={{
                    maxHeight: '300px',
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
                            {isEditMode ? (
                                formData.answers?.length > 0 ? (
                                    formData.answers.map((answer, index) => (
                                        <TableRow key={answer.answerId || index} hover>
                                            <TableCell>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={answer.isCorrect}
                                                            onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                                                            disabled={isSaving}
                                                            sx={{
                                                                color: 'success.main',
                                                                '&.Mui-checked': {
                                                                    color: 'success.main',
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label="Doğru"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={answer.answerText}
                                                    onChange={(e) => handleAnswerChange(index, 'answerText', e.target.value)}
                                                    fullWidth
                                                    size="small"
                                                    disabled={isSaving}
                                                    required
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} align="center">
                                            <Typography color="textSecondary">
                                                Bu soruya ait cevap bulunmamaktadır.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            ) : (
                                questionData.answers?.length > 0 ? (
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
                                        <TableCell colSpan={2} align="center">
                                            <Typography color="textSecondary">
                                                Bu soruya ait cevap bulunmamaktadır.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{width: '100%'}}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
                dialogTitle="Soru Silme Onayı"
                dialogContent="Bu soruyu silmek istediğinize emin misiniz?"
                questionText={questionData?.questionText || ''}
                isDeleting={isDeleting}
            />
        </Box>
    )
}
