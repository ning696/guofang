<script setup lang="ts">
import ScheduleCourseCard from './ScheduleCourseCard.vue'
import nextWeekIcon from '../../assets/教学督导/下一周.svg'
import type { ScheduleCourse, ScheduleTimeSlot, ScheduleWeekDay } from '../../mocks/supervision'

defineProps<{
  currentRoom: string
  weekDays: ScheduleWeekDay[]
  timeSlots: ScheduleTimeSlot[]
  courses: ScheduleCourse[]
}>()
</script>

<template>
  <section class="schedule-view">
    <div class="week-head">
      <button class="week-button prev" type="button">
        <span aria-hidden="true"></span>
        上一周
      </button>
      <h2>{{ currentRoom }}</h2>
      <button class="week-button next" type="button">
        下一周
        <img :src="nextWeekIcon" alt="" />
      </button>
    </div>

    <div class="schedule-scroll">
      <div class="schedule-grid">
        <div class="schedule-cell schedule-corner">上课时间</div>
        <div
          v-for="(day, index) in weekDays"
          :key="day.key"
          class="schedule-cell day-cell"
          :style="{ gridColumn: String(index + 2) }"
        >
          <strong>{{ day.weekday }}</strong>
          <span>{{ day.date }}</span>
        </div>
        <div
          v-for="slot in timeSlots"
          :key="slot.id"
          class="schedule-cell time-cell"
          :style="{ gridRow: String(slot.id + 2) }"
        >
          {{ slot.label }}
        </div>
        <ScheduleCourseCard v-for="course in courses" :key="course.id" :course="course" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.schedule-view {
  display: flex;
  flex: 1 1 auto;
  min-height: 0;
  flex-direction: column;
  padding-top: 8px;
}

.week-head {
  position: relative;
  display: grid;
  grid-template-columns: 120px minmax(180px, 1fr) 120px;
  align-items: center;
  min-height: 42px;
  margin-bottom: 10px;
}

.week-head h2 {
  margin: 0;
  color: #191c1e;
  font: 600 24px/30px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: center;
}

.week-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: 85px;
  height: 28px;
  padding: 0 12px;
  border: 0;
  border-radius: 4px;
  color: #191c1e;
  background: transparent;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

.week-button.next {
  justify-self: end;
}

.week-button span {
  width: 8px;
  height: 8px;
  border-top: 1.6px solid currentColor;
  border-left: 1.6px solid currentColor;
  box-sizing: border-box;
}

.week-button.prev span {
  transform: rotate(-45deg);
}

.week-button.next span {
  transform: rotate(135deg);
}

.week-button img {
  display: block;
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}

.week-button:hover,
.week-button:focus-visible {
  color: #1947ff;
  background: rgba(236, 243, 251, 0.8);
  outline: none;
}

.schedule-scroll {
  display: flex;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
}

.schedule-grid {
  display: grid;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  grid-template-columns: 110px repeat(7, minmax(0, 1fr));
  grid-template-rows: 48px repeat(7, minmax(0, 1fr));
  gap: 10px;
}

.schedule-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  background: #ecf3fb;
  color: rgba(0, 0, 0, 0.88);
  box-sizing: border-box;
}

.schedule-corner {
  grid-column: 1;
  grid-row: 1;
  padding: 0 22px;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.day-cell {
  grid-row: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  padding: 5px 10px;
}

.day-cell strong,
.day-cell span {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.day-cell strong {
  color: rgba(0, 0, 0, 0.88);
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.day-cell span {
  color: rgba(100, 100, 100, 0.88);
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.time-cell {
  grid-column: 1;
  padding: 0 16px;
  color: rgba(0, 0, 0, 0.88);
  background: #ecf3fb;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

@media (min-width: 1600px) {
  .schedule-grid {
    grid-template-columns: 110px repeat(7, minmax(0, 1fr));
  }
}

@media (max-height: 820px) and (min-width: 901px) {
  .schedule-view {
    padding-top: 4px;
  }

  .week-head {
    min-height: 34px;
    margin-bottom: 8px;
  }

  .week-head h2 {
    font-size: 22px;
    line-height: 28px;
  }

  .schedule-grid {
    grid-template-rows: 44px repeat(7, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .week-head {
    grid-template-columns: 92px minmax(140px, 1fr) 92px;
  }

  .week-head h2 {
    font-size: 20px;
    line-height: 26px;
  }

  .week-button {
    width: auto;
    padding-inline: 8px;
  }

  .schedule-grid {
    grid-template-columns: 92px repeat(7, minmax(0, 1fr));
    gap: 8px;
  }
}

@media (max-width: 520px) {
  .week-head {
    grid-template-columns: 1fr 1fr;
    row-gap: 8px;
  }

  .week-head h2 {
    grid-column: 1 / -1;
    grid-row: 1;
  }

  .week-button.prev {
    grid-column: 1;
    grid-row: 2;
  }

  .week-button.next {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
