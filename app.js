// Application State
const appState = {
    currentQuestionIndex: 0,
    userAnswers: {},
    submitted: {},
    score: 0,
    isTestComplete: false,
    shuffledOptions: {}, // Store shuffled options for each question
    selectedTest: null, // The test object currently being taken
    testExecutionId: null, // GUID for this execution
    executions: [] // Array of all past executions
};

// DOM Elements
const elements = {
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    questionContainer: document.getElementById('questionContainer'),
    summaryContainer: document.getElementById('summaryContainer'),
    difficultyBadge: document.getElementById('difficultyBadge'),
    questionType: document.getElementById('questionType'),
    questionText: document.getElementById('questionText'),
    singleChoiceOptions: document.getElementById('singleChoiceOptions'),
    multipleChoiceOptions: document.getElementById('multipleChoiceOptions'),
    codeCompletionOptions: document.getElementById('codeCompletionOptions'),
    codeTemplate: document.getElementById('codeTemplate'),
    codeInputs: document.getElementById('codeInputs'),
    feedbackSection: document.getElementById('feedbackSection'),
    feedbackResult: document.getElementById('feedbackResult'),
    explanation: document.getElementById('explanation'),
    prevBtn: document.getElementById('prevBtn'),
    submitBtn: document.getElementById('submitBtn'),
    nextBtn: document.getElementById('nextBtn'),
    totalScore: document.getElementById('totalScore'),
    basicScore: document.getElementById('basicScore'),
    advancedScore: document.getElementById('advancedScore'),
    expertScore: document.getElementById('expertScore'),
    missedQuestions: document.getElementById('missedQuestions'),
    missedQuestionsList: document.getElementById('missedQuestionsList'),
    themeToggle: document.getElementById('themeToggle'),
    welcomeContainer: document.getElementById('welcomeContainer'),
    testList: document.getElementById('testList'),
    executionSummary: document.getElementById('executionSummary'),
    executionHistoryList: document.getElementById('executionHistoryList'),
    navigationControls: document.getElementById('navigationControls'),
    startTestBtn: document.getElementById('startTestBtn')
};

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


