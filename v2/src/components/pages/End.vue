<template>

  <div class="container">

    <div class="flex-center flex-column">
      <h1>

        <h1 v-if="score >= 50">{{score}} de 100</h1>
        <h1 v-if="score < 49">¡Sigue practicando!</h1>

      </h1>
      <router-link class="btn" to="/game">Jugar</router-link>
      <router-link class="btn" to="/">Inicio</router-link>

    </div>
  </div>

</template>

<script>
import confetti from 'canvas-confetti';
import { mapGetters } from 'vuex';

export default {
  name: 'End',
  computed: mapGetters([
    'score', 
    'acceptingAnswers', 
    'question',
    'availableQuestions',
  ]),
  methods: {

    message() {

    },

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
    if (this.score > 50) {
      this.celebrate();
    }
  }
}
</script>
