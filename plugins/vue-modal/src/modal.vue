<template>
  <transition
    :name="animation"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
  >
    <div
      v-if="isActive"
      class="modal is-active"
      :class="[{ 'is-full-screen': fullScreen }, customClass]"
      :role="ariaRole"
      :aria-modal="ariaModal"
    >
      <div class="modal__background" @click="cancel('outside')" />
      <div
        class="animation-content"
        :class="{ modal__content: !hasModalCard }"
        :style="customStyle"
      >
        <component
          v-bind="props"
          :is="component"
          v-if="component"
          v-on="events"
          @close="close"
        />
        <div v-else-if="content" v-html="content" />
        <slot v-else />
      </div>
    </div>
  </transition>
</template>

<script>
import { removeElement } from '../utils/index.js'
export default {
  name: 'Modal',
  props: {
    active: Boolean,
    component: [Object, Function],
    content: String,
    programmatic: Boolean,
    props: Object,
    events: Object,
    width: {
      type: [String, Number],
      default: 'auto',
    },
    hasModalCard: {
      type: Boolean,
      default: false,
    },
    animation: {
      type: String,
      default: 'zoom-in',
    },
    canCancel: {
      type: [Array, Boolean],
      default: () => {
        return ['escape', 'outside', 'button']
      },
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    scroll: {
      type: String,
      default: () => {
        return 'clip'
      },
      validator: (value) => {
        return ['clip', 'keep'].includes(value)
      },
    },
    fullScreen: Boolean,
    customClass: String,
    ariaRole: {
      type: String,
      validator: (value) => {
        return ['dialog', 'alertdialog'].includes(value)
      },
    },
    ariaModal: Boolean,
  },
  data() {
    return {
      isActive: this.active || false,
      savedScrollTop: null,
      newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width,
      animating: true,
    }
  },
  computed: {
    cancelOptions() {
      return typeof this.canCancel === 'boolean'
        ? this.canCancel
          ? ['escape', 'outside', 'button']
          : []
        : this.canCancel
    },
    customStyle() {
      if (!this.fullScreen) {
        return { width: this.newWidth }
      }
      return null
    },
  },
  watch: {
    active(value) {
      this.isActive = value
    },
    isActive() {
      this.handleScroll()
    },
  },
  beforeMount() {
    this.programmatic && document.body.appendChild(this.$el)
  },
  mounted() {
    if (this.programmatic) this.isActive = true
    else if (this.isActive) this.handleScroll()
    document.addEventListener('keyup', this.keyPress)
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress)
      // reset scroll
      document.documentElement.classList.remove('no-scroll')
      const savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop
      document.body.classList.remove('no-scroll')
      document.documentElement.scrollTop = savedScrollTop
      document.body.style.top = null
    }
  },
  methods: {
    handleScroll() {
      if (typeof window === 'undefined') return

      if (this.scroll === 'clip') {
        if (this.isActive) {
          document.documentElement.classList.add('no-scroll')
        } else {
          document.documentElement.classList.remove('no-scroll')
        }
        return
      }

      this.savedScrollTop = !this.savedScrollTop
        ? document.documentElement.scrollTop
        : this.savedScrollTop

      if (this.isActive) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }

      if (this.isActive) {
        document.body.style.top = `-${this.savedScrollTop}px`
        return
      }

      document.documentElement.scrollTop = this.savedScrollTop
      document.body.style.top = null
      this.savedScrollTop = null
    },
    cancel(method) {
      if (!this.cancelOptions.includes(method)) return

      this.onCancel.apply(null, arguments)
      this.close()
    },
    close() {
      this.$emit('close')
      this.$emit('update:active', false)
      if (this.programmatic) {
        this.isActive = false
        setTimeout(() => {
          this.$destroy()
          removeElement(this.$el)
        }, 150)
      }
    },
    keyPress(event) {
      if (this.isActive && event.keyCode === 27) this.cancel('escape')
    },
    afterEnter() {
      this.animating = false
    },
    beforeLeave() {
      this.animating = true
    },
  },
}
</script>

<style>
.modal {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  align-items: center;
  display: none;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  z-index: 9999999;
}

.modal.is-active {
  display: flex;
}

.modal.is-full-screen > .animation-content {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.modal.is-full-screen > .modal__background {
  display: none;
}

.animation-content {
  margin: 0 2rem;
}

.modal__background {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.375);
}

.modal__content {
  position: relative;
  width: 100%;
  margin: 1rem;
}

.no-scroll {
  overflow: hidden;
}

.zoom-in-enter-active {
  transition: opacity 0.2s ease;
}

.zoom-in-enter-active .animation-content {
  transition: transform 0.2s ease;
}

.zoom-in-enter {
  opacity: 0;
}

.zoom-in-enter .animation-content {
  transform: scale(0.95);
}
</style>
