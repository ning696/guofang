<script setup lang="ts">
import activeIcon from '../../assets/教学督导/上课中左侧.svg'
import endedIcon from '../../assets/教学督导/已结束左侧.svg'
import type { CourseStatus } from '../../mocks/supervision'

const props = defineProps<{
  status: CourseStatus
}>()

const statusMap: Record<CourseStatus, { label: string; icon?: string }> = {
  active: { label: '上课中', icon: activeIcon },
  pending: { label: '未开始' },
  ended: { label: '已结束', icon: endedIcon },
}
</script>

<template>
  <span class="status-badge" :class="`status-${props.status}`">
    <img v-if="statusMap[props.status].icon" :src="statusMap[props.status].icon" alt="" />
    <span>{{ statusMap[props.status].label }}</span>
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 68px;
  height: 28px;
  padding: 0 12px;
  border-radius: 8px;
  box-sizing: border-box;
  white-space: nowrap;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-badge img {
  width: 16px;
  height: 16px;
  display: block;
}

.status-active,
.status-ended {
  color: #1947ff;
  background: rgba(25, 71, 255, 0.12);
}

.status-pending {
  color: rgba(0, 0, 0, 0.88);
  background: rgba(242, 244, 248, 0.9);
}
</style>
