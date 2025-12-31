import { useMemo } from "react";

const MIN_LEVEL = 1;
const MAX_LEVEL = 10;
const REQUIRED_CORRECT_ANSWERS = 1;
const MIN_WRONG_ANSWERS = 3;
const MIN_TOTAL_ANSWERS = 4;

export function useQuestionValidation(questionText, answers, isActive, questionLevel) {
    return useMemo(() => {
        if (!questionText.trim()) {
            return { isValid: false, error: "Soru metni boş olamaz!" };
        }

        if (!questionLevel || questionLevel < MIN_LEVEL || questionLevel > MAX_LEVEL) {
            return { isValid: false, error: "Geçerli bir soru seviyesi seçmelisiniz (1-10)!" };
        }

        if (!isActive) {
            return { isValid: true, error: "" };
        }

        const correctAnswers = answers.filter(a => a.isCorrect);
        const wrongAnswers = answers.filter(a => !a.isCorrect && a.answerText.trim());
        const filledAnswers = answers.filter(a => a.answerText.trim());

        if (correctAnswers.length === 0) {
            return { isValid: false, error: "Aktif bir soru için en az 1 doğru cevap eklemelisiniz!" };
        }

        if (correctAnswers.length > REQUIRED_CORRECT_ANSWERS) {
            return { isValid: false, error: "Aktif bir soru için sadece 1 doğru cevap olmalıdır!" };
        }

        if (wrongAnswers.length < MIN_WRONG_ANSWERS) {
            return { isValid: false, error: "Aktif bir soru için en az 3 yanlış cevap eklemelisiniz!" };
        }

        if (filledAnswers.length < MIN_TOTAL_ANSWERS) {
            return { isValid: false, error: "Aktif bir soru için minimum 3 yanlış ve 1 doğru cevap gereklidir!" };
        }

        return { isValid: true, error: "" };
    }, [questionText, answers, isActive, questionLevel]);
}
