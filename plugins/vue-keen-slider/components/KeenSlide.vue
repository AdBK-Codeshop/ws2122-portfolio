<template>
  <div class="keen-slider__slide" v-on="$listeners">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'KeenSlide',
}
</script>
