<script setup lang="ts">
import { computed, ref } from 'vue'
import ClassroomPatrolGrid from '../components/classroom/ClassroomPatrolGrid.vue'
import TeachingBuildingList from '../components/classroom/TeachingBuildingList.vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import { classroomPatrolNavItems } from '../mocks/navigation'
import {
  classroomPatrolCards,
  classroomPatrolMeta,
  teachingBuildings,
} from '../mocks/classroomPatrol'

const activeBuildingId = ref(classroomPatrolMeta.defaultBuildingId)

const activeBuilding = computed(
  () =>
    teachingBuildings.find((building) => building.id === activeBuildingId.value) ??
    teachingBuildings[0],
)
</script>

<template>
  <div class="classroom-patrol-page">
    <SidebarNav :items="classroomPatrolNavItems" />
    <TopBar />

    <main class="classroom-main">
      <div class="classroom-layout">
        <TeachingBuildingList
          :buildings="teachingBuildings"
          :active-id="activeBuildingId"
          @select="activeBuildingId = $event"
        />

        <section class="classroom-panel">
          <header class="panel-head">
            <h2>{{ activeBuilding.name }}</h2>
            <p>{{ classroomPatrolMeta.currentTime }}</p>
          </header>

          <ClassroomPatrolGrid :classrooms="classroomPatrolCards" />
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.classroom-patrol-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.classroom-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  min-height: 100svh;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  box-sizing: border-box;
}

.classroom-layout {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  gap: 20px;
  min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
}

.classroom-panel {
  min-width: 0;
  min-height: 100%;
  padding: 24px 20px 26px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
  box-sizing: border-box;
}

.panel-head {
  display: flex;
  align-items: baseline;
  gap: 16px;
  min-height: 32px;
  margin-bottom: 26px;
}

.panel-head h2 {
  margin: 0;
  color: #191c1e;
  font: 600 24px/32px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.panel-head p {
  margin: 0;
  color: #697ba9;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

@media (max-width: 1280px) and (min-width: 901px) {
  .classroom-layout {
    grid-template-columns: 174px minmax(0, 1fr);
    gap: 14px;
  }

  .classroom-panel {
    padding: 22px 16px 24px;
  }
}

@media (max-width: 900px) {
  .classroom-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .classroom-layout {
    grid-template-columns: 1fr;
    gap: 14px;
    min-height: 0;
  }

  .classroom-panel {
    min-height: 0;
    padding: 18px 14px 20px;
  }

  .panel-head {
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 18px;
  }
}

@media (max-width: 520px) {
  .panel-head h2 {
    font-size: 22px;
    line-height: 30px;
  }
}
</style>
