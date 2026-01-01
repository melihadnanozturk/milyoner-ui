import { Button, Checkbox, FormControlLabel, Stack, TextField } from "@mui/material";

export default function AnswerList({ answers, minAnswers, onAnswerChange, onRemoveAnswer }) {
    return (
        <Stack
            spacing={2}
            sx={{
                flex: 1,
                width: '100%',
            }}
        >
            {
                answers.map((answer, index) => (
                    <Stack
                        key={index}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        alignItems={{ xs: 'stretch', sm: 'center' }}
                        sx={{
                            p: { xs: 1.5, sm: 0 },
                            backgroundColor: { xs: 'background.paper', sm: 'transparent' },
                            borderRadius: { xs: 2, sm: 0 },
                        }}
                    >
                        <TextField
                            label={`Cevap ${index + 1}`}
                            value={answer.answerText}
                            onChange={(e) => onAnswerChange(index, 'answerText', e.target.value)}
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
                                        onChange={(e) => onAnswerChange(index, 'isCorrect', e.target.checked)}
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
                                    minWidth: { xs: 'auto', sm: '100px' },
                                    m: 0
                                }}
                            />

                            {answers.length > minAnswers && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => onRemoveAnswer(index)}
                                    sx={{
                                        minWidth: { xs: '60px', sm: 'auto' },
                                        px: { xs: 1, sm: 2 }
                                    }}
                                >
                                    Sil
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                ))
            }
        </Stack >
    );
}
