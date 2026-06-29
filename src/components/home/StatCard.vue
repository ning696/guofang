<script setup lang="ts">
import type { StatCard as StatCardData } from '../../mocks/home'

defineProps<{
  stat: StatCardData
}>()
</script>

<template>
  <article class="stat-card" :class="`type-${stat.type}`">
    <div class="stat-copy">
      <span>{{ stat.label }}</span>
      <strong>{{ stat.value }}</strong>
    </div>
    <div class="stat-icon" aria-hidden="true">
      <!-- 占位，后续替换为实际图标 -->
    </div>
  </article>
</template>

<style scoped>
.stat-card {
  position: relative;
  min-width: 0;
  height: 140px;
  overflow: hidden;
  border-radius: 16px;
  background: #e8ebf5;
}

.stat-copy {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
  display: grid;
  gap: 8px;
}

span {
  color: #5e6881;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

strong {
  color: #1a1d26;
  font: 700 48px/56px 'DIN Alternate', 'Arial Narrow', 'PingFang SC', sans-serif;
}

.stat-icon {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

/* 巡课次数 - 浅紫色背景 */
.type-patrol {
  background: linear-gradient(135deg, #e8ebf5 0%, #dfe3f2 100%);
}

/* 评价次数 - 浅青色背景 */
.type-teacher {
  background: linear-gradient(135deg, #d7f2f5 0%, #c9eef3 100%);
}

/* 评价教员数量 - 浅蓝紫色背景 */
.type-review {
  background: linear-gradient(135deg, #e8e5f8 0%, #ddd9f3 100%);
}

@media (max-width: 720px) {
  .stat-card {
    height: 128px;
  }

  strong {
    font-size: 42px;
    line-height: 50px;
  }
}
</style>
