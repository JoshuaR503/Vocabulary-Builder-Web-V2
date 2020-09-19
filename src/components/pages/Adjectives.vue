<template>
  <div >
    <div v-if="this.adjectives.length > 0" class="fadeIn content">

      <div class="report_container">
        <div class="flex-column">
          <div 
            v-for="(adjective, index) in adjectives" 
            v-bind:key="index"

            class="animate__animated animate__fadeInUp card">

            <!-- <code>{{adjective}}</code> -->
            <p class="choice"><b>Palabra:</b> {{adjective.spanish}}</p>
            <br>

            <br>
            <p class="choice"><b>Traducción:</b> {{adjective.english}}</p>
            <!-- <p class="example"><b>Ejemplo:</b> {{adjective.example}}</p> -->
            <br>

            <br>
            <button @click="playSound(adjective.englishPronunciation)">Escuchar Pronunciacion</button>
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
  methods: {

    ...mapActions(['loadAdjectives']),

    playSound (sound) {
      if(sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  },

  created() {
    this.loadAdjectives();
  },
}
</script>
<style scoped>


@import '../../assets/styles/question.css';

button {
  background-color: #eeeeee; /* Green */
  border: none;
  color: rgb(17, 17, 17);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
   -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; 
              outline: none;

}

hr {
  border: 0;
  height: 0;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
}

h2 {
  margin: 2rem;
  font-weight: 500;
}

.btn {
  width: 100%;
}


.choice {
  font-size: 2.4rem;
  letter-spacing: .05rem;
  text-transform: capitalize;
  color: #181818;
}

.report_container {
  display: flex;
  justify-content: center;
  align-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center!important;

  padding: 1.5rem;

  margin-top: 2rem;
  width: 50vh;
  
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}



</style>