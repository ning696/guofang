<script setup lang="ts">
import type { EvaluationReportChartItem } from '../../mocks/evaluationReport'

const props = defineProps<{
  items: EvaluationReportChartItem[]
}>()

const maxValue = 250
const ticks = [250, 200, 150, 100, 50, 0]

const totalHeight = (item: EvaluationReportChartItem) =>
  `${Math.min(item.reviewTotal / maxValue, 1) * 100}%`

const courseHeight = (item: EvaluationReportChartItem) =>
  `${(item.courseTotal / item.reviewTotal) * 100}%`

const teacherHeight = (item: EvaluationReportChartItem) =>
  `${(item.teacherTotal / item.reviewTotal) * 100}%`
</script>

<template>
  <section class="chart-card" aria-label="评价报表柱状图">
    <div class="chart-legend">
      <span class="legend-item total"><i></i>被评总次数</span>
      <span class="legend-item course"><i></i>被评课程总数</span>
      <span class="legend-item teacher"><i></i>被评教员总数</span>
    </div>

    <div class="chart-scroll">
      <div class="chart-inner">
        <div class="y-axis">
          <span v-for="tick in ticks" :key="tick">{{ tick }}</span>
        </div>

        <div class="plot-area">
          <span
            v-for="tick in ticks"
            :key="`grid-${tick}`"
            class="grid-line"
            :style="{ bottom: `${(tick / maxValue) * 100}%` }"
          ></span>

          <div class="bars">
            <div v-for="item in items" :key="item.academy" class="bar-column" tabindex="0">
              <div class="bar-track">
                <div class="bar-stack" :style="{ height: totalHeight(item) }">
                  <span class="bar-segment teacher-segment" :style="{ height: teacherHeight(item) }"></span>
                  <span class="bar-segment course-segment" :style="{ height: courseHeight(item) }"></span>
                </div>
              </div>
              <div class="chart-tooltip">
                <p><i class="total-dot"></i>被评总次数：{{ item.reviewTotal }}</p>
                <p><i class="course-dot"></i>被评课程总数：{{ item.courseTotal }}</p>
                <p><i class="teacher-dot"></i>被评教员总数：{{ item.teacherTotal }}</p>
              </div>
              <span class="x-label">{{ item.academy }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart-card {
  margin-top: 18px;
  padding: 26px 34px 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  box-sizing: border-box;
}

.chart-legend {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 56px;
  height: 24px;
  margin-bottom: 22px;
  padding-right: 40px;
  color: #191c1e;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.legend-item i {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}

.legend-item.total i {
  background: #2da8ff;
}

.legend-item.course i {
  background: #3154ff;
}

.legend-item.teacher i {
  background: #44d0e7;
}

.chart-scroll {
  overflow-x: auto;
  overflow-y: hidden;
}

.chart-inner {
  display: grid;
  grid-template-columns: 54px minmax(860px, 1fr);
  min-width: 914px;
  height: 318px;
}

.y-axis {
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  align-items: start;
  justify-items: end;
  padding: 1px 14px 34px 0;
  color: #8a919d;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

.plot-area {
  position: relative;
  height: 284px;
  border-bottom: 1px solid rgba(226, 231, 238, 0.88);
}

.grid-line {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(226, 231, 238, 0.88);
  transform: translateY(50%);
}

.bars {
  position: absolute;
  inset: 0 0 -34px;
  display: grid;
  grid-template-columns: repeat(10, minmax(54px, 1fr));
  align-items: end;
}

.bar-column {
  position: relative;
  display: grid;
  justify-items: center;
  align-items: end;
  height: 100%;
  outline: none;
}

.bar-track {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 284px;
}

.bar-stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 30px;
  min-height: 2px;
}

.bar-segment {
  display: block;
  width: 100%;
}

.teacher-segment {
  background: #44d0e7;
}

.course-segment {
  background: #3154ff;
}

.x-label {
  display: block;
  height: 34px;
  color: #6b7280;
  font: 400 13px/34px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.chart-tooltip {
  position: absolute;
  left: 50%;
  bottom: 132px;
  z-index: 2;
  width: 164px;
  padding: 14px 16px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 8px 24px rgba(64, 84, 122, 0.12);
  color: #191c1e;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  opacity: 0;
  pointer-events: none;
  transform: translateX(16px);
  transition: opacity 0.15s ease;
  box-sizing: border-box;
}

.bar-column:hover .chart-tooltip,
.bar-column:focus-visible .chart-tooltip {
  opacity: 1;
}

.chart-tooltip p {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
}

.chart-tooltip p + p {
  margin-top: 10px;
}

.chart-tooltip i {
  width: 6px;
  height: 6px;
  border-radius: 2px;
  flex: 0 0 auto;
}

.total-dot {
  background: #2da8ff;
}

.course-dot {
  background: #3154ff;
}

.teacher-dot {
  background: #44d0e7;
}

@media (max-width: 900px) {
  .chart-card {
    padding: 22px 18px 26px;
  }

  .chart-legend {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 14px 24px;
    height: auto;
    padding-right: 0;
  }
}
</style>