import { useCallback } from "react";
import {
    Alert,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Stack,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from "@mui/material";
import Form from "../Form.jsx";
import { useCreateNewQuestionMutation } from "../../page/panel/slice/panelApi.js";
import { useQuestionForm } from "./hooks/useQuestionForm.js";
import { useQuestionValidation } from "./hooks/useQuestionValidation.js";
import { QUESTION_CONSTANTS, VALIDATION_MESSAGES } from "./constants/questionConstants.js";
import AnswerList from "./AnswerList.jsx";

export default function CreateQuestionForm() {
    const { formData, formActions, constants } = useQuestionForm();
    const { questionText, answers, isActive, questionLevel, error } = formData;
    const {
        setQuestionText,
        setIsActive,
        setQuestionLevel,
        setError,
        handleAddAnswer,
        handleAnswerChange,
        handleRemoveAnswer,
        resetForm,
    } = formActions;

    const [createQuestion, { isLoading }] = useCreateNewQuestionMutation();

    const validationResult = useQuestionValidation(questionText, answers, isActive, questionLevel);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validationResult.isValid) {
            setError(validationResult.error);
            return;
        }

        const questionData = {
            questionText: questionText.trim(),
            answers: answers.filter(a => a.answerText.trim()),
            questionLevel,
            activate: isActive
        };

        try {
            await createQuestion(questionData).unwrap();
            resetForm();
            setError('');
            alert(VALIDATION_MESSAGES.SUCCESS);
        } catch (err) {
            setError(err.message || VALIDATION_MESSAGES.SUBMIT_ERROR);
        }
    }, [validationResult, questionText, answers, isActive, questionLevel, resetForm, createQuestion, setError]);

    return (
        <Form onSubmit={handleSubmit} maxWidth={false}>
            <Stack
                spacing={{ xs: 2, sm: 3, md: 5 }}
                sx={{
                    // minHeight: { xs: 'auto', md: 'calc(100vh - 150px)' }, // Removed fixed height
                    py: { xs: 1, sm: 2 },
                    width: '100%'
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                    }}
                >
                    Yeni Soru Oluştur
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        onClose={() => setError("")}
                        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                    >
                        {error}
                    </Alert>
                )}

                <Grid
                    container
                    spacing={{ xs: 2, sm: 3 }}
                    sx={{
                        // height: { xs: 'auto', md: '100%' }, // Removed fixed height
                        // overflow: 'hidden', // Removed overflow hidden
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Sol Taraf - Soru Bilgileri */}
                    <Grid item xs={12} >
                        <Stack spacing={2} sx={{ height: '100%' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'primary.main',
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                }}
                            >
                                Soru Metni
                            </Typography>

                            <TextField
                                label="Soru Metni"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                multiline
                                rows={{ xs: 4, sm: 6 }}
                                fullWidth
                                required
                                disabled={isLoading}
                            />

                            <FormControl fullWidth required>
                                <InputLabel id="question-level-label">Soru Seviyesi</InputLabel>
                                <Select
                                    labelId="question-level-label"
                                    id="question-level-select"
                                    value={questionLevel}
                                    label="Soru Seviyesi"
                                    onChange={(e) => setQuestionLevel(e.target.value)}
                                    disabled={isLoading}
                                    sx={{
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'primary.main',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'primary.main',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'primary.main',
                                        },
                                    }}
                                >
                                    {Array.from(
                                        { length: QUESTION_CONSTANTS.MAX_LEVEL },
                                        (_, i) => i + QUESTION_CONSTANTS.MIN_LEVEL
                                    ).map((level) => (
                                        <MenuItem key={level} value={level}>
                                            Seviye {level}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isActive}
                                        onChange={(e) => setIsActive(e.target.checked)}
                                        disabled={isLoading}
                                        sx={{
                                            color: 'primary.main',
                                            '&.Mui-checked': {
                                                color: 'primary.main',
                                            }
                                        }}
                                    />
                                }
                                label="Aktif Soru"
                            />
                        </Stack>
                    </Grid>

                    {/* Sağ Taraf - Cevaplar */}
                    <Grid item xs={12} >
                        <Stack
                            spacing={2}
                            sx={{
                                height: '100%',
                                overflow: 'hidden'
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'primary.main',
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                }}
                            >
                                Cevaplar (En az 3 yanlış, 1 doğru)
                            </Typography>

                            <AnswerList
                                answers={answers}
                                minAnswers={constants.MIN_ANSWERS}
                                onAnswerChange={handleAnswerChange}
                                onRemoveAnswer={handleRemoveAnswer}
                            />

                            <Button
                                variant="outlined"
                                onClick={handleAddAnswer}
                                fullWidth
                                disabled={isLoading}
                                sx={{
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    py: { xs: 1, sm: 1.2 },
                                    fontSize: { xs: '0.875rem', sm: '1rem' },
                                    '&:hover': {
                                        borderColor: 'primary.dark',
                                        backgroundColor: 'primary.dark',
                                        color: 'white'
                                    }
                                }}
                            >
                                Cevap Ekle
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading}
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'black',
                        fontWeight: 'bold',
                        py: { xs: 1.2, sm: 1.5 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                >
                    {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
                </Button>
            </Stack>
        </Form>
    );
}
