<template>
  <footer class="pagination">
    <nuxt-link v-if="prev" :to="prev.slug" class="pagination__prev">{{
      prev.title
    }}</nuxt-link>
    <nuxt-link v-if="next" :to="next.slug" class="pagination__next">{{
      next.title
    }}</nuxt-link>
  </footer>
</template>

<script>
export default {
  name: 'ProjectPagination',
  props: {
    prev: {
      type: Object,
      default: () => ({}),
    },
    next: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style>
.pagination__prev:before {
  content: '←';
  margin-right: 0.5rem;
}

.pagination__next:after {
  content: '→';
  margin-left: 0.5rem;
}
</style>
