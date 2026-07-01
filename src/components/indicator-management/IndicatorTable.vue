<script setup lang="ts">
import type { EvaluationIndicator, IndicatorStatus } from '../../mocks/indicatorManagement'

defineProps<{
  indicators: EvaluationIndicator[]
}>()

const emit = defineEmits<{
  toggleStatus: [id: number]
}>()

const statusText: Record<IndicatorStatus, string> = {
  enabled: '已启用',
  disabled: '已禁用',
}
</script>

<template>
  <div class="table-wrap">
    <table class="indicator-table">
      <thead>
        <tr>
          <th>指标名称</th>
          <th>创建时间</th>
          <th>修改时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="indicator in indicators" :key="indicator.id">
          <td class="indicator-name">{{ indicator.name }}</td>
          <td>{{ indicator.createdAt }}</td>
          <td>{{ indicator.updatedAt }}</td>
          <td>
            <span class="status" :class="indicator.status">
              <span class="status-dot"></span>
              <span>{{ statusText[indicator.status] }}</span>
            </span>
          </td>
          <td>
            <div class="actions" aria-label="指标操作">
              <button class="action view" type="button">查看</button>
              <button class="action toggle" type="button" @click="emit('toggleStatus', indicator.id)">
                {{ indicator.status === 'enabled' ? '禁用' : '启用' }}
              </button>
              <button class="action delete" type="button">删除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrap {
  width: 100%;
  flex: 1 1 auto;
  min-height: 390px;
  overflow-x: auto;
}

.indicator-table {
  width: 100%;
  min-width: 1040px;
  border-collapse: collapse;
  table-layout: fixed;
  color: rgba(17, 24, 39, 0.88);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.indicator-table th,
.indicator-table td {
  height: 48px;
  padding: 0 28px;
  border-bottom: 1px solid rgba(229, 233, 241, 0.92);
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  box-sizing: border-box;
}

.indicator-table th {
  height: 40px;
  color: rgba(17, 24, 39, 0.92);
  background: rgba(255, 255, 255, 0.58);
  font-weight: 500;
}

.indicator-table th:first-child {
  border-top-left-radius: 6px;
}

.indicator-table th:last-child {
  border-top-right-radius: 6px;
}

.indicator-table tbody tr {
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.indicator-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.52);
  box-shadow: 0 5px 16px rgba(185, 197, 222, 0.18);
}

.indicator-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex: 0 0 auto;
}

.status.enabled {
  color: #55b544;
}

.status.enabled .status-dot {
  background: #43c83b;
}

.status.disabled {
  color: #9ca3af;
}

.status.disabled .status-dot {
  background: #b8bec8;
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.action {
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  font: 500 13px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.action.view {
  color: #1947ff;
}

.action.toggle {
  color: #ffad2f;
}

.action.delete {
  color: #ff4d4f;
}

.indicator-table th:nth-child(1),
.indicator-table td:nth-child(1) {
  width: 38%;
}

.indicator-table th:nth-child(2),
.indicator-table td:nth-child(2),
.indicator-table th:nth-child(3),
.indicator-table td:nth-child(3) {
  width: 18%;
}

.indicator-table th:nth-child(4),
.indicator-table td:nth-child(4) {
  width: 14%;
}

.indicator-table th:nth-child(5),
.indicator-table td:nth-child(5) {
  width: 12%;
}

@media (max-height: 820px) and (min-width: 901px) {
  .table-wrap {
    min-height: 330px;
  }

  .indicator-table th,
  .indicator-table td {
    height: 44px;
    padding: 0 24px;
  }

  .indicator-table th {
    height: 38px;
  }
}
</style>
