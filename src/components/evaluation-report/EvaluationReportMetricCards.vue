<script setup lang="ts">
import courseRateIcon from '../../assets/评价报表/被评课程占比.svg'
import courseTotalIcon from '../../assets/评价报表/评价课程总数.svg'
import reviewTotalIcon from '../../assets/评价报表/评价总次数.svg'
import teacherRateIcon from '../../assets/评价报表/被评教员总数占比.svg'
import teacherTotalIcon from '../../assets/评价报表/被评教员总数.svg'
import type { EvaluationReportMetric } from '../../mocks/evaluationReport'

defineProps<{
  metrics: EvaluationReportMetric[]
}>()

const iconByMetricId: Record<EvaluationReportMetric['id'], string> = {
  reviewTotal: reviewTotalIcon,
  courseTotal: courseTotalIcon,
  teacherTotal: teacherTotalIcon,
  courseRate: courseRateIcon,
  teacherRate: teacherRateIcon,
}
</script>

<template>
  <div class="metric-grid">
    <article v-for="metric in metrics" :key="metric.id" class="metric-card">
      <img class="metric-icon" :src="iconByMetricId[metric.id]" alt="" aria-hidden="true" />
      <div class="metric-copy">
        <strong>{{ metric.value }}</strong>
        <span>{{ metric.label }}</span>
      </div>
    </article>
  </div>
</template>

<style scoped>
.metric-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.metric-card {
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: 96px;
  padding: 18px 24px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.74);
  box-sizing: border-box;
}

.metric-icon {
  width: 60px;
  height: 60px;
  display: block;
  flex: 0 0 auto;
  margin-right: 18px;
}

.metric-copy {
  display: grid;
  min-width: 0;
  gap: 4px;
}

.metric-copy strong {
  color: #191c1e;
  font: 700 18px/25px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.metric-copy span {
  overflow: hidden;
  color: #191c1e;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1260px) {
  .metric-grid {
    gap: 14px;
  }

  .metric-card {
    padding: 16px 18px;
  }

  .metric-icon {
    margin-right: 12px;
  }
}

@media (max-width: 1080px) {
  .metric-grid {
    grid-template-columns: repeat(3, minmax(170px, 1fr));
  }
}

@media (max-width: 680px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }
}
</style>
