<template>
  <header class="main-header">
    <nav>
      <nuxt-link to="/"> Projects </nuxt-link>
    </nav>
    <div class="main-header__logo">
      <nuxt-link to="/"> <main-logo /> </nuxt-link>
    </div>
    <nav>
      <nuxt-link to="/about"> About </nuxt-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'MainHeader',
}
</script>

<style>
.main-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.main-header__logo svg {
  height: 1.5rem;
}
</style>
