<template>
  <main class="page-main">
    <header>
      <h1>{{ project.title }}</h1>
      <h2>{{ project.subtitle }}</h2>
    </header>
    <footer>
      <nuxt-link :to="get(pagination, '[0].slug', '')">{{
        get(pagination, '[0].title', '')
      }}</nuxt-link>
      <nuxt-link :to="get(pagination, '[1].slug', '')">{{
        get(pagination, '[1].title', '')
      }}</nuxt-link>
    </footer>
  </main>
</template>

<script>
import get from 'lodash/get'

export default {
  async asyncData({ $content, params }) {
    const project = await $content('projects', params.slug).fetch()
    const pagination = await $content('projects')
      .sortBy('slug')
      .surround(params.slug)
      .only(['title', 'slug'])
      .fetch()
    return {
      project,
      pagination,
    }
  },
  methods: {
    get,
  },
}
</script>
<style>
.page-main {
  padding: 1rem;
}

.page-main header {
  font-size: 3rem;
  max-width: 87.5%;
}

.page-main footer {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
}
</style>