// Theme Management
function initTheme() {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function setTheme(theme) {
    document.body.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-color-scheme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Utility: Format string, wrapping backtick content in <code>
function formatWithCodeSpans(str) {
    if (!str) return '';
    // Replace all `...` with <code>...</code>
    return str.replace(/`([^`]+)`/g, '<code>$1</code>');
}

// Utility: Generate GUID
function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Local Storage Keys
const EXECUTIONS_KEY = 'testExecutions';

// Load executions from localStorage
function loadExecutions() {
    const data = localStorage.getItem(EXECUTIONS_KEY);
    if (data) {
        try {
            appState.executions = JSON.parse(data);
        } catch (e) {
            appState.executions = [];
        }
    } else {
        appState.executions = [];
    }
}

// Save executions to localStorage
function saveExecutions() {
    localStorage.setItem(EXECUTIONS_KEY, JSON.stringify(appState.executions));
}

let questions = [];
let tests = [];

// Load questions and tests from JSON files
async function loadData() {
    document.getElementById('loadingSpinner').style.display = 'flex';
    const [questionsRes, testsRes] = await Promise.all([
        fetch('questions.json').then(r => r.json()),
        fetch('tests.json').then(r => r.json())
    ]);
    questions = questionsRes.questions;
    tests = testsRes;
    loadExecutions();
    document.getElementById('loadingSpinner').style.display = 'none';
    renderWelcomePage();
    setupEventListeners();
}

// Update getTestQuestionPool to filter by tags if present
function getTestQuestionPool(test) {
    // If tags are present, filter questions by tags
    if (Array.isArray(test.tags) && test.tags.length > 0) {
        return questions.filter(q => Array.isArray(q.tags) && q.tags.some(tag => test.tags.includes(tag)));
    }
    if (test.questionPool === 'all') return questions;
    // If it's an array of IDs, map to question objects
    if (Array.isArray(test.questionPool)) {
        return test.questionPool.map(qid => questions.find(q => q.id === qid)).filter(Boolean);
    }
    return [];
}

// Render the welcome page with test list
function renderWelcomePage() {
    elements.welcomeContainer.style.display = 'block';
    elements.questionContainer.style.display = 'none';
    elements.summaryContainer.style.display = 'none';
    elements.navigationControls.style.display = 'none';
    elements.progressFill.style.width = '0%';
    elements.progressFill.parentElement.style.display = 'none';
    elements.progressText.textContent = '';
    elements.progressText.style.display = 'none';
    elements.testList.innerHTML = '';
    let selectedTestId = null;
    // Render test tiles
    tests.forEach((test, idx) => {
        const pool = getTestQuestionPool(test);
        const numInTest = Object.values(test.questions).reduce((a, b) => a + b, 0);
        const tagsHtml = (Array.isArray(test.tags) && test.tags.length > 0)
            ? `<div class="test-card-tags">${test.tags.map(tag => `<span class='test-tag'>${tag}</span>`).join('')}</div>`
            : '';
        const card = document.createElement('div');
        card.className = 'test-card';
        card.tabIndex = 0;
        card.innerHTML = `
            <div class="test-card-title">${test.name}</div>
            ${tagsHtml}
            <div class="test-card-desc">${test.description || ''}</div>
            <div class="test-card-questions">${numInTest} out of ${pool.length} questions</div>
        `;
        card.addEventListener('click', () => {
            // Deselect all
            Array.from(elements.testList.children).forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedTestId = test.id;
            elements.startTestBtn.disabled = false;
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                card.click();
            }
        });
        elements.testList.appendChild(card);
    });
    // Start Test button logic
    elements.startTestBtn.disabled = true;
    elements.startTestBtn.onclick = () => {
        if (selectedTestId) startTest(selectedTestId);
    };
    renderExecutionSummary();
    elements.executionSummary.style.display = 'block';
}

// --- Test Execution Storage ---
// Store user answers in each execution
function getExecutionAnswers() {
    // Store a copy of userAnswers and submitted for review
    return {
        userAnswers: JSON.parse(JSON.stringify(appState.userAnswers)),
        submitted: JSON.parse(JSON.stringify(appState.submitted))
    };
}

// --- Test History Review Modal ---
// Create and show a modal with execution details
function showExecutionReview(execution) {
    // Find the test and questions
    const test = tests.find(t => t.id === execution.testId);
    // Use the stored question IDs from the execution
    const testQuestions = (execution.questionIds || []).map(qid => questions.find(q => q.id === qid)).filter(Boolean);
    // Modal container
    let modal = document.getElementById('reviewModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'reviewModal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.5)';
        modal.style.zIndex = '1000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.innerHTML = '<div class="review-modal-content card" style="max-width:700px;width:100%;max-height:90vh;overflow:auto;position:relative;"></div>';
        document.body.appendChild(modal);
    }
    const content = modal.querySelector('.review-modal-content');
    content.innerHTML = `<button style="position:absolute;top:12px;right:16px;font-size:1.5em;background:none;border:none;cursor:pointer;z-index:10;" aria-label="Close">×</button>
        <h2 style="margin-bottom:16px;">Test Review: ${test ? test.name : 'Unknown Test'}</h2>
        <div style="margin-bottom:16px;">Score: <b>${execution.score} / ${execution.total} (${Math.round((execution.score/execution.total)*100)}%)</b></div>
        <div class="review-questions-list"></div>
    `;
    // Close button
    content.querySelector('button').onclick = () => { modal.remove(); };
    // Questions review
    const list = content.querySelector('.review-questions-list');
    testQuestions.forEach((q, idx) => {
        const userAns = (execution.answers && execution.answers.userAnswers && execution.answers.userAnswers[q.id]) || null;
        const submitted = (execution.answers && execution.answers.submitted && execution.answers.submitted[q.id]) || false;
        let isCorrect = false;
        if (submitted) {
            if (q.type === 'SINGLE_CHOICE') {
                isCorrect = q.correctAnswers.includes(userAns);
            } else if (q.type === 'MULTIPLE_CHOICE') {
                if (Array.isArray(userAns)) {
                    const sortedUser = [...userAns].sort();
                    const sortedCorrect = [...q.correctAnswers].sort();
                    isCorrect = sortedUser.length === sortedCorrect.length && sortedUser.every((val, i) => val === sortedCorrect[i]);
                }
            } else if (q.type === 'CODE_COMPLETION') {
                if (Array.isArray(userAns)) {
                    isCorrect = userAns.every((a, i) => a && a.trim().toLowerCase() === q.correctAnswers[i].toLowerCase());
                }
            }
        }
        // User answer display
        let userAnsDisplay = '';
        if (q.type === 'SINGLE_CHOICE') {
            const opt = q.options.find(o => o.id === userAns);
            userAnsDisplay = opt ? formatWithCodeSpans(opt.label) : '<em>No answer</em>';
        } else if (q.type === 'MULTIPLE_CHOICE') {
            if (Array.isArray(userAns) && userAns.length > 0) {
                userAnsDisplay = userAns.map(id => {
                    const opt = q.options.find(o => o.id === id);
                    return opt ? formatWithCodeSpans(opt.label) : '';
                }).join(', ');
            } else {
                userAnsDisplay = '<em>No answer</em>';
            }
        } else if (q.type === 'CODE_COMPLETION') {
            if (Array.isArray(userAns) && userAns.length > 0) {
                userAnsDisplay = userAns.map((a, i) => `<code>${a || ''}</code>`).join(', ');
            } else {
                userAnsDisplay = '<em>No answer</em>';
            }
        }
        // Correct answer display
        let correctAnsDisplay = '';
        if (q.type === 'SINGLE_CHOICE') {
            const opt = q.options.find(o => o.id === q.correctAnswers[0]);
            correctAnsDisplay = opt ? formatWithCodeSpans(opt.label) : '';
        } else if (q.type === 'MULTIPLE_CHOICE') {
            correctAnsDisplay = q.correctAnswers.map(id => {
                const opt = q.options.find(o => o.id === id);
                return opt ? formatWithCodeSpans(opt.label) : '';
            }).join(', ');
        } else if (q.type === 'CODE_COMPLETION') {
            correctAnsDisplay = q.correctAnswers.map(a => `<code>${a}</code>`).join(', ');
        }
        // Question block
        const qDiv = document.createElement('div');
        qDiv.className = 'review-question-block';
        qDiv.style.marginBottom = '20px';
        qDiv.innerHTML = `
            <div style="font-weight:bold;margin-bottom:4px;">${idx+1}. ${q.text}</div>
            <div style="margin-bottom:4px;">Your answer: ${userAnsDisplay}</div>
            <div style="margin-bottom:4px;">Correct answer: ${correctAnsDisplay}</div>
            <div style="margin-bottom:4px;">Result: <span style="font-weight:bold;color:${isCorrect ? 'var(--color-success)' : 'var(--color-error)'}">${isCorrect ? 'Correct' : 'Incorrect'}</span></div>
            <div style="color:var(--color-text-secondary);font-size:13px;">${formatWithCodeSpans(q.explanation)}</div>
        `;
        list.appendChild(qDiv);
    });
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Render execution summary/history
function renderExecutionSummary() {
    elements.executionHistoryList.innerHTML = '';
    if (!appState.executions.length) {
        elements.executionHistoryList.innerHTML = '<div style="color: var(--color-text-secondary);">No tests taken yet.</div>';
        return;
    }
    // Show most recent first
    const sorted = [...appState.executions].sort((a, b) => b.timestamp - a.timestamp);
    sorted.forEach(exec => {
        const test = tests.find(t => t.id === exec.testId);
        const div = document.createElement('div');
        div.className = 'execution-history-item';
        div.innerHTML = `
            <button class="history-delete-btn" title="Remove this entry" aria-label="Remove" data-exec-id="${exec.id}">&times;</button>
            <div class="execution-history-title">${test ? test.name : 'Unknown Test'}</div>
            <div class="execution-history-meta">
                <span>${new Date(exec.timestamp).toLocaleString()}</span>
                <span class="execution-history-score">${exec.score} / ${exec.total} (${Math.round((exec.score/exec.total)*100)}%)</span>
            </div>
        `;
        div.style.cursor = 'pointer';
        div.onclick = (e) => {
            // Prevent click if X button is clicked
            if (e.target.classList.contains('history-delete-btn')) return;
            showExecutionSummaryView(exec);
        };
        // Add delete handler
        const deleteBtn = div.querySelector('.history-delete-btn');
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            // Remove this execution from appState and localStorage
            appState.executions = appState.executions.filter(x => x.id !== exec.id);
            saveExecutions();
            renderExecutionSummary();
        };
        elements.executionHistoryList.appendChild(div);
    });
}

// Start a test
function startTest(testId) {
    const test = tests.find(t => t.id === testId);
    if (!test) return;
    appState.selectedTest = test;
    appState.testExecutionId = generateGUID();
    appState.currentQuestionIndex = 0;
    appState.userAnswers = {};
    appState.submitted = {};
    appState.score = 0;
    appState.isTestComplete = false;
    appState.shuffledOptions = {};

    // Get the pool for this test
    const pool = getTestQuestionPool(test);
    // Randomize questions for the test
    const randomizedQuestions = getRandomizedQuestions(test, pool);
    // Store the randomized list for this execution
    appState.selectedTest.randomizedQuestions = [
        ...randomizedQuestions.BASIC,
        ...randomizedQuestions.ADVANCED,
        ...randomizedQuestions.EXPERT
    ];

    // Shuffle options for all questions in this test
    getCurrentTestQuestions().forEach(question => {
        if (question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE') {
            appState.shuffledOptions[question.id] = shuffleArray(question.options);
        }
    });

    elements.welcomeContainer.style.display = 'none';
    elements.questionContainer.style.display = 'block';
    elements.navigationControls.style.display = 'flex';
    elements.summaryContainer.style.display = 'none';
    elements.executionSummary.style.display = 'none';
    elements.progressFill.parentElement.style.display = 'block';
    elements.progressText.style.display = 'inline';
    displayQuestion(appState.currentQuestionIndex);
    updateProgress();
}

// Get questions for the current test execution
function getCurrentTestQuestions() {
    if (!appState.selectedTest || !appState.selectedTest.randomizedQuestions) return [];
    return appState.selectedTest.randomizedQuestions;
}

// Override displayQuestion to use current test's questions
function displayQuestion(index) {
    const testQuestions = getCurrentTestQuestions();
    const question = testQuestions[index];
    // Hide all option containers
    elements.singleChoiceOptions.style.display = 'none';
    elements.multipleChoiceOptions.style.display = 'none';
    elements.codeCompletionOptions.style.display = 'none';
    elements.feedbackSection.style.display = 'none';
    // Update question header
    elements.difficultyBadge.textContent = question.difficulty;
    elements.difficultyBadge.className = `difficulty-badge ${question.difficulty.toLowerCase()}`;
    elements.questionType.textContent = question.type.replace('_', ' ');
    // Add question number to question text
    elements.questionText.innerHTML = formatWithCodeSpans(`${index + 1}. ${question.text}`);
    // Display appropriate question type
    if (question.type === 'SINGLE_CHOICE') {
        displaySingleChoice(question);
    } else if (question.type === 'MULTIPLE_CHOICE') {
        displayMultipleChoice(question);
    } else if (question.type === 'CODE_COMPLETION') {
        displayCodeCompletion(question);
    }
    // Show feedback if already submitted
    if (appState.submitted[question.id]) {
        showFeedback(question);
        toggleSubmitNextButtons(true);
    } else {
        toggleSubmitNextButtons(false);
    }
    // Update navigation buttons
    elements.prevBtn.disabled = index === 0;
}

// Override updateProgress to use current test's questions
function updateProgress() {
    const testQuestions = getCurrentTestQuestions();
    const progress = ((appState.currentQuestionIndex + 1) / testQuestions.length) * 100;
    elements.progressFill.style.width = `${progress}%`;
    elements.progressText.textContent = `Question ${appState.currentQuestionIndex + 1} of ${testQuestions.length}`;
}

// Override next/prev/submit to use current test's questions
function submitAndNext() {
    const testQuestions = getCurrentTestQuestions();
    const question = testQuestions[appState.currentQuestionIndex];
    // Mark as submitted and show feedback
    appState.submitted[question.id] = true;
    const isCorrect = validateAnswer(question);
    if (isCorrect) {
        appState.score++;
    }
    showFeedback(question);
    toggleSubmitNextButtons(true);
    // Disable inputs
    const inputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"], .code-input');
    inputs.forEach(input => input.disabled = true);
}

function nextQuestion() {
    const testQuestions = getCurrentTestQuestions();
    if (appState.currentQuestionIndex < testQuestions.length - 1) {
        appState.currentQuestionIndex++;
        displayQuestion(appState.currentQuestionIndex);
        updateProgress();
    } else {
        showSummary();
    }
}

function previousQuestion() {
    if (appState.currentQuestionIndex > 0) {
        appState.currentQuestionIndex--;
        displayQuestion(appState.currentQuestionIndex);
        updateProgress();
    }
}

// Override showSummary to use current test's questions and store execution
function showSummary() {
    appState.isTestComplete = true;
    elements.questionContainer.style.display = 'none';
    elements.summaryContainer.style.display = 'block';
    elements.navigationControls.style.display = 'none';
    elements.executionSummary.style.display = 'block';
    elements.progressFill.parentElement.style.display = 'none';
    elements.progressText.style.display = 'none';
    const testQuestions = getCurrentTestQuestions();
    // Dynamically initialize scores for all difficulties present
    const scores = {};
    testQuestions.forEach(q => {
        if (!scores[q.difficulty]) scores[q.difficulty] = { correct: 0, total: 0 };
    });
    const missedQuestions = [];
    testQuestions.forEach((question, idx) => {
        if (!scores[question.difficulty]) scores[question.difficulty] = { correct: 0, total: 0 };
        scores[question.difficulty].total++;
        if (validateAnswer(question)) {
            scores[question.difficulty].correct++;
        } else {
            missedQuestions.push({question, idx});
        }
    });
    // Display total score
    elements.totalScore.textContent = `${appState.score} / ${testQuestions.length} (${Math.round((appState.score / testQuestions.length) * 100)}%)`;
    // Display difficulty breakdown (always show 0 / N)
    const allDiffs = Object.keys(scores);
    elements.basicScore.textContent = scores.BASIC ? `${scores.BASIC.correct} / ${scores.BASIC.total}` : '0 / 0';
    elements.advancedScore.textContent = scores.ADVANCED ? `${scores.ADVANCED.correct} / ${scores.ADVANCED.total}` : '0 / 0';
    elements.expertScore.textContent = scores.EXPERT ? `${scores.EXPERT.correct} / ${scores.EXPERT.total}` : '0 / 0';
    // Display missed questions (index, not hash)
    if (missedQuestions.length > 0) {
        elements.missedQuestionsList.innerHTML = '';
        missedQuestions.forEach(({question, idx}) => {
            const missedDiv = document.createElement('div');
            missedDiv.className = 'missed-question-item';
            missedDiv.innerHTML = `
                <div class="missed-question-title">Question ${idx+1}: ${question.text}</div>
                <div class="missed-question-explanation">${question.explanation}</div>
            `;
            elements.missedQuestionsList.appendChild(missedDiv);
        });
    } else {
        elements.missedQuestions.style.display = 'none';
    }
    // Store execution in localStorage, including answers and question IDs
    appState.executions.push({
        id: appState.testExecutionId,
        testId: appState.selectedTest.id,
        timestamp: Date.now(),
        score: appState.score,
        total: testQuestions.length,
        answers: getExecutionAnswers(),
        questionIds: testQuestions.map(q => q.id) // Store the actual question IDs for review
    });
    saveExecutions();
    renderExecutionSummary();
}

// Event Listeners
function setupEventListeners() {
    elements.prevBtn.addEventListener('click', previousQuestion);
    elements.submitBtn.addEventListener('click', submitAndNext);
    elements.nextBtn.addEventListener('click', nextQuestion);
    elements.themeToggle.addEventListener('click', toggleTheme);
}

// Display Single Choice Question
function displaySingleChoice(question) {
    elements.singleChoiceOptions.style.display = 'block';
    const container = elements.singleChoiceOptions.querySelector('.radio-group');
    container.innerHTML = '';

    // Use shuffled options (each is now an object with id and label)
    const optionsToDisplay = appState.shuffledOptions[question.id] || question.options;

    optionsToDisplay.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';

        const isSelected = appState.userAnswers[question.id] === option.id;
        if (isSelected) optionDiv.classList.add('selected');

        // Show correct/incorrect state if submitted
        if (appState.submitted[question.id]) {
            const isCorrect = question.correctAnswers.includes(option.id);
            const wasSelected = appState.userAnswers[question.id] === option.id;

            if (isCorrect) {
                optionDiv.classList.add('correct');
            } else if (wasSelected) {
                optionDiv.classList.add('incorrect');
            }
        }

        optionDiv.innerHTML = `
            <input type="radio" name="question${question.id}" value="${option.id}" 
                   ${isSelected ? 'checked' : ''} 
                   ${appState.submitted[question.id] ? 'disabled' : ''}>
            <span class="option-text">${formatWithCodeSpans(option.label)}</span>
        `;

        // Add click event listener for the entire option div
        optionDiv.addEventListener('click', (e) => {
            if (!appState.submitted[question.id] && e.target.type !== 'radio') {
                const radio = optionDiv.querySelector('input[type="radio"]');
                radio.checked = true;
                selectSingleChoice(question.id, option.id);
            }
        });

        // Add change event listener for the radio input
        const radioInput = optionDiv.querySelector('input[type="radio"]');
        radioInput.addEventListener('change', () => {
            if (!appState.submitted[question.id]) {
                selectSingleChoice(question.id, option.id);
            }
        });

        container.appendChild(optionDiv);
    });
}

// Display Multiple Choice Question
function displayMultipleChoice(question) {
    elements.multipleChoiceOptions.style.display = 'block';
    const container = elements.multipleChoiceOptions.querySelector('.checkbox-group');
    container.innerHTML = '';

    // Use shuffled options (each is an object)
    const optionsToDisplay = appState.shuffledOptions[question.id] || question.options;

    optionsToDisplay.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-item';

        const userAnswers = appState.userAnswers[question.id] || [];
        const isSelected = userAnswers.includes(option.id);
        if (isSelected) optionDiv.classList.add('selected');

        // Show correct/incorrect state if submitted
        if (appState.submitted[question.id]) {
            const isCorrect = question.correctAnswers.includes(option.id);
            const wasSelected = userAnswers.includes(option.id);

            if (isCorrect) {
                optionDiv.classList.add('correct');
            } else if (wasSelected) {
                optionDiv.classList.add('incorrect');
            }
        }

        optionDiv.innerHTML = `
            <input type="checkbox" value="${option.id}" 
                   ${isSelected ? 'checked' : ''} 
                   ${appState.submitted[question.id] ? 'disabled' : ''}>
            <span class="option-text">${formatWithCodeSpans(option.label)}</span>
        `;

        optionDiv.addEventListener('click', (e) => {
            if (!appState.submitted[question.id] && e.target.type !== 'checkbox') {
                const checkbox = optionDiv.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                selectMultipleChoice(question.id, option.id, checkbox.checked);
            }
        });

        optionDiv.querySelector('input').addEventListener('change', (e) => {
            if (!appState.submitted[question.id]) {
                selectMultipleChoice(question.id, option.id, e.target.checked);
            }
        });

        container.appendChild(optionDiv);
    });
}

// Display Code Completion Question
function displayCodeCompletion(question) {
    elements.codeCompletionOptions.style.display = 'block';

    // Display template with gaps highlighted
    let template = question.template.replace(/`/g, ''); // Remove backticks
    question.gaps.forEach((gap, index) => {
        // Use a span with a unique id for each gap
        template = template.replace('____', `<span class="gap-highlight" id="gapHighlight-${question.id}-${index}">__Gap(${index + 1})__</span>`);
    });
    elements.codeTemplate.innerHTML = template;

    // Create input fields for gaps
    elements.codeInputs.innerHTML = '';
    question.gaps.forEach((gap, index) => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'code-input-group';

        const userAnswer = appState.userAnswers[question.id] || [];
        const value = userAnswer[index] || '';

        let inputClass = 'code-input';
        if (appState.submitted[question.id]) {
            const isCorrect = value.trim().toLowerCase() === question.correctAnswers[index].toLowerCase();
            inputClass += isCorrect ? ' correct' : ' incorrect';
        }

        inputGroup.innerHTML = `
            <label class="code-input-label">Gap ${index + 1}:</label>
            <input type="text" class="${inputClass}" 
                   value="${value}" 
                   placeholder="Enter value..." 
                   ${appState.submitted[question.id] ? 'disabled' : ''}
                   data-gap-index="${index}">
        `;

        const input = inputGroup.querySelector('input');
        input.addEventListener('input', (e) => {
            updateCodeAnswer(question.id, index, e.target.value);
            // Update the gap highlight live
            const gapSpan = document.getElementById(`gapHighlight-${question.id}-${index}`);
            if (gapSpan) {
                if (e.target.value.trim() === '') {
                    gapSpan.textContent = `__Gap(${index + 1})__`;
                } else {
                    gapSpan.textContent = e.target.value;
                }
            }
        });

        // Set initial gap highlight value
        setTimeout(() => {
            const gapSpan = document.getElementById(`gapHighlight-${question.id}-${index}`);
            if (gapSpan) {
                if (value.trim() === '') {
                    gapSpan.textContent = `__Gap(${index + 1})__`;
                } else {
                    gapSpan.textContent = value;
                }
            }
        }, 0);

        elements.codeInputs.appendChild(inputGroup);
    });
}

