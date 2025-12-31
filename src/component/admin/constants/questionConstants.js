export const QUESTION_CONSTANTS = {
    MIN_LEVEL: 1,
    MAX_LEVEL: 10,
    MIN_ANSWERS: 3,
    MIN_WRONG_ANSWERS: 3,
    REQUIRED_CORRECT_ANSWERS: 1,
    MIN_TOTAL_ANSWERS: 4,
};

export const VALIDATION_MESSAGES = {
    EMPTY_QUESTION: "Soru metni boş olamaz!",
    INVALID_LEVEL: "Geçerli bir soru seviyesi seçmelisiniz (1-10)!",
    NO_CORRECT_ANSWER: "Aktif bir soru için en az 1 doğru cevap eklemelisiniz!",
    TOO_MANY_CORRECT: "Aktif bir soru için sadece 1 doğru cevap olmalıdır!",
    NOT_ENOUGH_WRONG: "Aktif bir soru için en az 3 yanlış cevap eklemelisiniz!",
    NOT_ENOUGH_TOTAL: "Aktif bir soru için minimum 3 yanlış ve 1 doğru cevap gereklidir!",
    SUBMIT_ERROR: "Kayıt sırasında bir hata oluştu!",
    SUCCESS: "Soru başarılı şekilde oluşturuldu!",
};
