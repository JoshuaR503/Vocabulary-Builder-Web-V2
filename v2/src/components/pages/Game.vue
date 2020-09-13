<template>
  <div class="container">

    <!-- <div id="loader"></div> -->
      
    <div id="game" class="justify-center flex-column">

      <div id="hud">
        <div id="hud-item">
          <h1 class="hud-main-text"> {{score}} </h1>
        </div>
      </div>

      <div class="imageRow">

        
        <img width="75" height="75"  class="animate__animated animate__fadeInDown image">
        <img width="75" height="75"  class="animate__animated animate__fadeInDown image">
        <img width="75" height="75"  class="animate__animated animate__fadeInDown image">  
      </div>

      <!-- <br>
      <br>
              <code> {{ currentQuestion.choices }} </code>  -->


      <div 
        v-for="(choice, index) in currentQuestion.choices" 
        v-bind:key="index" 
        class="animate__animated animate__fadeInUp choice-container">

        <p class="choice-text">{{choice}}</p>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Game',
  computed: mapGetters([
    'loading', 
    'score', 
    'acceptingAnswers', 
    'currentQuestion',
    'availableQuestions',
    'questions'
  ]),
  methods: {
    ...mapActions(['loadQuestions', 'loadQuestion']),
  },
  created() {
    this.loadQuestions();
    this.loadQuestion();
  },

}
</script>