// Selection Handlers
function selectSingleChoice(questionId, optionId) {
    appState.userAnswers[questionId] = optionId;

    // Update visual selection for all options
    const container = document.querySelector(`input[name="question${questionId}"]`).closest('.radio-group');
    const options = container.querySelectorAll('.option-item');
    options.forEach(optionDiv => {
        const radio = optionDiv.querySelector('input[type="radio"]');
        const isSelected = radio.value === optionId;
        optionDiv.classList.toggle('selected', isSelected);
        radio.checked = isSelected;
    });
}

function selectMultipleChoice(questionId, optionId, isSelected) {
    if (!appState.userAnswers[questionId]) {
        appState.userAnswers[questionId] = [];
    }

    if (isSelected) {
        if (!appState.userAnswers[questionId].includes(optionId)) {
            appState.userAnswers[questionId].push(optionId);
        }
    } else {
        appState.userAnswers[questionId] = appState.userAnswers[questionId].filter(ans => ans !== optionId);
    }

    // Update visual selection
    const optionDiv = document.querySelector(`input[value="${optionId}"]`).closest('.option-item');
    optionDiv.classList.toggle('selected', isSelected);
}

function updateCodeAnswer(questionId, gapIndex, value) {
    if (!appState.userAnswers[questionId]) {
        appState.userAnswers[questionId] = [];
    }
    appState.userAnswers[questionId][gapIndex] = value;
}

