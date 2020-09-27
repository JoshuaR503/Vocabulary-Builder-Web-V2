<template>
    <div v-if="this.loading" class="spinner">
        <div class="cube1"></div>
        <div class="cube2"></div>
    </div>
</template>

<script>

export default {
    name: 'Spinner',
}
</script>

<style scoped>
@import '../assets/styles/spinner.css';

.spinner-border {
    margin: 64px;
    width: 64px; 
    height: 64px;
    color: black;
}
</style>