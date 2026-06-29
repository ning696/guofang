<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import activeIcon from '../../assets/教学督导/上课中左侧.svg'
import endedIcon from '../../assets/教学督导/已结束左侧.svg'
import type { ScheduleCourse } from '../../mocks/supervision'

const props = defineProps<{
  course: ScheduleCourse
}>()

type CourseCardSizeMode = 'normal' | 'compact' | 'two-line' | 'minimal'

const cardRef = ref<HTMLElement | null>(null)
const sizeMode = ref<CourseCardSizeMode>('normal')
let resizeObserver: ResizeObserver | null = null

const gridStyle = computed(() => ({
  gridColumn: String(props.course.dayIndex + 2),
  gridRow: `${props.course.startSlot + 2} / span ${
    props.course.endSlot - props.course.startSlot + 1
  }`,
}))

const updateSizeMode = () => {
  const height = cardRef.value?.clientHeight ?? 0

  if (height < 56) {
    sizeMode.value = 'minimal'
  } else if (height < 72) {
    sizeMode.value = 'two-line'
  } else if (height < 88) {
    sizeMode.value = 'compact'
  } else {
    sizeMode.value = 'normal'
  }
}

onMounted(() => {
  nextTick(updateSizeMode)

  if (cardRef.value) {
    resizeObserver = new ResizeObserver(updateSizeMode)
    resizeObserver.observe(cardRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<template>
  <article
    ref="cardRef"
    class="schedule-course-card"
    :class="[`tone-${course.tone}`, `status-${course.status}`, `mode-${sizeMode}`]"
    :style="gridStyle"
    tabindex="0"
  >
    <span v-if="course.status === 'active'" class="course-status">
      <img :src="activeIcon" alt="" />
      上课中
    </span>
    <span v-else-if="course.status === 'ended'" class="course-status ended">
      <img :src="endedIcon" alt="" />
      已结束
    </span>
    <strong>{{ course.title }}</strong>
    <span class="class-name">{{ course.className }}</span>
    <span class="teacher-name">{{ course.teacher }}</span>
  </article>
</template>

<style scoped>
.schedule-course-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 0;
  min-height: 0;
  padding: 18px 12px 12px;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 8px;
  color: rgba(50, 50, 50, 0.88);
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: center;
  box-sizing: border-box;
}

.schedule-course-card strong,
.schedule-course-card span {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.schedule-course-card strong {
  color: var(--course-color);
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.course-status {
  position: absolute;
  top: 2px;
  right: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 18px;
  color: #1947ff;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.course-status img {
  display: block;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
}

.course-status.ended {
  color: #697ba9;
}

.tone-orange {
  --course-color: #ff6100;
  background: #fcf2ec;
  border-color: rgba(255, 97, 0, 0.1);
}

.tone-purple {
  --course-color: #4d19ff;
  background: #f2f5ff;
  border-color: rgba(77, 25, 255, 0.1);
}

.tone-blue {
  --course-color: #0058e0;
  background: #ecf8fd;
  border-color: rgba(25, 71, 255, 0.1);
}

.tone-yellow {
  --course-color: #ff9a00;
  background: #fbf4e8;
  border-color: rgba(255, 154, 0, 0.1);
}

.tone-green {
  --course-color: #369d00;
  background: #ebfaea;
  border-color: rgba(0, 178, 64, 0.1);
}

.schedule-course-card:hover,
.schedule-course-card:focus-visible {
  border-color: #1947ff;
  box-shadow: 0 10px 20px rgba(190, 198, 223, 0.3);
  outline: none;
}

.mode-compact {
  gap: 1px;
  padding: 8px 10px;
}

.mode-compact strong {
  font-size: 13px;
  line-height: 17px;
}

.mode-compact span {
  font-size: 12px;
  line-height: 15px;
}

.mode-two-line {
  gap: 2px;
  padding: 8px 10px;
}

.mode-two-line .teacher-name {
  display: none;
}

.mode-two-line strong {
  font-size: 13px;
  line-height: 18px;
}

.mode-two-line span {
  font-size: 12px;
  line-height: 16px;
}

.mode-minimal {
  gap: 0;
  padding: 6px 8px;
}

.mode-minimal .class-name,
.mode-minimal .teacher-name,
.mode-minimal .course-status {
  display: none;
}

.mode-minimal strong {
  font-size: 12px;
  line-height: 16px;
}

@media (max-width: 900px) {
  .schedule-course-card {
    gap: 2px;
    padding: 16px 8px 10px;
  }

  .schedule-course-card strong {
    font-size: 13px;
    line-height: 18px;
  }

  .schedule-course-card span {
    font-size: 12px;
    line-height: 16px;
  }
}
</style>
