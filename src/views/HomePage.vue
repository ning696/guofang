<script setup lang="ts">
import ClassroomGrid from '../components/home/ClassroomGrid.vue'
import RecentPatrol from '../components/home/RecentPatrol.vue'
import StatsPanel from '../components/home/StatsPanel.vue'
import SupervisionPanel from '../components/home/SupervisionPanel.vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import { navItems } from '../mocks/navigation'
import {
  classrooms,
  recentPatrols,
  stats,
  supervisionActions,
} from '../mocks/home'
</script>

<template>
  <div class="home-page">
    <SidebarNav :items="navItems" />
    <TopBar />

    <main class="dashboard-main">
      <ClassroomGrid :classrooms="classrooms" />
      <div class="middle-row">
        <RecentPatrol :records="recentPatrols" />
        <SupervisionPanel :actions="supervisionActions" />
      </div>
      <StatsPanel :stats="stats" />
    </main>
  </div>
</template>

<style scoped>
.home-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.dashboard-main {
  position: relative;
  display: grid;
  gap: 20px;
  margin-left: 220px;
  padding: 76px 20px 28px 10px;
  min-height: 100svh;
  box-sizing: border-box;
}

.middle-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 370px;
  gap: 20px;
}

@media (max-width: 1040px) {
  .middle-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .dashboard-main {
    margin-left: 0;
    padding: 8px 12px 24px;
  }
}
</style>
