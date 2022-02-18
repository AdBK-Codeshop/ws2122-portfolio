<template>
  <div class="project-lightbox">
    <button class="project-lightbox__close" @click="close()">Close</button>
    <slider
      v-slot="{ size, current, prev, next, isBeginning, isEnd }"
      :initial="initial"
      class="project-lightbox__slider"
    >
      <slide
        v-for="(image, index) in images"
        :key="index"
        class="project-lightbox__slide"
      >
        <img :src="image" />
      </slide>
      <div class="project-lightbox__counter">
        {{ current + 1 }} / {{ size }}
      </div>
      <div
        v-show="!isBeginning"
        class="project-lightbox__slider-controls project-lightbox__slider-controls--prev"
        @click="prev"
      />
      <div
        v-show="!isEnd"
        class="project-lightbox__slider-controls project-lightbox__slider-controls--next"
        @click="next"
      />
    </slider>
  </div>
</template>

<script>
export default {
  props: {
    initial: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    $route() {
      this.close()
    },
  },
  methods: {
    close() {
      this.$parent.close()
    },
  },
}
</script>

<style>
.project-lightbox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--body-bg);
  color: var(--body-color);
}

.project-lightbox__slider {
  position: relative;
  width: 100%;
  height: 100%;
}

.project-lightbox__slide {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.project-lightbox__slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.project-lightbox__slider-controls {
  position: absolute;
  z-index: 1;
  width: 25%;
  height: 100%;
  top: 0;
}

.project-lightbox__slider-controls--prev {
  left: 0;
  cursor: w-resize;
}

.project-lightbox__slider-controls--next {
  right: 0;
  cursor: e-resize;
}

.project-lightbox__counter {
  position: fixed;
  top: var(--spacer);
  left: var(--spacer);
  z-index: 10;
  font-variant-numeric: tabular-nums;
  text-transform: uppercase;
}

.project-lightbox__close {
  position: fixed;
  top: var(--spacer);
  right: var(--spacer);
  z-index: 10;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
