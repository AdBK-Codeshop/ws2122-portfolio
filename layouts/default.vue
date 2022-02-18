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
:root {
  --body-color: rgb(43, 43, 43);
  --body-bg: #fafafa;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--body-color);
  background-color: var(--body-bg);
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>
