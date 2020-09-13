// Repeated elements.
const choices = Array.from(document.getElementsByClassName('choice-text'));
const images  = Array.from(document.getElementsByClassName('image'));

// DOM elements.
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// Constants.
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// Variables that hold state.
let score = 0;
let questionCounter = 0;
let acceptingAnswers = false;

let currentQuestion = {};
let availableQuesions = [];
let questions = [];

// Game loop.
const loadNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {

        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('possibleScore',MAX_QUESTIONS * 10 );

        return window.location.assign('/pages/end.html');
    }

    // Increment counter.
    questionCounter++;

    // Select random question.
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);

    currentQuestion = availableQuesions[questionIndex];

    images.forEach((image) => image.src = `../assets/${currentQuestion.question}`);
    choices.forEach((choice) => choice.innerHTML = currentQuestion['choice' + choice.dataset['number']]);

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

const incrementScore = (num) =>  scoreText.innerText = score += num;

const hookEventLister = ( choice ) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) {
            return;
        };

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const classToApply = selectedChoice.dataset['number'] == currentQuestion.answer 
            ? 'correct' 
            : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            loadNewQuestion();
        }, 250);
    });
}

const hookEventListeners = () => choices.forEach((choice) => hookEventLister(choice));

/// Load and start game.
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];

    loadNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

const loadQuestions = (data) => {
    questions = data.map((loadedQuestion) => {
    
        const choices = [...loadedQuestion.incorrect_answers];
        const question = {
            question: loadedQuestion.question,
            answer: Math.floor(Math.random() * 3) + 1
        };
        
        const answer = question.answer - 1;

        choices.splice(answer, 0, loadedQuestion.correct_answer);
        choices.forEach((choice, i) => question['choice' + (i + 1)] = choice);
        choices.sort((a, b) =>  a.length - b.length);

        return question;
    });
}

const fetchContent = () => {
    fetch('../assets/questions.json')
    .then((response) => response.json())
    .then((data) => loadQuestions(data))
    .then((_) => startGame())
    .catch((err) => console.error(err));
}

/// Program starts here.
(() => {
    fetchContent();
    hookEventListeners();
})();