import {useCallback, useMemo, useState} from "react";
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
import {useCreateNewQuestionMutation} from "../../page/panel/slice/panelApi.js";

const INITIAL_ANSWERS = [
    {answerText: "", isCorrect: false},
    {answerText: "", isCorrect: false},
    {answerText: "", isCorrect: false},
    {answerText: "", isCorrect: false},
];

const MIN_ANSWERS = 3;
const MIN_WRONG_ANSWERS = 3;
const REQUIRED_CORRECT_ANSWERS = 1;
const MIN_TOTAL_ANSWERS = 4;
const MIN_LEVEL = 1;
const MAX_LEVEL = 10;

export default function CreateAnswerForm() {
    const [questionText, setQuestionText] = useState("");
    const [answers, setAnswers] = useState(INITIAL_ANSWERS);
    const [isActive, setIsActive] = useState(true);
    const [questionLevel, setQuestionLevel] = useState(1);
    const [error, setError] = useState("");

    const [createQuestion] = useCreateNewQuestionMutation();

    const handleAddAnswer = useCallback(() => {
        setAnswers(prev => [...prev, {answerText: "", isCorrect: false}]);
    }, []);

    const handleAnswerChange = useCallback((index, field, value) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = {...newAnswers[index], [field]: value};
            return newAnswers;
        });
    }, []);

    const handleRemoveAnswer = useCallback((index) => {
        setAnswers(prev => prev.length > MIN_ANSWERS ? prev.filter((_, i) => i !== index) : prev);
    }, []);

    const validationResult = useMemo(() => {
        if (!questionText.trim()) {
            return {isValid: false, error: "Soru metni boş olamaz!"};
        }

        if (!questionLevel || questionLevel < MIN_LEVEL || questionLevel > MAX_LEVEL) {
            return {isValid: false, error: "Geçerli bir soru seviyesi seçmelisiniz (1-10)!"};
        }

        if (!isActive) {
            return {isValid: true, error: ""};
        }

        const correctAnswers = answers.filter(a => a.isCorrect);
        const wrongAnswers = answers.filter(a => !a.isCorrect && a.answerText.trim());
        const filledAnswers = answers.filter(a => a.answerText.trim());

        if (correctAnswers.length === 0) {
            return {isValid: false, error: "Aktif bir soru için en az 1 doğru cevap eklemelisiniz!"};
        }

        if (correctAnswers.length > REQUIRED_CORRECT_ANSWERS) {
            return {isValid: false, error: "Aktif bir soru için sadece 1 doğru cevap olmalıdır!"};
        }

        if (wrongAnswers.length < MIN_WRONG_ANSWERS) {
            return {isValid: false, error: "Aktif bir soru için en az 3 yanlış cevap eklemelisiniz!"};
        }

        if (filledAnswers.length < MIN_TOTAL_ANSWERS) {
            return {isValid: false, error: "Aktif bir soru için minimum 3 yanlış ve 1 doğru cevap gereklidir!"};
        }

        return {isValid: true, error: ""};
    }, [questionText, answers, isActive, questionLevel]);

    const resetForm = useCallback(() => {
        setQuestionText("");
        setAnswers(INITIAL_ANSWERS);
        setIsActive(true);
        setQuestionLevel(1);
        setError("");
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (!validationResult.isValid) {
            setError(validationResult.error);
            return;
        }

            const questionData = {
                questionText: questionText.trim(),
                answers: answers.filter(a => a.answerText.trim()),
                questionLevel: questionLevel,
                activate: isActive
            };

        try {
            await createQuestion(questionData).unwrap();
            resetForm();
            setError('');
            alert("Soru başarılı şekilde oluşturuldu :) ")

        } catch (err) {
            setError(err.message || "Kayıt sırasında bir hata oluştu!");
        }
    }, [validationResult, questionText, answers, isActive, questionLevel, resetForm, createQuestion]);

    return (
        <Form onSubmit={handleSubmit} maxWidth={false}>
            <Stack
                spacing={{xs: 2, sm: 3, md: 5}}
                sx={{
                    minHeight: {xs: 'auto', md: 'calc(100vh - 150px)'},
                    py: {xs: 1, sm: 2},
                    width: '100%'
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: {xs: '1.25rem', sm: '1.5rem', md: '1.75rem'}
                    }}
                >
                    Yeni Soru Oluştur
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        onClose={() => setError("")}
                        sx={{fontSize: {xs: '0.875rem', sm: '1rem'}}}
                    >
                        {error}
                    </Alert>
                )}

                <Grid
                    container
                    spacing={{xs: 2, sm: 3}}
                    sx={{
                        height: {xs: 'auto', md: '100%'},
                        overflow: 'hidden',
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Sol Taraf - Soru Bilgileri */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2} sx={{height: '100%'}}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: 'primary.main',
                                    fontSize: {xs: '1rem', sm: '1.25rem'}
                                }}
                            >
                                Soru Metni
                            </Typography>

                            <TextField
                                label="Soru Metni"
                                value={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                multiline
                                rows={{xs: 4, sm: 6}}
                                fullWidth
                                required
                            />

                            <FormControl fullWidth required>
                                <InputLabel id="question-level-label">Soru Seviyesi</InputLabel>
                                <Select
                                    labelId="question-level-label"
                                    id="question-level-select"
                                    value={questionLevel}
                                    label="Soru Seviyesi"
                                    onChange={(e) => setQuestionLevel(e.target.value)}
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
                                    {Array.from({ length: MAX_LEVEL }, (_, i) => i + MIN_LEVEL).map((level) => (
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
                    <Grid item xs={12} md={6}>
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
                                    fontSize: {xs: '1rem', sm: '1.25rem'}
                                }}
                            >
                                Cevaplar (En az 3 yanlış, 1 doğru)
                            </Typography>

                            <Stack
                                spacing={2}
                                sx={{
                                    flex: 1,
                                    maxHeight: {xs: '400px', md: 'none'},
                                    overflow: 'auto',
                                    pr: 1,
                                    '&::-webkit-scrollbar': {
                                        width: '6px',
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
                                }}
                            >
                                {answers.map((answer, index) => (
                                    <Stack
                                        key={index}
                                        direction={{xs: 'column', sm: 'row'}}
                                        spacing={1}
                                        alignItems={{xs: 'stretch', sm: 'center'}}
                                        sx={{
                                            p: {xs: 1.5, sm: 0},
                                            backgroundColor: {xs: 'background.paper', sm: 'transparent'},
                                            borderRadius: {xs: 2, sm: 0},
                                        }}
                                    >
                                        <TextField
                                            label={`Cevap ${index + 1}`}
                                            value={answer.answerText}
                                            onChange={(e) => handleAnswerChange(index, 'answerText', e.target.value)}
                                            fullWidth
                                            size="small"
                                        />

                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            justifyContent="space-between"
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={answer.isCorrect}
                                                        onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                                                        sx={{
                                                            color: 'success.main',
                                                            '&.Mui-checked': {
                                                                color: 'success.main',
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="Doğru"
                                                sx={{
                                                    minWidth: {xs: 'auto', sm: '100px'},
                                                    m: 0
                                                }}
                                            />

                                            {answers.length > MIN_ANSWERS && (
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleRemoveAnswer(index)}
                                                    sx={{
                                                        minWidth: {xs: '60px', sm: 'auto'},
                                                        px: {xs: 1, sm: 2}
                                                    }}
                                                >
                                                    Sil
                                                </Button>
                                            )}
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>

                            <Button
                                variant="outlined"
                                onClick={handleAddAnswer}
                                fullWidth
                                sx={{
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    py: {xs: 1, sm: 1.2},
                                    fontSize: {xs: '0.875rem', sm: '1rem'},
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
                    sx={{
                        backgroundColor: 'primary.main',
                        color: 'black',
                        fontWeight: 'bold',
                        /*mt: { xs: 2, md: 'auto !important' },*/
                        py: {xs: 1.2, sm: 1.5},
                        fontSize: {xs: '0.875rem', sm: '1rem'},
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                >
                    Kaydet
                </Button>
            </Stack>
        </Form>
    );
}