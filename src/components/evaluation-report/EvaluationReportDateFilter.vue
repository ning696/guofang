<script setup lang="ts">
defineProps<{
  start: string
  end: string
}>()
</script>

<template>
  <div class="report-date-filter">
    <span class="filter-label">查询日期</span>
    <button class="date-range" type="button">
      <span class="calendar-icon" aria-hidden="true"></span>
      <span>{{ start }}</span>
      <span class="date-separator">—</span>
      <span>{{ end }}</span>
    </button>
  </div>
</template>

<style scoped>
.report-date-filter {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 36px;
  margin-bottom: 18px;
  color: #191c1e;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.filter-label {
  white-space: nowrap;
}

.date-range {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid #e4e8ef;
  border-radius: 8px;
  color: #232832;
  background: rgba(255, 255, 255, 0.8);
  font: inherit;
  cursor: default;
  box-sizing: border-box;
}

.calendar-icon {
  position: relative;
  width: 14px;
  height: 14px;
  border: 1.7px solid #9aa3b2;
  border-radius: 3px;
  box-sizing: border-box;
}

.calendar-icon::before {
  content: '';
  position: absolute;
  left: -1.7px;
  right: -1.7px;
  top: 3px;
  height: 1.7px;
  background: #9aa3b2;
}

.calendar-icon::after {
  content: '';
  position: absolute;
  left: 3px;
  top: -3px;
  width: 6px;
  height: 4px;
  border-left: 1.7px solid #9aa3b2;
  border-right: 1.7px solid #9aa3b2;
}

.date-separator {
  color: #6d7683;
}

@media (max-width: 520px) {
  .report-date-filter {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
}
</style>