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
  padding: 0 1rem;
}

.project-details {
  margin-top: 2rem;
}

.project-details > * {
  margin-top: 1rem;
}

.page-project header {
  font-size: 3rem;
  max-width: 87.5%;
}

.row {
  display: flex;
  justify-content: center;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12 {
  padding: 0 0.5rem;
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
