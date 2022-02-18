<template>
  <main class="page-project">
    <header>
      <h1>{{ project.title }}</h1>
      <h2>{{ project.subtitle }}</h2>
    </header>
    <nuxt-content :document="project" class="project-details" />
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
.page-project {
  padding: 1rem;
}

.project-details {
  margin-top: 3rem;
}

.project-details * + * {
  margin-top: 1rem;
}

.page-project header {
  font-size: 3rem;
  max-width: 87.5%;
}

.page-project footer {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
}

.row {
  display: flex;
  justify-content: center;
}

.col-6 {
  width: calc(100% / 12 * 6);
}

.col-8 {
  width: calc(100% / 12 * 8);
}

.col-12 {
  width: calc(100% / 12 * 12);
}
</style>
