<script setup lang="ts">
import classroomIcon from '../../assets/教室.svg'

defineProps<{
  name: string
}>()
</script>

<template>
  <article class="classroom-card">
    <img class="classroom-icon" :src="classroomIcon" alt="" aria-hidden="true" />
    <strong>{{ name }}</strong>
  </article>
</template>

<style scoped>
.classroom-card {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-width: 0;
  height: 80px;
  padding: 30px 116px 0 30px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #fff;
  border-radius: 12px;
  background: #e3edfb;
  box-shadow:
    0 10px 20px rgba(190, 198, 223, 0.2),
    inset 0 1px 10px rgba(15, 101, 231, 0.1154);
  cursor: pointer;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.classroom-card:hover {
  border-color: #1947ff;
  box-shadow: 0 10px 20px rgba(190, 198, 223, 0.5);
}

strong {
  position: relative;
  z-index: 2;
  max-width: 104px;
  overflow: hidden;
  color: #191c1e;
  font: 500 18px/25px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.classroom-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 83px;
  height: 75px;
  pointer-events: none;
}
</style>
