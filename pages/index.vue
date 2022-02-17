<template>
  <div>
    <h1>Home</h1>
    <project-grid>
      <project-card v-for="project in projects" :key="project.title" />
    </project-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { title: 'project a' },
        { title: 'project b' },
        { title: 'project c' },
      ],
    }
  },
}
</script>
