<template>
  <div class="container">
    <div class="flex-center flex-column">
      <h1> Vocabulario </h1>
      <router-link class="btn" to="/game">Jugar</router-link>
      <router-link class="btn" to="/adjectives">Adjetivos</router-link>
      <router-link class="btn" to="/nouns">Sustantivos</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
