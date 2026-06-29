<script setup lang="ts">
import { computed, ref } from 'vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import SupervisionFilters from '../components/supervision/SupervisionFilters.vue'
import SupervisionPagination from '../components/supervision/SupervisionPagination.vue'
import SupervisionScheduleView from '../components/supervision/SupervisionScheduleView.vue'
import SupervisionTable from '../components/supervision/SupervisionTable.vue'
import listIcon from '../assets/教学督导/列表视图左侧.svg'
import scheduleIcon from '../assets/教学督导/课表视图左侧.svg'
import resetIcon from '../assets/教学督导/重置.svg'
import { supervisionNavItems } from '../mocks/navigation'
import {
  courseTimeOptions,
  courseTypeOptions,
  scheduleCourses,
  scheduleRoomOptions,
  scheduleTimeSlots,
  scheduleWeekDays,
  supervisionCourses,
  supervisionTabs,
  type SupervisionTab,
} from '../mocks/supervision'

const activeTab = ref<SupervisionTab['value']>('all')
const activeView = ref<'list' | 'schedule'>('list')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedDate = ref('')
const selectedScheduleRoom = ref(scheduleRoomOptions[0]?.value ?? '')

const filteredCourses = computed(() => {
  let courses = supervisionCourses

  if (activeTab.value === 'active') {
    courses = courses.filter((course) => course.status === 'active')
  } else if (activeTab.value === 'today') {
    courses = courses.filter((course) => course.date === '2026-05-11')
  }

  if (selectedDate.value) {
    courses = courses.filter((course) => course.date === selectedDate.value)
  }

  return courses
})

const paginatedCourses = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value

  return filteredCourses.value.slice(start, start + pageSize.value)
})

const currentScheduleRoom = computed(
  () =>
    scheduleRoomOptions.find((option) => option.value === selectedScheduleRoom.value)?.label ??
    selectedScheduleRoom.value,
)

const filteredScheduleCourses = computed(() =>
  scheduleCourses.filter((course) => course.room === selectedScheduleRoom.value),
)

const setActiveTab = (value: SupervisionTab['value']) => {
  activeTab.value = value
  currentPage.value = 1
}

const setPageSize = (value: number) => {
  pageSize.value = value
  currentPage.value = 1
}

const setSelectedDate = (value: string) => {
  selectedDate.value = value
  currentPage.value = 1
}

const resetScheduleRoom = () => {
  selectedScheduleRoom.value = scheduleRoomOptions[0]?.value ?? ''
}
</script>

<template>
  <div class="supervision-page">
    <SidebarNav :items="supervisionNavItems" />
    <TopBar />

    <main class="supervision-main">
      <section class="supervision-panel" :class="{ 'schedule-panel': activeView === 'schedule' }">
        <div class="panel-head" :class="{ 'schedule-head': activeView === 'schedule' }">
          <div v-if="activeView === 'list'" class="tabs" aria-label="课程筛选">
            <button
              v-for="tab in supervisionTabs"
              :key="tab.value"
              class="tab-button"
              :class="{ active: activeTab === tab.value }"
              type="button"
              @click="setActiveTab(tab.value)"
            >
              {{ tab.label }}
            </button>
          </div>

          <form v-else class="schedule-filters" @submit.prevent @reset.prevent="resetScheduleRoom">
            <label class="schedule-select small">
              <span>教室</span>
              <select aria-label="筛选类型">
                <option>教室</option>
              </select>
            </label>
            <label class="schedule-select room">
              <select v-model="selectedScheduleRoom" aria-label="选择教室">
                <option
                  v-for="option in scheduleRoomOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </label>
            <button class="schedule-reset" type="reset">
              <img class="schedule-reset-icon" :src="resetIcon" alt="" aria-hidden="true" />
              <span>重置</span>
            </button>
          </form>

          <div class="view-switch" aria-label="视图切换">
            <button
              class="view-button"
              :class="{ active: activeView === 'list' }"
              type="button"
              @click="activeView = 'list'"
            >
              <img :src="listIcon" alt="" />
              <span>列表视图</span>
            </button>
            <button
              class="view-button"
              :class="{ active: activeView === 'schedule' }"
              type="button"
              @click="activeView = 'schedule'"
            >
              <img :src="scheduleIcon" alt="" />
              <span>课表视图</span>
            </button>
          </div>
        </div>

        <template v-if="activeView === 'list'">
          <SupervisionFilters
            :course-time-options="courseTimeOptions"
            :course-type-options="courseTypeOptions"
            :selected-date="selectedDate"
            @update:selected-date="setSelectedDate"
          />
          <SupervisionTable :courses="paginatedCourses" />
          <SupervisionPagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="filteredCourses.length"
            @update:current-page="currentPage = $event"
            @update:page-size="setPageSize"
          />
        </template>

        <SupervisionScheduleView
          v-else
          :current-room="currentScheduleRoom"
          :week-days="scheduleWeekDays"
          :time-slots="scheduleTimeSlots"
          :courses="filteredScheduleCourses"
        />
      </section>
    </main>
  </div>
