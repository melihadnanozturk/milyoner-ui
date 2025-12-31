import { useState, useCallback } from "react";

const INITIAL_ANSWERS = [
    { answerText: "", isCorrect: false },
    { answerText: "", isCorrect: false },
    { answerText: "", isCorrect: false },
    { answerText: "", isCorrect: false },
];

const MIN_ANSWERS = 3;

export function useQuestionForm() {
    const [questionText, setQuestionText] = useState("");
    const [answers, setAnswers] = useState(INITIAL_ANSWERS);
    const [isActive, setIsActive] = useState(true);
    const [questionLevel, setQuestionLevel] = useState(1);
    const [error, setError] = useState("");

    const handleAddAnswer = useCallback(() => {
        setAnswers(prev => [...prev, { answerText: "", isCorrect: false }]);
    }, []);

    const handleAnswerChange = useCallback((index, field, value) => {
        setAnswers(prev => {
            const newAnswers = [...prev];
            newAnswers[index] = { ...newAnswers[index], [field]: value };
            return newAnswers;
        });
    }, []);

    const handleRemoveAnswer = useCallback((index) => {
        setAnswers(prev => prev.length > MIN_ANSWERS ? prev.filter((_, i) => i !== index) : prev);
    }, []);

    const resetForm = useCallback(() => {
        setQuestionText("");
        setAnswers(INITIAL_ANSWERS);
        setIsActive(true);
        setQuestionLevel(1);
        setError("");
    }, []);

    return {
        formData: {
            questionText,
            answers,
            isActive,
            questionLevel,
            error,
        },
        formActions: {
            setQuestionText,
            setAnswers,
            setIsActive,
            setQuestionLevel,
            setError,
            handleAddAnswer,
            handleAnswerChange,
            handleRemoveAnswer,
            resetForm,
        },
        constants: {
            MIN_ANSWERS,
        },
    };
}
