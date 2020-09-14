<template>
  <div class="container">
    <div class="flex-center flex-column">
      <h1 v-if="score > metadata.required_score">{{score}} de {{metadata.max_score}}</h1>
      <h1 v-if="score < metadata.required_score">¡Sigue practicando!</h1>
      <router-link class="btn" to="/report">Reporte</router-link>
      <router-link class="btn" @click="clean()" to="/game">Jugar de nuevo</router-link>
      <router-link class="btn" @click="clean()" to="/">Inicio</router-link>
    </div>
  </div>
</template>

<script>
import confetti from 'canvas-confetti';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'End',
  computed: mapGetters([
    'score', 
    'metadata', 
  ]),
  methods: {
    ...mapActions(['clean']),
    
    celebrate() {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 15, spread: 360, ticks: 40, zIndex: 0 };

      const randomInRange = (min, max) =>  Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 100 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.2, 0.9), y: Math.random() - 0.2 } }));

      }, 250);
    }
  },

  mounted() {
    if (this.score > this.metadata.required_score) {
      this.celebrate();
    }
  }
}
</script>
