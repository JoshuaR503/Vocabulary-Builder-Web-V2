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
    async loadAdjectives({commit}, fileName) {

        commit('setWordsLoading', true);
        
        await axios
        .get(`/assets/${fileName}.json`)
        .then((response) => {

            const shuffled = response.data
            .map((a) => ({sort: Math.random(), value: a}))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
            
            commit('setAdjectives', shuffled);
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
