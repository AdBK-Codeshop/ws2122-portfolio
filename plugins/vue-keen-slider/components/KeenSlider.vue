<template>
  <div ref="slider" class="keen-slider">
    <slot
      :current="current"
      :size="size"
      :isEnd="isEnd"
      :isBeginning="isBeginning"
      :next="next"
      :prev="prev"
      :moveToSlideRelative="moveToSlideRelative"
    />
  </div>
</template>

<script>
import KeenSlider from 'keen-slider'

export default {
  name: 'KeenSlider',
  props: {
    /**
     * Control slider with mouse or touch gestures
     * @default true
     */
    controls: {
      default: () => true,
      type: Boolean,
    },
    /**
     * Adjust the speed that is translated to the slider when dragging - minus values would invert the swipe direction
     * @default 1
     */
    dragSpeed: {
      default: () => 1,
      type: Number,
    },
    /**
     * Index of the initial activated slide
     * @default 0
     */
    initial: {
      default: () => 0,
      type: Number,
    },
    /**
     * Set the slider direction to vertical
     * @default false
     */
    vertical: {
      default: () => false,
      type: Boolean,
    },
    /**
     * Infinite loop of slides
     * @default false
     */
    loop: {
      default: () => false,
      type: Boolean,
    },
    /**
     * Set the mode of movement of the slider
     * @default snap
     * @values snap, free-snap, free
     */
    mode: {
      default: () => 'snap',
      type: String,
    },
    /**
     * Set the animation duration for the "snap"-mode
     * @default 500
     */
    duration: {
      default: () => 500,
      type: Number,
    },
    /**
     * Reset to initial when the breakpoint changes
     * @default false
     */
    resetSlide: {
      default: () => false,
      type: Boolean,
    },
    /**
     * Number of slides per view
     * @default 1
     */
    slidesPerView: {
      default: () => 1,
      type: Number,
    },
    /**
     * Spacing between slides in pixel
     * @default 0
     */
    spacing: {
      default: () => 0,
      type: Number,
    },
    /**
     * Simulate rubberband if moving or dragging above the slider edge
     * @default true
     */
    rubberband: {
      default: () => true,
      type: Boolean,
    },
    /**
     * Active slide will be centered - only makes sense, when slidesPerView is greater than `1`
     * @default false
     */
    centered: {
      type: Boolean,
      default: () => false,
    },
    /**
     * Auto change the slide. Set the interval with this attribute as string or number in ms. Default interval: `3000`
     * @default false
     */
    autoplay: {
      type: [Boolean, Number, String],
      default: () => false,
    },
    /**
     * Change the options or event hooks for a given breakpoint. The breakpoint is set by the media query syntax. Note: The last options of the last matching breakpoint will be merged with the options on the root level.
     * @default {}
     */
    breakpoints: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      keenSlider: null,
      current: 0,
      size: 0,
      interval: null,
    }
  },
  computed: {
    sliderOptions() {
      return {
        breakpoints: this.breakpoints,
        controls: this.controls,
        dragSpeed: this.dragSpeed,
        initial: this.initial,
        vertical: this.vertical,
        loop: this.loop,
        mode: this.mode,
        duration: this.duration,
        resetSlide: this.resetSlide,
        slidesPerView: this.slidesPerView,
        spacing: this.spacing,
        rubberband: this.rubberband,
        centered: this.centered,
      }
    },
    isBeginning() {
      return this.current === 0
    },
    isEnd() {
      return this.current === this.size - 1
    },
  },
  mounted() {
    if (typeof window !== 'undefined') {
      this.$nextTick(() => {
        this.initialize()
      })
    }
    this.current = this.initial
  },
  methods: {
    initialize() {
      this.keenSlider = new KeenSlider(
        this.$refs.slider,
        this.getCombinedOptions()
      )
      this.initAutoplay()
      this.$watch('$props', () => {
        this.refresh()
      })
      this.size = this.keenSlider.details().size
    },
    refresh() {
      if (this.keenSlider) {
        this.keenSlider.refresh(this.getCombinedOptions())
        this.initAutoplay()
      }
    },
    initAutoplay() {
      if (this.interval) {
        clearInterval(this.interval)
      }
      if (this.autoplay) {
        let time = 3000
        if (typeof this.autoplay === 'number') {
          time = this.autoplay
        } else if (typeof this.autoplay === 'string') {
          const parsedTime = parseInt(this.autoplay)
          if (parsedTime > 0) {
            time = parsedTime
          }
        }
        this.interval = setInterval(() => {
          this.next()
        }, time)
      }
    },
    getCombinedOptions() {
      return {
        ...this.sliderOptions,
        ...this.generateEventHooks(),
      }
    },
    generateEventHooks() {
      const events = [
        'afterChange',
        'beforeChange',
        'mounted',
        'created',
        'slideChanged',
        'dragEnd',
        'dragStart',
        'move',
      ]
      const hookObject = {}
      for (const Key of events) {
        if (Key === 'slideChanged') {
          hookObject[Key] = (...args) => {
            if (this.keenSlider) {
              this.current = this.keenSlider.details().relativeSlide
            }
            this.$emit(Key, ...args)
          }
        } else {
          hookObject[Key] = (...args) => {
            if (Key === 'dragStart' && this.interval) {
              clearInterval(this.interval)
            }
            if (Key === 'dragEnd') {
              this.initAutoplay()
            }
            this.$emit(Key, ...args)
          }
        }
      }
      return hookObject
    },
    /**
     * Safe call to keen-slider moveToSlide() method
     * @param {number} slide
     * @param {number} duration
     * @see https://keen-slider.io/api/#methods
     * @public
     */
    moveToSlide(slide, duration) {
      if (this.keenSlider) {
        this.keenSlider.moveToSlide(slide, duration)
      }
    },
    /**
     * Safe call to keen-slider moveToSlideRelative() method
     * @param {number} slide
     * @param {boolean} nearest
     * @param {number} duration
     * @see https://keen-slider.io/api/#methods
     * @public
     */
    moveToSlideRelative(slide, nearest, duration) {
      if (this.keenSlider) {
        this.keenSlider.moveToSlideRelative(slide, nearest, duration)
      }
    },
    /**
     * Safe call to keen-slider next() method
     * @see https://keen-slider.io/api/#methods
     * @public
     */
    next() {
      if (this.keenSlider) {
        this.keenSlider.next()
      }
    },
    /**
     * Safe call to keen-slider prev() method
     * @see https://keen-slider.io/api/#methods
     * @public
     */
    prev() {
      if (this.keenSlider) {
        this.keenSlider.prev()
      }
    },
    /**
     * Safe call to keen-slider resize() method
     * @see https://keen-slider.io/api/#methods
     * @public
     */
    resize() {
      if (this.keenSlider) {
        this.keenSlider.resize()
      }
    },
  },
}
</script>

<style></style>
