<template>
  <main class="page-project">
    <header>
      <h1>{{ project.title }}</h1>
      <h2>{{ project.subtitle }}</h2>
    </header>
    <nuxt-content :document="project" class="project-details" />
    <project-pagination :prev="pagination[0]" :next="pagination[1]" />
  </main>
</template>

<script>
import ProjectPagination from '~/components/project/ProjectPagination.vue'

export default {
  components: { ProjectPagination },
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
