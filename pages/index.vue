<template>
  <div>
    <project-grid>
      <project-card
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />
    </project-grid>
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const projects = await $content('projects').fetch()
    return { projects }
  },
}
</script>
