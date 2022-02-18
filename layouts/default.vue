<template>
  <div class="page">
    <main-intro />
    <main-header />
    <Nuxt />
    <main-footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>
