<script setup lang="ts">
import type { TeachingBuilding } from '../../mocks/classroomPatrol'

defineProps<{
  buildings: TeachingBuilding[]
  activeId: string
}>()

const emit = defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <aside class="building-panel" aria-label="教学楼列表">
    <h2>教学楼</h2>
    <div class="building-list">
      <button
        v-for="building in buildings"
        :key="building.id"
        class="building-item"
        :class="{ active: building.id === activeId }"
        type="button"
        :aria-current="building.id === activeId ? 'page' : undefined"
        @click="emit('select', building.id)"
      >
        <span class="active-line"></span>
        <span class="building-name">{{ building.name }}</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.building-panel {
  min-height: calc(100svh - 108px);
  padding: 22px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.44);
  box-sizing: border-box;
}

h2 {
  margin: 0 0 24px;
  color: #191c1e;
  font: 600 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.building-list {
  display: grid;
  gap: 12px;
}

.building-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 42px;
  padding: 0 16px 0 22px;
  border: 0;
  border-radius: 8px;
  color: #191c1e;
  background: transparent;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  transition: color 0.16s ease, background 0.16s ease, box-shadow 0.16s ease;
}

.building-item:hover,
.building-item:focus-visible,
.building-item.active {
  color: #1947ff;
  background: rgba(255, 255, 255, 0.82);
  outline: none;
}

.building-item.active {
  font-weight: 600;
  box-shadow: 0 6px 18px rgba(190, 198, 223, 0.18);
}

.active-line {
  position: absolute;
  left: 0;
  top: 9px;
  width: 2px;
  height: 24px;
  border-radius: 0 2px 2px 0;
  background: transparent;
}

.building-item.active .active-line {
  background: #1947ff;
}

.building-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .building-panel {
    min-height: 0;
    padding: 14px;
  }

  h2 {
    margin-bottom: 12px;
  }

  .building-list {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .building-item {
    flex: 0 0 auto;
    width: auto;
    min-width: 118px;
  }
}
</style>
