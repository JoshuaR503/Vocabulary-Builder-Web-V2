import Vuex from 'vuex';
import Vue from 'vue';
import questions from './modules/questions';
import words from './modules/words';

// Load Vuex
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        questions,
        words
    }
});