<template>
  <div class="page">
    <main-intro />
    <main-header />
    <Nuxt />
    <main-footer />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
:root {
  --body-color: rgb(43, 43, 43);
  --body-bg: #fafafa;
  --spacer: 1rem;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: var(--body-color);
  background-color: var(--body-bg);
}

.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}

/* Grid System */
.row {
  display: flex;
  justify-content: center;
  margin-left: calc((var(--spacer) / 2) * -1);
  margin-right: calc((var(--spacer) / 2) * -1);
  flex-wrap: wrap;
}

.row-end {
  justify-content: flex-end;
}

.row-start {
  justify-content: flex-start;
}

.col-1 {
  width: calc(100% / 12);
}

.col-2 {
  width: calc(100% / 12 * 2);
}

.col-3 {
  width: calc(100% / 12 * 3);
}

.col-4 {
  width: calc(100% / 12 * 4);
}

.col-5 {
  width: calc(100% / 12 * 5);
}

.col-6 {
  width: calc(100% / 12 * 6);
}

.col-7 {
  width: calc(100% / 12 * 7);
}

.col-8 {
  width: calc(100% / 12 * 8);
}

.col-9 {
  width: calc(100% / 12 * 9);
}

.col-10 {
  width: calc(100% / 12 * 10);
}

.col-11 {
  width: calc(100% / 12 * 11);
}

.col-12 {
  width: calc(100% / 12 * 12);
}

.col {
  padding: 0 calc(var(--spacer) / 2);
}

@media screen and (max-width: 600px) {
  .col {
    width: 100%;
  }
  .col + .col {
    margin-top: var(--spacer);
  }
}

/* justify contetn in coloumns  */
.center {
  display: flex;
  align-items: center;
}

.top {
  display: flex;
  align-items: flex-end;
}

.bottom {
  display: flex;
  align-items: flex-end;
}

.pad-1 {
  padding: calc(var(--spacer) * 2);
}

.pad-2 {
  padding: calc(var(--spacer) * 4);
}

/* Image Cropping */
.aspect {
  position: relative;
  width: 100%;
  padding-bottom: var(--aspect);
  overflow: hidden;
}

/* This is a hack th crop images */
.aspect img,
.aspect video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* To add you wo
 *
*/
.aspect-16x10 {
  --aspect: 62.5%;
}

.aspect-3x2 {
  --aspect: 66.666%;
}

.aspect-4x3 {
  --aspect: 75%;
}

.aspect-2x3 {
  --aspect: 150%;
}

.aspect-3x4 {
  --aspect: 133.33333%;
}

.aspect-1x1 {
  --aspect: 100%;
}

/* Prevents the image from being croped.
 * But makes it contain within the parent 
 */
.contain img {
  object-fit: contain;
}
</style>
