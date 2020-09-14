import axios from 'axios';

const state = {
    loading: true,

    score: 0,
    questionCounter: 0,

    acceptingAnswers: false,
    availableQuestions: [],
    questions: [],
    question: {},
};

const getters = {
    loading: state => state.loading,

    score: state => state.score,
    questionCounter: state => state.questionCounter,

    acceptingAnswers: state => state.acceptingAnswers,

    availableQuestions: state => state.availableQuestions,
    questions: state => state.questions,
    question: state => state.question,
};

const mutations  = {
    setLoading: (state, loading) => state.loading = loading,

    setScore: (state, score) => state.score = state.score += score,
    incrementQuestionCounter: (state) => state.questionCounter++,

    setAcceptingAnswers: (state, data) => state.acceptingAnswers = data,
    setQuestions: (state, questions) => state.questions = questions,
    setQuestion: (state, question) => state.question = question,

    setAvilableQuestions: (state, questions) => state.availableQuestions = questions,

    removeQuestion: (state, questionIndex) => state.availableQuestions.splice(questionIndex, 1),
}

const actions = {
    async loadQuestions({commit}) {
        await axios
        .get('/assets/questions.json')
        .then((response) => {
            const questions = response.data.map((loadedQuestion) => {
            
                const randomNumber = Math.floor(Math.random() * 3) + 1;
                const choices = [...loadedQuestion.incorrect_answers];

                const question = {
                    question: loadedQuestion.question,
                    answer: randomNumber,
                    choices: []
                };
                
                const answer = question.answer - 1;
        
                choices.splice(answer, 0, loadedQuestion.correct_answer);
                choices.forEach((choice) => question['choices'].push(choice));

                return question;
            });

            commit('setQuestions', questions);
            commit('setAvilableQuestions', [...questions]);
        })
        .catch((err) => console.error('There was an error', err));
    },

    loadQuestion({commit, state}) {
        const MAX_QUESTIONS = 10;
        const gameOver = 
            state.availableQuestions.length === 0 || 
            state.questionCounter >= MAX_QUESTIONS;

        if (gameOver) {

            localStorage.setItem('mostRecentScore', state.score);
            localStorage.setItem('possibleScore',MAX_QUESTIONS * 10 );
    
            // return window.location.assign('/pages/end.html');
        } else {
            // Select random question.
            const questionIndex = Math.floor(Math.random() * state.availableQuestions.length);
            const question = state.availableQuestions[questionIndex];
            
            // Set current question to question selected.
            commit('setQuestion', question);
            // Remove question form index.
            commit('removeQuestion', questionIndex);
            // Start accepting questions again.
            commit('setAcceptingAnswers', true);
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
