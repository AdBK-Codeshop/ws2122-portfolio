<template>
  <footer class="main-footer">
    ©{{ new Date().getFullYear() }}, David Coperfield
    <div class="main-footer__logo">
      <nuxt-link to="/"> <main-logo /> </nuxt-link>
    </div>
    <nav>
      <ul>
        <li>
          <a href="https://www.twitter.com" target="__blank"> Twitter </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="__blank"> Instagram </a>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
}
</script>

<style>
.main-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 var(--spacer);
  margin-top: calc(var(--spacer) * 3);
  margin-bottom: var(--spacer);
}

.main-footer ul {
  display: flex;
}

.main-footer ul li + li {
  margin-left: var(--spacer);
}

.main-footer__logo svg {
  height: 1.5rem;
}
</style>
