<template>
  <div class="container">
      
    <div class="game justify-center flex-column">

      <div class="hud">
        <div class="hud-item">
          <h1 class="hud-main-text"> {{score}} </h1>
        </div>
      </div>

      <div class="imageRow">
        <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">
        <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">
        <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">  
        <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">  
      </div>

       <div 
          v-for="(choice, index) in question.choices" 
          v-bind:key="index"

          @click="checkAnswer($event, index + 1)"
          class="animate__animated animate__fadeInUp choice-container">
        <p class="choice-text">{{choice}}</p>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { MAX_POINTS }from '../../config/variables';

export default {
  name: 'Game',
  computed: mapGetters([
    'score', 
    'acceptingAnswers', 
    'question',
    'availableQuestions',
  ]),
  methods: {
    ...mapMutations(['setScore']),
    ...mapActions(['loadQuestions', 'loadQuestion']),

    checkAnswer(event, choice) {

      if (this.acceptingAnswers) {
        const classToApply = this.question.answer === choice
          ? 'correct' 
          : 'incorrect';

        const selectedChoice =  event.target.parentElement;
        const score =   classToApply == 'correct' ?   MAX_POINTS : 0;
        
        
        this.$store.commit('setAcceptingAnswers', false);
        this.$store.commit('setScore', score);

        selectedChoice.classList.add(classToApply);

        setTimeout(() => {
          selectedChoice.classList.remove(classToApply);
          this.loadQuestion();
        }, 250);
      }
    },
  },
  async created () {
    
    await this.loadQuestions();
    
    this.loadQuestion();
  },
}
</script>

<style scoped>
@import '../../assets/styles/question.css';
</style>