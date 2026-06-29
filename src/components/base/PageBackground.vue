<template>
  <div class="page-background" aria-hidden="true">
    <img
      src="../../assets/背景.png"
      alt=""
    />
  </div>
</template>

<style scoped>
.page-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: #f8f9fc;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
