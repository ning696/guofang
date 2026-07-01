<script setup lang="ts">
import activeIcon from '../../assets/教室巡课/教室巡课上课中左侧.svg'
import teacherIcon from '../../assets/教室巡课/教室巡课教员左侧.svg'
import timeIcon from '../../assets/教室巡课/教室巡课时间左侧.svg'
import courseIcon from '../../assets/教室巡课/教室巡课课程左侧.svg'
import enterIcon from '../../assets/教室巡课/进入教室按钮左侧.svg'
import emptyCourseIcon from '../../assets/教室巡课/暂无课程安排.svg'
import type { ClassroomPatrolCard } from '../../mocks/classroomPatrol'

defineProps<{
  classroom: ClassroomPatrolCard
}>()
</script>

<template>
  <article
    class="patrol-card"
    :class="{ selected: classroom.selected, empty: classroom.status === 'empty' }"
  >
    <header class="card-head">
      <h3>{{ classroom.room }}</h3>
      <span class="status-badge" :class="`status-${classroom.status}`">
        <img v-if="classroom.status === 'active'" :src="activeIcon" alt="" aria-hidden="true" />
        <span>{{ classroom.status === 'active' ? '上课中' : '暂未上课' }}</span>
      </span>
    </header>

    <div v-if="classroom.status === 'active'" class="lesson-info">
      <p class="info-row">
        <img :src="courseIcon" alt="" aria-hidden="true" />
        <span class="label">课程：</span>
        <strong>{{ classroom.course }}</strong>
      </p>
      <p class="info-row">
        <img :src="teacherIcon" alt="" aria-hidden="true" />
        <span class="label">教员：</span>
        <strong>{{ classroom.teacher }}</strong>
      </p>
      <p class="info-row">
        <img :src="timeIcon" alt="" aria-hidden="true" />
        <span class="label">时间：</span>
        <strong>{{ classroom.time }}</strong>
      </p>
    </div>

    <div v-else class="empty-state">
      <img :src="emptyCourseIcon" alt="" aria-hidden="true" />
      <span>当前暂无课程安排</span>
    </div>

    <RouterLink
      class="enter-button"
      :to="{ name: 'classroom-patrol-live', params: { room: classroom.room } }"
    >
      <img :src="enterIcon" alt="" aria-hidden="true" />
      <span>进入教室</span>
    </RouterLink>
  </article>
</template>

<style scoped>
.patrol-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 196px;
  aspect-ratio: 340 / 276;
  padding: 28px 30px 24px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 18px;
  background-color: #fff;
  background-image: url('../../assets/教室巡课/教室巡课.svg');
  background-position: center 33.333%;
  background-repeat: no-repeat;
  background-size: 117.647% 121.739%;
  box-shadow: 0 10px 20px rgba(190, 198, 223, 0.5);
  box-sizing: border-box;
}

.patrol-card:hover,
.patrol-card:focus-within {
  border-color: #1947ff;
  box-shadow: 0 10px 20px rgba(190, 198, 223, 0.5);
}

.patrol-card.empty {
  background-color: #fff;
  background-image: none;
}



.card-head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 28px;
}

h3 {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  color: #191c1e;
  font: 600 18px/24px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex: 0 0 auto;
  min-width: 66px;
  height: 28px;
  padding: 0 10px;
  border-radius: 8px;
  font: 500 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
  white-space: nowrap;
}

.status-badge img {
  width: 14px;
  height: 14px;
  display: block;
}

.status-active {
  color: #1947ff;
  background: rgba(25, 71, 255, 0.1);
  border: 1px solid rgba(25, 71, 255, 0.24);
}

.status-empty {
  color: #697ba9;
  background: rgba(245, 247, 250, 0.86);
  border: 1px solid rgba(229, 231, 235, 0.9);
}

.lesson-info {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 13px;
  margin-top: 28px;
  padding-right: 12px;
}

.info-row {
  display: flex;
  align-items: center;
  min-width: 0;
  margin: 0;
  color: #697ba9;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.info-row img {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
  margin-right: 12px;
  display: block;
}

.info-row strong {
  min-width: 0;
  overflow: hidden;
  color: #191c1e;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.label {
  flex: 0 0 auto;
}


.empty-state {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 8px;
  flex: 1 1 auto;
  min-height: 112px;
  color: rgba(105, 123, 169, 0.38);
  font: 500 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.empty-state img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.enter-button {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 36px;
  margin-top: auto;
  border: 0;
  border-radius: 7px;
  color: #fff;
  background: #0055ff;
  box-shadow: 0 6px 12px rgba(0, 85, 255, 0.28);
  font: 600 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-decoration: none;
  cursor: pointer;
}

.enter-button:visited {
  color: #fff;
  text-decoration: none;
}

.enter-button:hover,
.enter-button:focus-visible {
  background: #1947ff;
  outline: none;
}

.enter-button img {
  width: 16px;
  height: 16px;
  display: block;
}

@media (max-width: 520px) {
  .patrol-card {
    min-height: 188px;
    padding: 20px;
  }

  .lesson-info {
    gap: 10px;
    margin-top: 20px;
  }
}
</style>
