<template>
  <div class="intro">
    <div class="intro__logo">
      <main-logo />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--body-color);
  color: var(--body-bg);

  animation-name: swipe-up;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  animation-delay: 700ms;
  animation-timing-function: cubic-bezier(0.33, 1, 0.68, 1);
}

.intro__logo {
  width: 80%;

  animation-name: fade-up;
  animation-duration: 1200ms;
  animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
}

@keyframes swipe-up {
  from {
    clip-path: inset(0% 0% 0% 0%);
  }
  to {
    clip-path: inset(0% 0% 100% 0%);
    visibility: hidden;
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
