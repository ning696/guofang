<script setup lang="ts">
import ClassroomPatrolCard from './ClassroomPatrolCard.vue'
import type { ClassroomPatrolCard as ClassroomPatrolCardData } from '../../mocks/classroomPatrol'

defineProps<{
  classrooms: ClassroomPatrolCardData[]
}>()
</script>

<template>
  <div class="patrol-grid" aria-label="教室巡课列表">
    <ClassroomPatrolCard
      v-for="classroom in classrooms"
      :key="classroom.room"
      :classroom="classroom"
    />
  </div>
</template>

<style scoped>
.patrol-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  align-items: start;
}

@media (max-width: 1180px) {
  .patrol-grid {
    grid-template-columns: repeat(3, minmax(220px, 1fr));
  }
}

@media (max-width: 1040px) {
  .patrol-grid {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }
}

@media (max-width: 620px) {
  .patrol-grid {
    grid-template-columns: 1fr;
  }
}
</style>
