<template>
  <div class="page">
    <main-intro />
    <main-header />
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
:root {
  --body-color: rgb(43, 43, 43);
  --body-bg: #bcffa5;
}
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--body-color);
  background-color: var(--body-bg);
}
</style>
