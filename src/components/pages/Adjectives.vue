<template>
  <div >
    <div v-if="this.adjectives.length > 0" class="fadeIn content">

      <div class="report_container">
        <div class="game flex-center flex-column">
          <div 
            v-for="(adjective, index) in adjectives" 
            v-bind:key="index"

            class="animate__animated animate__fadeInUp card">

            <!-- <code>{{adjective}}</code> -->
            <p class="choice"><b>Palabra:</b> {{adjective.spanish}}</p>
            <p class="choice"><b>Traducción:</b> {{adjective.english}}</p>
            <!-- <p class="example"><b>Ejemplo:</b> {{adjective.example}}</p> -->

            <audio controls>
                <source  v-bind:src="adjective.englishPronunciation" type="audio/mp3">
                Your browser does not support the audio element.
              </audio> 
              <br>
              <br>
          </div>

          <br>
          <br>
          <router-link class="btn" @click.native="clean()"  to="/">Regresar</router-link>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Adjectives',
  computed: mapGetters(['adjectives', 'wordsLoading']),
  methods: mapActions(['loadAdjectives']),
  created() {
    this.loadAdjectives();
  },
}
</script>
<style scoped>


@import '../../assets/styles/question.css';

hr {
  border: 0;
  height: 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 2rem;
  font-weight: 500;
}

audio {
  margin: 1.5rem;
}

.btn {
  width: 100%;
}

.choice {
  font-size: 2rem;
  letter-spacing: .05rem;
  text-transform: capitalize;
  color: #181818;
  padding: 1.5rem;
}

.example {
  font-size: 2rem;
  color: #181818;
  padding: 1.5rem;
  line-height: 1.5;
}

.example::first-letter {
  text-transform: capitalize;
}

.report_container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.card {
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-top: 2rem;
  height: 26vh;
  width: 50vh;
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