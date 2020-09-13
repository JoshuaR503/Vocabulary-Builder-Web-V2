
const state = {
    loading: true,

    score: 0,

    acceptingAnswers: false,
    currentQuestion: {},

    availableQuestions: [],
    questions: []
};

const getters = {
    loading: state => state.loading,

    score: state => state.score,

    acceptingAnswers: state => state.acceptingAnswers,
    currentQuestion: state => state.currentQuestion,

    availableQuestions: state => state.availableQuestions,
    questions: state => state.questions,
};

const mutations  = {
    setLoading: (state, loading) => state.loading = loading,

    setScore: (state, score) => state.score = state.score += score,
    setAcceptingAnswers: (state, data) => state.data = data,

    setCurrentQuestion: (state, question) => state.currentQuestion = question,
    setAvilableQuestions: (state, question) => state.availableQuestions = question,
    setQuestions: (state, questions) => state.questions = questions,
}

const actions = {

    fetchContent({commit, state}) {
        fetch('/assets/questions.json')
        .then((response) => response.json())
        .then((data) => loadQuestions(data))
        .then((_) => startGame())
        .catch((err) => console.error(err));
    },



}