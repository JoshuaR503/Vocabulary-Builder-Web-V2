const state = {
    loading: true,

    score: 0,
    questionCounter: 0,

    acceptingAnswers: false,
    currentQuestion: {},

    availableQuestions: [],
    questions: []
};

const getters = {
    loading: state => state.loading,

    score: state => state.score,
    questionCounter: state => state.questionCounter,

    acceptingAnswers: state => state.acceptingAnswers,
    currentQuestion: state => state.currentQuestion,

    availableQuestions: state => state.availableQuestions,
    questions: state => state.questions,
};

const mutations  = {
    setLoading: (state, loading) => state.loading = loading,

    setScore: (state, score) => state.score = state.score += score,
    incrementQuestionCounter: (state) => state.questionCounter++,

    setAcceptingAnswers: (state, data) => state.data = data,

    setCurrentQuestion: (state, question) => state.currentQuestion = question,
    setAvilableQuestions: (state, question) => state.availableQuestions = question,
    removeQuestion: (state, questionIndex) => state.availableQuesions.splice(questionIndex, 1),
    setQuestions: (state, questions) => state.questions = questions,
}

const actions = {

    loadQuestion({commit, state}) {

        const MAX_QUESTIONS = 10;
        const gameOver = 
            state.availableQuestions.length === 0 || 
            state.questionCounter >= MAX_QUESTIONS;

        if (gameOver) {

            // localStorage.setItem('mostRecentScore', score);
            // localStorage.setItem('possibleScore',MAX_QUESTIONS * 10 );
    
            // return window.location.assign('/pages/end.html');
        } else {

            // Select random question.
            const questionIndex = Math.floor(Math.random() * state.availableQuestions.length);

            console.log( state.availableQuestions[questionIndex]);

            // Increment counter.
            commit('incrementQuestionCounter');
            // Set current question to question selected.
            commit('setCurrentQuestion', state.availableQuestions[questionIndex]);
            // Remove question form index.
            commit('removeQuestion', questionIndex);
            // Start accepting questions again.
            commit('setAcceptingAnswers', true)
        }
    },

    loadQuestions({commit}) {
        commit('setLoading', true);

        fetch('/assets/questions.json')
        .then((response) => response.json())
        .then((data) => {

            const questions = data.map((loadedQuestion) => {
            
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

                // choices.sort((a, b) =>  a.length - b.length);
        
                return question;
            });

            console.log(questions[0]);
    
            commit('setScore', 0);
            commit('setQuestions', questions);
            commit('setAvilableQuestions', [...questions]);
            commit('setLoading', false);
        })
        .catch((err) => console.error(err));
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