// Validation
function validateAnswer(question) {
    const userAnswer = appState.userAnswers[question.id];

    if (question.type === 'SINGLE_CHOICE') {
        return question.correctAnswers.includes(userAnswer);
    } else if (question.type === 'MULTIPLE_CHOICE') {
        if (!userAnswer || !Array.isArray(userAnswer)) return false;
        const sortedUser = [...userAnswer].sort();
        const sortedCorrect = [...question.correctAnswers].sort();
        return sortedUser.length === sortedCorrect.length && 
               sortedUser.every((val, index) => val === sortedCorrect[index]);
    } else if (question.type === 'CODE_COMPLETION') {
        if (!userAnswer || !Array.isArray(userAnswer)) return false;
        return userAnswer.every((answer, index) => 
            answer && answer.trim().toLowerCase() === question.correctAnswers[index].toLowerCase()
        );
    }
    return false;
}

// Show Feedback
function showFeedback(question) {
    const isCorrect = validateAnswer(question);

    elements.feedbackSection.style.display = 'block';
    elements.feedbackResult.className = `feedback-result ${isCorrect ? 'correct' : 'incorrect'}`;
    elements.feedbackResult.textContent = isCorrect ? 'Correct!' : 'Incorrect';
    elements.explanation.innerHTML = formatWithCodeSpans(question.explanation);

    // Show docs links if present
    const docsSectionId = 'question-docs-section';
    let docsHtml = '';
    if (Array.isArray(question.docs) && question.docs.length > 0) {
        docsHtml = `<ul id="${docsSectionId}" class="question-docs-list" style="margin-top: 12px; text-align: left;">` +
            question.docs.map(doc => `<li><a href="${doc.url}" target="_blank" rel="noopener noreferrer">${doc.label}</a></li>`).join('') +
            '</ul>';
    }
    if (docsHtml) {
        elements.explanation.innerHTML += docsHtml;
    }

    // Update visual feedback on options
    if (question.type === 'SINGLE_CHOICE') {
        const options = document.querySelectorAll('.option-item');
        options.forEach(option => {
            const input = option.querySelector('input[type="radio"]');
            if (!input) return; // Fix for bug: skip if input is null
            const optionId = input.value;
            const isCorrectOption = question.correctAnswers.includes(optionId);
            const wasSelected = appState.userAnswers[question.id] === optionId;

            option.classList.remove('selected'); // Remove blue highlight after submission
            if (isCorrectOption) {
                option.classList.add('correct');
            } else if (wasSelected) {
                option.classList.add('incorrect');
            }
        });
    } else if (question.type === 'MULTIPLE_CHOICE') {
        const options = document.querySelectorAll('.option-item');
        options.forEach(option => {
            const input = option.querySelector('input[type="checkbox"]');
            if (!input) return; // Fix for bug: skip if input is null
            const optionId = input.value;
            const isCorrectOption = question.correctAnswers.includes(optionId);
            const userAnswers = appState.userAnswers[question.id] || [];
            const wasSelected = userAnswers.includes(optionId);

            option.classList.remove('selected'); // Remove blue highlight after submission
            if (isCorrectOption) {
                option.classList.add('correct');
            } else if (wasSelected) {
                option.classList.add('incorrect');
            }
        });
    } else if (question.type === 'CODE_COMPLETION') {
        const inputs = document.querySelectorAll('.code-input');
        inputs.forEach((input, index) => {
            const userAnswer = input.value.trim();
            const correctAnswer = question.correctAnswers[index];
            const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

            input.className = `code-input ${isCorrect ? 'correct' : 'incorrect'}`;
        });
    }
}