</template>

<style scoped>
.supervision-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.supervision-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  min-height: 100svh;
  box-sizing: border-box;
}

.supervision-panel {
  display: flex;
  flex-direction: column;
  min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
  padding: 14px 30px 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}

.supervision-panel.schedule-panel {
  height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
  min-height: 0;
  overflow: hidden;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 42px;
}

.panel-head.schedule-head {
  min-height: 44px;
  padding-bottom: 2px;
}

.tabs {
  display: flex;
  align-items: center;
  gap: 38px;
  height: 42px;
}

.tab-button {
  position: relative;
  height: 42px;
  padding: 0 2px;
  border: 0;
  color: #191c1e;
  background: transparent;
  font: 500 15px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

@media (max-height: 820px) and (min-width: 901px) {
  .supervision-main {
    --panel-bottom-gap: 8px;
  }

  .supervision-panel {
    padding: 8px 24px;
  }

  .panel-head,
  .tabs,
  .tab-button {
    min-height: 36px;
    height: 36px;
  }
}

.tab-button.active {
  font-weight: 600;
}

.tab-button.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 1px;
  width: 32px;
  height: 4px;
  border-radius: 999px;
  background: #1947ff;
  transform: translateX(-50%);
}

.view-switch {
  display: flex;
  align-items: center;
  gap: 0;
  height: 36px;
  padding: 4px;
  border-radius: 6px;
  background: #ecf3fb;
  box-sizing: border-box;
}

.view-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 98px;
  height: 28px;
  border: 0;
  border-radius: 4px;
  color: #191c1e;
  background: transparent;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  box-sizing: border-box;
}

.view-button.active {
  color: #1947ff;
  background: #fff;
  font-weight: 500;
}

.view-button img {
  width: 16px;
  height: 16px;
  display: block;
}

.schedule-filters {
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;
}

.schedule-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 36px;
}

.schedule-select span {
  position: absolute;
  left: 16px;
  z-index: 1;
  color: #191c1e;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  pointer-events: none;
}

.schedule-select select {
  width: 100%;
  height: 36px;
  padding: 0 38px 0 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  appearance: none;
  color: #191c1e;
  background:
    linear-gradient(45deg, transparent 50%, #99a0ac 50%) calc(100% - 20px) 15px / 5px 5px
      no-repeat,
    linear-gradient(135deg, #99a0ac 50%, transparent 50%) calc(100% - 15px) 15px / 5px 5px
      no-repeat,
    #fff;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  box-sizing: border-box;
}

.schedule-select.small {
  width: 100px;
}

.schedule-select.small select {
  color: transparent;
}

.schedule-select.room {
  width: 240px;
}

.schedule-select select:hover,
.schedule-select select:focus-visible {
  border-color: #1947ff;
}

.schedule-reset {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 82px;
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #000;
  background: #fff;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

.schedule-reset:hover,
.schedule-reset:focus-visible {
  border-color: #1947ff;
  outline: none;
}

.schedule-reset-icon {
  width: 16px;
  height: 16px;
  display: block;
}

@media (max-width: 900px) {
  .supervision-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .supervision-panel {
    min-height: 0;
    padding: 18px 16px 22px;
  }

  .supervision-panel.schedule-panel {
    height: auto;
    min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
    overflow: visible;
  }

  .panel-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .schedule-filters {
    flex-wrap: wrap;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .tabs {
    width: 100%;
    justify-content: space-between;
    gap: 18px;
  }

  .view-switch {
    width: 100%;
  }

  .view-button {
    flex: 1 1 0;
    width: auto;
  }

  .schedule-select.small,
  .schedule-select.room,
  .schedule-reset {
    width: 100%;
  }
}
</style>
