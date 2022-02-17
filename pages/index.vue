<template>
  <main class="page-index">
    <project-grid>
      <project-card
        v-for="(project, index) in projects"
        :key="index"
        :project="project"
      />
    </project-grid>
  </main>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/01.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/02.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/03.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/01.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/02.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/03.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/02.jpg' },
        { title: 'Space Capsule', subtitle: 'NASA', image: '/images/03.jpg' },
      ],
    }
  },
}
</script>
