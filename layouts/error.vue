<template>
  <div class="error-page">
    <h1>Oops, something went wrong!</h1>
    <!-- not using nuxt-link here... because, there might have been a Javascript error... in which case, nuxt-link wouldn't work -->
    <p>Back to <a href="/">safety</a>!</p>
  </div>
</template>

<style scoped>
.error-page {
  text-align: center;
}

.error-page a {
  text-decoration: none;
  color: red;
}

.error-page a:hover,
.error-page a:active {
  color: salmon;
}
</style>
