<template>
  <div >

    <div v-if="this.loading" class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div>

    <div v-if="!this.loading" class="fadeIn content">

      <div class="report_container">
        <div class="flex-column">
          <div 
            v-for="(adjective, index) in adjectives" 
            v-bind:key="index"

            class="animate__animated animate__fadeInUp card">

            <p class="choice"><b>Palabra:</b> {{adjective.spanish}}</p>

            <p class="choice"><b>Traducción:</b> {{adjective.english}}</p>
            <p class="choice"><b>Ejemplos:</b></p>
            <br>

            <table>
              <tbody>
                <tr 
                  v-for="(ex, index) in adjective.example" 
                  v-bind:key="index">

                  <td>{{ex.english}}</td>
                  <td>{{ex.spanish}}</td>
                </tr>
              </tbody>
            </table>

            <br>
            <br>
            <button @click="playSound(adjective.englishPronunciation)">Escuchar Pronunciacion</button>
          </div>

          <br>
          <br>
          <router-link class="btn"  to="/">Regresar</router-link>
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
    this.loadAdjectives('nouns');
  },
}
</script>
<style scoped>
@import '../../assets/styles/spinner.css';
@import '../../assets/styles/question.css';


table {
  background-color: #f5f5f5;
  display: flex;
  align-items: flex-start;
}

td,
th {
  border-top: 2px solid #ddd;
  padding: 6px;
}

td {
  font-size: 16px;
  line-height: 1.5;
}

tr:nth-child(even){
  background-color: #f2f2f2;
}


button {
  background-color: #eeeeee; /* Green */
  border: none;
  color: rgb(17, 17, 17);
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
   -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
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
  font-size: 2rem;
  margin-top: 1rem;
  letter-spacing: .05rem;
  text-transform: capitalize;
  color: #181818;
  line-height: 1.5;
}

.example {
  font-size: 1.8rem;
  margin-top: 1.5rem;
  line-height: 1.5;
  font-weight: 200;
  letter-spacing: .05rem;
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
  width: 52vh;
  
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}



</style>