// Button Toggle
function toggleSubmitNextButtons(showNext) {
    if (showNext) {
        elements.submitBtn.style.display = 'none';
        elements.nextBtn.style.display = 'inline-flex';
    } else {
        elements.submitBtn.style.display = 'inline-flex';
        elements.nextBtn.style.display = 'none';
    }
}

// Add a function to show the summary view for a past execution
function showExecutionSummaryView(execution) {
    // Hide other containers
    elements.welcomeContainer.style.display = 'none';
    elements.questionContainer.style.display = 'none';
    elements.navigationControls.style.display = 'none';
    elements.summaryContainer.style.display = 'block';
    elements.executionSummary.style.display = 'block';
    elements.progressFill.parentElement.style.display = 'none';
    elements.progressText.style.display = 'none';

    // Get the questions for this execution
    const testQuestions = (execution.questionIds || []).map(qid => questions.find(q => q.id === qid)).filter(Boolean);
    // Dynamically initialize scores for all difficulties present
    const scores = {};
    testQuestions.forEach(q => {
        if (!scores[q.difficulty]) scores[q.difficulty] = { correct: 0, total: 0 };
    });
    const missedQuestions = [];
    testQuestions.forEach((question, idx) => {
        if (!scores[question.difficulty]) scores[question.difficulty] = { correct: 0, total: 0 };
        scores[question.difficulty].total++;
        // Use the stored answers for validation
        const userAnswer = execution.answers && execution.answers.userAnswers && execution.answers.userAnswers[question.id];
        let isCorrect = false;
        if (execution.answers && execution.answers.submitted && execution.answers.submitted[question.id]) {
            if (question.type === 'SINGLE_CHOICE') {
                isCorrect = question.correctAnswers.includes(userAnswer);
            } else if (question.type === 'MULTIPLE_CHOICE') {
                if (Array.isArray(userAnswer)) {
                    const sortedUser = [...userAnswer].sort();
                    const sortedCorrect = [...question.correctAnswers].sort();
                    isCorrect = sortedUser.length === sortedCorrect.length && sortedUser.every((val, i) => val === sortedCorrect[i]);
                }
            } else if (question.type === 'CODE_COMPLETION') {
                if (Array.isArray(userAnswer)) {
                    isCorrect = userAnswer.every((a, i) => a && a.trim().toLowerCase() === question.correctAnswers[i].toLowerCase());
                }
            }
        }
        if (isCorrect) {
            scores[question.difficulty].correct++;
        } else {
            missedQuestions.push({question, idx});
        }
    });
    // Display total score
    elements.totalScore.textContent = `${execution.score} / ${testQuestions.length} (${Math.round((execution.score / testQuestions.length) * 100)}%)`;
    // Display difficulty breakdown
    elements.basicScore.textContent = scores.BASIC ? `${scores.BASIC.correct} / ${scores.BASIC.total}` : '0 / 0';
    elements.advancedScore.textContent = scores.ADVANCED ? `${scores.ADVANCED.correct} / ${scores.ADVANCED.total}` : '0 / 0';
    elements.expertScore.textContent = scores.EXPERT ? `${scores.EXPERT.correct} / ${scores.EXPERT.total}` : '0 / 0';
    // Display missed questions
    if (missedQuestions.length > 0) {
        elements.missedQuestionsList.innerHTML = '';
        missedQuestions.forEach(({question, idx}) => {
            const missedDiv = document.createElement('div');
            missedDiv.className = 'missed-question-item';
            missedDiv.innerHTML = `
                <div class="missed-question-title">Question ${idx+1}: ${question.text}</div>
                <div class="missed-question-explanation">${question.explanation}</div>
            `;
            elements.missedQuestionsList.appendChild(missedDiv);
        });
        elements.missedQuestions.style.display = 'block';
    } else {
        elements.missedQuestions.style.display = 'none';
    }
}

// On DOMContentLoaded, load data and then initialize
// Remove the old document.addEventListener('DOMContentLoaded', initApp);
document.addEventListener('DOMContentLoaded', loadData);