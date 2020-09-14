<template>
  <div class="container">

    <!-- <div id="loader"></div> -->
      
    <div class="game justify-center flex-column">

      <div class="hud">
        <div class="hud-item">
          <h1 class="hud-main-text"> {{score}} </h1>
        </div>
      </div>

      <code>{{question}}</code>

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

        const score = classToApply === 'correct' ? 10 : -10;
        const selectedChoice =  event.target.parentElement;

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
code {
  font-family: Consolas,"courier new";
  color: crimson;
  background-color: #f1f1f1;
  padding: 2px;
  font-size: 2rem;
}

.choice-container {
  display: flex;
  margin-bottom: 0.8rem;
  width: 100%;
  font-size: 1.8rem;
  /* border: 0.2rem solid rgba(80, 80, 80, 0.25); */
  background-color: #f5f5f5;
}

.choice-container:hover {
  cursor: pointer;
  /* box-shadow: 0 0.4rem 1.4rem 0  rgba(49, 49, 49, 0.25); */
  transform: translateY(-0.1rem);
  transition: transform 150ms;
}
.imageRow {
  white-space: nowrap;
}
.report-emoji{
  margin-top:4rem;
  margin-bottom:4rem;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: .05rem;

  color: #181818;
  padding: 1.5rem;
  width: 100%;
}

.choice-text {
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: .05rem;

  color: #181818;
  padding: 1.5rem;
  width: 100%;
}

.correct {
  background-color: #4bd16ace;
}

.incorrect {
  background-color: #f14f5fde;
}

/* HUD */

.hud {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.hud-prefix {
  text-align: left;
  font-size: 2rem;
}

.hud-main-text {
  text-align: left;
}


/* LOADER */
.loader {
  border: 1.6rem solid white;
  border-radius: 50%;
  border-top: 1.6rem solid #56a5eb;
  width: 12rem;
  height: 12rem;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>