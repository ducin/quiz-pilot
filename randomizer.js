const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

// Helper function to filter and shuffle questions by difficulty
function getShuffledQuestionsByDifficulty(questions, difficulty, count) {
    const filteredQuestions = questions.filter(q => q.difficulty === difficulty);
    return shuffleArray(filteredQuestions).slice(0, count);
}

// Function to randomize questions based on test definition
function getRandomizedQuestions(testDefinition, questions) {
    const { BASIC, ADVANCED, EXPERT } = testDefinition.questions;
    return {
        BASIC: getShuffledQuestionsByDifficulty(questions, 'BASIC', BASIC),
        ADVANCED: getShuffledQuestionsByDifficulty(questions, 'ADVANCED', ADVANCED),
        EXPERT: getShuffledQuestionsByDifficulty(questions, 'EXPERT', EXPERT)
    };
}
