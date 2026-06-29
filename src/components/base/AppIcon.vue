<script setup lang="ts">
defineProps<{
  name:
    | 'home'
    | 'supervision'
    | 'classroom'
    | 'evaluation'
    | 'data'
    | 'record'
    | 'bell'
    | 'screen'
    | 'logout'
    | 'chevron'
}>()
</script>

<template>
  <svg class="app-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path
      v-if="name === 'home'"
      d="M3.5 11.2 12 4l8.5 7.2v8.3a1 1 0 0 1-1 1h-5v-5.8h-5v5.8h-5a1 1 0 0 1-1-1z"
    />
    <path
      v-else-if="name === 'supervision'"
      d="M4 6.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4.8l-4.6 3.4v-3.4H6a2 2 0 0 1-2-2zm4 2h8m-8 4h5"
    />
    <path
      v-else-if="name === 'classroom'"
      d="M4 5.5h16v10H4zm3 13h10M9 15.5l-1.5 3m7.5-3 1.5 3M7.5 8.5h9"
    />
    <path
      v-else-if="name === 'evaluation'"
      d="M6 4.5h12v15H6zm3 4h6m-6 4h6m-6 4h3"
    />
    <path
      v-else-if="name === 'data'"
      d="M5 19V6m5 13V9m5 10V4m4 15H3"
    />
    <path
      v-else-if="name === 'record'"
      d="M6 4.5h9l3 3v12H6zm8.5 0v4h3.5M9 11h6M9 15h6"
    />
    <path
      v-else-if="name === 'bell'"
      d="M6.5 10a5.5 5.5 0 0 1 11 0v3.5l1.7 2.5H4.8l1.7-2.5zm3 8h5"
    />
    <path
      v-else-if="name === 'screen'"
      d="M4 5.5h16v10H4zm5 13h6m-3-3v3"
    />
    <path
      v-else-if="name === 'logout'"
      d="M10 5H6v14h4m4-10 3 3-3 3m-7-3h10"
    />
    <path v-else-if="name === 'chevron'" d="m9 6 6 6-6 6" />
    <path
      v-else
      d="M7 4.5v3m10-3v3M5 7h14v12H5zm4 5h2m3 0h2m-7 4h2m3 0h2"
    />
  </svg>
</template>

<style scoped>
.app-icon {
  display: block;
  width: 1em;
  height: 1em;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}
</style>
