const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function processQuestions(inputPath, outputPath) {
    // Load input file
    const data = fs.readFileSync(inputPath);
    const questionsData = JSON.parse(data);
    
    const processedQuestions = questionsData.questions.map(question => {
        // // For CODE_COMPLETION, return early without modifying options or correctAnswers
        // if (question.type === 'CODE_COMPLETION') {
        //     return {
        //         ...question,
        //         id: uuidv4(),
        //     };
        // }

        // // Generate new question ID
        // const newQuestionId = uuidv4();
        
        // // Process options and create ID mapping
        // const optionIdMap = new Map();

        // const processedOptions = question.options.map(option => {
        //     const newOptionId = uuidv4();
        //     optionIdMap.set(option.id, newOptionId);
        //     return { ...option, id: newOptionId };
        // });

        // // Update correct answers with new IDs
        // const newCorrectAnswers = question.correctAnswers.map(oldId => {
        //     const newId = optionIdMap.get(oldId);
        //     if (!newId) throw new Error(`Missing option ID mapping for ${oldId}`);
        //     return newId;
        // });

        question.tags = ['promql'];

        // return {
        //     ...question,
        //     id: newQuestionId,
        //     options: processedOptions,
        //     correctAnswers: question.type === 'SINGLE_CHOICE' 
        //         ? [newCorrectAnswers[0]] 
        //         : newCorrectAnswers
        // };
        return question;
    });

    // Write output file
    fs.writeFileSync(outputPath, JSON.stringify(
        { questions: processedQuestions }, null, 2
    ));
}

// Usage
processQuestions('questions.json', 'questions-output.json');
