<template>
  <div>
    <nuxt-link to="/admin">Admin Home</nuxt-link>
    <nuxt/>
  </div>
</template>
<script>
export default {
  middleware: ['checkAuth', 'auth'] // order is important... order of execution is left to right.
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

body {
  margin:0;
}
</style>
