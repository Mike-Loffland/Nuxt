<template>
  <div>
    <TheHeader @sidenavToggle="showSideNav = !showSideNav" />
    <TheSideNav :show="showSideNav" @close="showSideNav = false" />
    <nuxt/>
  </div>
</template>
<script>
import TheHeader from '@/components/nav/TheHeader'
import TheSideNav from '@/components/nav/TheSideNav'

export default {
  components: {
    TheHeader,
    TheSideNav
  },
  data() {
    return {
      showSideNav: false
    }
  }
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
