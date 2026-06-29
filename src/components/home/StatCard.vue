<script setup lang="ts">
import type { StatCard as StatCardData } from '../../mocks/home'
import patrolIcon from '../../assets/首页/巡课次数.svg'
import reviewIcon from '../../assets/首页/评价次数.svg'
import teacherIcon from '../../assets/首页/评价教员数量.svg'

defineProps<{
  stat: StatCardData
}>()

const statIcons: Record<StatCardData['type'], string> = {
  patrol: patrolIcon,
  review: reviewIcon,
  teacher: teacherIcon,
}
</script>

<template>
  <article class="stat-card" :class="`type-${stat.type}`">
    <div class="stat-copy">
      <span>{{ stat.label }}</span>
      <strong>{{ stat.value }}</strong>
    </div>
    <img class="stat-icon" :src="statIcons[stat.type]" alt="" aria-hidden="true" />
  </article>
</template>

<style scoped>
.stat-card {
  position: relative;
  min-width: 0;
  height: 140px;
  overflow: hidden;
  border-radius: 12px;
}

.stat-copy {
  position: absolute;
  top: 28px;
  left: 40px;
  z-index: 2;
  display: grid;
  gap: 18px;
}

span {
  color: #373737;
  font: 400 16px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

strong {
  color: #000000;
  font: 600 34px/48px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.stat-icon {
  position: absolute;
  top: 50%;
  right: 20px;
  width: 140px;
  height: 140px;
  object-fit: contain;
  pointer-events: none;
  transform: translateY(-50%);
}

.type-patrol {
  background: linear-gradient(165deg, #d1dcfd 12%, #e5ecff 50%, #d1dcfd 88%);
  box-shadow:
    0px 4px 10px 0px rgba(0, 49, 185, 0.0359),
    inset 0px 1px 20px 0px rgba(181, 189, 247, 0.2544);
}

.type-review {
  background: linear-gradient(165deg, #d5f1fa 12%, #e8f9ff 50%, #d5f1fa 88%);
  box-shadow:
    0px 4px 10px 0px rgba(0, 49, 185, 0.0359),
    inset 0px 1px 20px 0px rgba(150, 205, 223, 0.3344);
}

.type-teacher {
  background: linear-gradient(165deg, #dfdbfe 12%, #f1efff 50%, #dfdbfe 88%);
  box-shadow: 0px 4px 10px 0px rgba(0, 49, 185, 0.0359);
}

@media (max-width: 720px) {
  .stat-card {
    height: 128px;
  }

  .stat-copy {
    top: 24px;
    left: 24px;
    gap: 14px;
  }

  strong {
    font-size: 32px;
    line-height: 44px;
  }

  .stat-icon {
    right: 8px;
    width: 112px;
    height: 112px;
  }
}
</style>
