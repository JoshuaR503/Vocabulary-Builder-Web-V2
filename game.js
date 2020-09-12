const question = document.getElementById('question');

const choices = Array.from(document.getElementsByClassName('choice-text'));

const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let score = 0;
let questionCounter = 0;
let acceptingAnswers = false;

let currentQuestion = {};
let availableQuesions = [];

let questions = [];

fetch('questions.json')
.then((res) =>  res.json())
.then((loadedQuestions) => {

    questions = loadedQuestions.map((loadedQuestion) => {

        const formattedQuestion = {
            question: loadedQuestion.question,
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];

        formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        
        answerChoices.splice(
            formattedQuestion.answer - 1,
            0,
            loadedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) =>  formattedQuestion['choice' + (index + 1)] = choice);
        answerChoices.sort((a, b) =>  a.length - b.length);


        return formattedQuestion;
    });

    startGame();
})
.catch((err) =>  console.error(err));

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 50;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];

    loadNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

const loadNewQuestion = () => {
    if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        localStorage.setItem('possibleScore',MAX_QUESTIONS * 10 );
        
        //go to the end page
        return window.location.assign('/end.html');
    }

    // Increment counter.
    questionCounter++;

    // Select random question.
    const questionIndex = Math.floor(Math.random() * availableQuesions.length);

    currentQuestion = availableQuesions[questionIndex];

    question.innerHTML = currentQuestion.question;
    choices.forEach((choice) => {
        choice.innerHTML = currentQuestion['choice' + choice.dataset['number']];
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};


choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) {
            return;
        };

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        const classToApply = selectedAnswer == currentQuestion.answer 
            ? 'correct' 
            : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            loadNewQuestion();
        }, 1000);
    });
});

const report = () => {
    fetch('https://vocabulary-builder.herokuapp.com/v2/missing', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({name: currentQuestion.question}),
    })
    .then(() => {
        incrementScore(CORRECT_BONUS);
        loadNewQuestion();
    })
    .catch((error) => loadNewQuestion());
}

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};
