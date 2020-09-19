<template>
  <div >

    <div v-if="this.adjectives.length > 0" class="fadeIn content">
      <div class="table_container">
        <table>
          <thead>
            <tr>
              <th class="table_title">Palabra</th>
              <th class="table_title">Traducción</th>
              <th class="table_title">Audio</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(adjective, index) in adjectives" :key="index">
              <td><p>{{adjective.spanish}}</p></td>
              <td><p>{{adjective.english}}</p></td>
              <td> 
                <audio controls>
                  <source  v-bind:src="adjective.englishPronunciation" type="audio/mp3">
                  Your browser does not support the audio element.
                </audio> 
              </td>

            </tr>
          </tbody>
        </table>
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

.table_container {
  display: block;
  align-items: center;
  justify-content:safe;
  max-width: 80rem;
  padding: 2rem;
  overflow-x:auto;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}

th, td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){
  background-color: #f2f2f2;
}



.table_title {
  color: rgba(0,0,0,.88);
  font-size: 2.25rem;
  line-height: 20px;
}


table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 15px;
}

p {
  font-size: 2rem;
}



</style>