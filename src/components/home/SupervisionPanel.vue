<script setup lang="ts">
import AppIcon from '../base/AppIcon.vue'
import GlassPanel from '../base/GlassPanel.vue'
import type { SupervisionAction } from '../../mocks/home'
import activeScheduleBg from '../../assets/上课中课表.png'
import activeScheduleIcon from '../../assets/上课中课表左侧.svg'
import todayScheduleBg from '../../assets/今日课表.png'
import todayScheduleIcon from '../../assets/今日课表左侧.svg'

defineProps<{
  actions: SupervisionAction[]
}>()

const actionAssets: Record<SupervisionAction['type'], { background: string; icon: string }> = {
  lesson: {
    background: activeScheduleBg,
    icon: activeScheduleIcon,
  },
  schedule: {
    background: todayScheduleBg,
    icon: todayScheduleIcon,
  },
}
</script>

<template>
  <GlassPanel class="supervision-panel">
    <h2>教学督导</h2>
    <div class="action-list">
      <button
        v-for="action in actions"
        :key="action.title"
        class="action-card"
        type="button"
      >
        <img class="action-bg" :src="actionAssets[action.type].background" alt="" />
        <img class="action-icon" :src="actionAssets[action.type].icon" alt="" />
        <span class="action-title">{{ action.title }}</span>
        <AppIcon class="chevron" name="chevron" />
      </button>
    </div>
  </GlassPanel>
</template>

<style scoped>
.supervision-panel {
  --supervision-panel-inline: 30px;

  height: 216px;
  padding: 24px var(--supervision-panel-inline) 22px;
}

h2 {
  margin: 0 0 24px;
  color: #191c1e;
  font: 600 24px/32px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.action-list {
  display: grid;
  gap: 14px;
}

.action-card {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  padding: 0 22px 0 28px;
  overflow: hidden;
  border: 0;
  border-radius: 12px;
  color: #000;
  font: 400 16px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: left;
  box-sizing: border-box;
}

.action-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

.action-icon {
  position: relative;
  z-index: 1;
  width: 40px;
  height: 40px;
  margin-right: 4px;
  flex: 0 0 auto;
}

.action-title,
.chevron {
  position: relative;
  z-index: 1;
}

.action-title {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chevron {
  width: 16px;
  height: 16px;
  margin-left: auto;
  color: #8d99b6;
}

@media (max-width: 1040px) {
  .supervision-panel {
    height: auto;
  }
}

@media (max-width: 560px) {
  .supervision-panel {
    --supervision-panel-inline: 18px;

    padding-block: 20px;
  }
}
</style>
