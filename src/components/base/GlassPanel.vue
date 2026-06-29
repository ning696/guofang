<template>
  <section class="glass-panel">
    <slot />
  </section>
</template>

<style scoped>
.glass-panel {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}
</style>
