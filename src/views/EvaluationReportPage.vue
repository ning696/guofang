<script setup lang="ts">
import EvaluationReportBarChart from '../components/evaluation-report/EvaluationReportBarChart.vue'
import EvaluationReportDateFilter from '../components/evaluation-report/EvaluationReportDateFilter.vue'
import EvaluationReportMetricCards from '../components/evaluation-report/EvaluationReportMetricCards.vue'
import EvaluationReportRanking from '../components/evaluation-report/EvaluationReportRanking.vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import {
  courseEvaluationRankings,
  evaluationReportChartData,
  evaluationReportDateRange,
  evaluationReportMetrics,
  teacherEvaluationRankings,
} from '../mocks/evaluationReport'
import { evaluationReportNavItems } from '../mocks/navigation'
</script>

<template>
  <div class="evaluation-report-page">
    <SidebarNav :items="evaluationReportNavItems" />
    <TopBar />

    <main class="report-main">
      <section class="report-panel">
        <h1>选项管理</h1>

        <EvaluationReportDateFilter
          :start="evaluationReportDateRange.start"
          :end="evaluationReportDateRange.end"
        />

        <div class="ranking-grid">
          <EvaluationReportRanking
            title="教员综合成绩平均分排名"
            :items="teacherEvaluationRankings"
            show-avatar-list
          />
          <EvaluationReportRanking
            title="课程成绩平均分排名"
            :items="courseEvaluationRankings"
          />
        </div>

        <EvaluationReportMetricCards :metrics="evaluationReportMetrics" />

        <EvaluationReportBarChart :items="evaluationReportChartData" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.evaluation-report-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.report-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  min-height: 100svh;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  box-sizing: border-box;
}

.report-panel {
  min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
  padding: 26px 30px 52px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}

h1 {
  margin: 0 0 24px;
  color: #191c1e;
  font: 600 20px/28px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.ranking-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-height: 860px) and (min-width: 901px) {
  .report-main {
    --panel-bottom-gap: 8px;
  }

  .report-panel {
    padding: 20px 24px 32px;
  }

  h1 {
    margin-bottom: 18px;
  }
}

@media (max-width: 1180px) {
  .ranking-grid {
    gap: 16px;
  }
}

@media (max-width: 900px) {
  .report-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .report-panel {
    min-height: 0;
    padding: 20px 16px 28px;
  }

  .ranking-grid {
    grid-template-columns: 1fr;
  }
}
</style>
