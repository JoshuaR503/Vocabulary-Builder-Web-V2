<template>
  <div class="report_container">

    <div class="game flex-column">
      <h2>Reporte</h2>
      <h3>Puntos: {{score}}/{{metadata.max_score}}</h3>

      <div 
        v-for="(question, index) in questions" 
        v-bind:key="index"
      
        class="animate__animated animate__fadeInUp card">

        <div class="imageRow">
          <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">
          <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">
          <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">  
          <img v-bind:src="'/assets' + question.question" width="75" height="75" class="animate__animated animate__fadeInDown image">  
        </div>

        <div v-for="(choice, index) in question.choices" v-bind:key="index">
          <hr>
          <p class="choice" v-bind:class="{ correct: question.answer == index + 1}">{{choice}}  </p>
        </div>

      </div>

      <br>
      <br>
      <router-link class="btn" @click="clean()"  to="/game">Jugar de nuevo</router-link>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Report',
  computed: mapGetters([
    'score', 
    'metadata', 
    'questions'
  ]),
  methods: mapActions(['clean'])
}
</script>
<style scoped>
@import '../../assets/styles/question.css';

hr {
  border: 0;
  height: 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
}

.btn {
  width: 100%;
}

.choice {
  font-size: 2rem;
  letter-spacing: .05rem;

  color: #181818;
  padding: 1.5rem;
  width: 100%;

}

.report_container {
  width: 100vw;
  display: flex;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-top: 2rem;
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
.card_container {
  padding: 2px 16px;
}
</style>