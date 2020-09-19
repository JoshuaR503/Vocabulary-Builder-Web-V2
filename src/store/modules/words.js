import axios from 'axios';

const state = {
    wordsLoading: true,
    adjectives: [],

};

const getters = {
    wordsLoading: state => state.wordsLoading,
    adjectives: state => state.adjectives,
};

const mutations  = {
    setWordsLoading: (state, wordsLoading) => state.wordsLoading = wordsLoading,
    setAdjectives: (state, adjectives) => state.adjectives = adjectives,
}

const actions = {
    async loadAdjectives({commit}) {
        commit('setWordsLoading', true);
        await axios
        .get('/assets/adjective.json')
        .then((response) => {
            commit('setAdjectives', response.data);
            commit('setWordsLoading', false);
        })
        .catch((err) => console.error('There was an error', err));
    },
}

export default {
    state,
    getters,
    actions,
    mutations
};
