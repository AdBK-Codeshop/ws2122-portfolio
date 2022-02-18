<template>
  <nuxt-content
    :document="document"
    class="project-details"
    @click="enterGallery"
  />
</template>

<script>
export default {
  name: 'ProjectContent',
  props: {
    document: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      gallery: [],
    }
  },
  mounted() {
    const nodes = this.$el.getElementsByTagName('img')

    for (const n of nodes) {
      n.addEventListener('click', this.enterGallery)
      this.gallery.push(n.attributes[0]?.nodeValue)
    }
  },
  methods: {
    enterGallery(e) {
      const clickedImg = e.target.src
      console.log('~ clickedImg', clickedImg)
    },
  },
}
</script>

<style></style>
