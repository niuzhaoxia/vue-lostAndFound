<template>
  <div id="app">
    <router-view></router-view>

  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {}
  }
</script>

<style>
  @import url(../css/reset.min.css);

  html, body, #app {
    height: 100%;
    min-width: 1200px;
  }

  .min {
    width: 75%;
    margin: 0 auto;
  }

  .mg_t {
    padding-top: 70px;
  }
</style>
