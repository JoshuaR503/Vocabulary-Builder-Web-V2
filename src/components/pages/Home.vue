<template>
  <div class="container">
    <div class="flex-center flex-column">
      <h1> Vocabulario </h1>
      <router-link class="btn" to="/game">Play</router-link>
      <router-link class="btn" to="/adjectives">Adjectives</router-link>
      <router-link class="btn" to="/nouns">Nouns</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
