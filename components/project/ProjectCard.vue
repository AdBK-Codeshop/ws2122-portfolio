<template>
  <article class="project-card">
    <div class="project-card__thumbnail">
      <img :src="project.featuredImage" />
    </div>
    <nuxt-link :to="`project/${project.slug}`" class="project-card__title">
      <p class="title">{{ project.title }}</p>
      <p class="subtitle">{{ project.subtitle }}</p>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => ({
        title: '',
        subtitle: '',
        image: '',
      }),
    },
  },
}
</script>

<style>
.project-card {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.project-card__thumbnail {
  position: relative;
  width: 100%;
  padding-bottom: 133.33333%;
  background-color: black;
}

.project-card__thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-card__title {
  position: relative;
  padding: 12px 0 0 0;
}

.project-card__title .title,
.project-card__title .subtitle {
  font-size: 18px;
  line-height: 1.2;
}

.project-card__title .subtitle {
  opacity: 0.25;
}
</style>
