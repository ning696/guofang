<script setup lang="ts">
import type { CategoryStatus, EvaluationCategory } from '../../mocks/categoryManagement'

defineProps<{
  categories: EvaluationCategory[]
}>()

const emit = defineEmits<{
  toggleStatus: [id: number]
}>()

const statusText: Record<CategoryStatus, string> = {
  enabled: '已启用',
  disabled: '已禁用',
}
</script>

<template>
  <div class="table-wrap">
    <table class="category-table">
      <thead>
        <tr>
          <th>类型名称</th>
          <th>用户组</th>
          <th>创建时间</th>
          <th>修改时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td class="category-name">{{ category.name }}</td>
          <td>{{ category.userGroup }}</td>
          <td>{{ category.createdAt }}</td>
          <td>{{ category.updatedAt }}</td>
          <td>
            <span class="status" :class="category.status">
              <span class="status-dot"></span>
              <span>{{ statusText[category.status] }}</span>
            </span>
          </td>
          <td>
            <div class="actions" aria-label="分类操作">
              <button class="action view" type="button">查看</button>
              <button class="action toggle" type="button" @click="emit('toggleStatus', category.id)">
                {{ category.status === 'enabled' ? '禁用' : '启用' }}
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

.category-table {
  width: 100%;
  min-width: 1160px;
  border-collapse: collapse;
  table-layout: fixed;
  color: rgba(17, 24, 39, 0.88);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.category-table th,
.category-table td {
  height: 48px;
  padding: 0 28px;
  border-bottom: 1px solid rgba(229, 233, 241, 0.92);
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  box-sizing: border-box;
}

.category-table th {
  height: 40px;
  color: rgba(17, 24, 39, 0.92);
  background: rgba(255, 255, 255, 0.58);
  font-weight: 500;
}

.category-table th:first-child {
  border-top-left-radius: 6px;
}

.category-table th:last-child {
  border-top-right-radius: 6px;
}

.category-table tbody tr {
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.category-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.52);
  box-shadow: 0 5px 16px rgba(185, 197, 222, 0.18);
}

.category-name {
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

.category-table th:nth-child(1),
.category-table td:nth-child(1) {
  width: 38%;
}

.category-table th:nth-child(2),
.category-table td:nth-child(2) {
  width: 14%;
}

.category-table th:nth-child(3),
.category-table td:nth-child(3),
.category-table th:nth-child(4),
.category-table td:nth-child(4) {
  width: 16%;
}

.category-table th:nth-child(5),
.category-table td:nth-child(5) {
  width: 12%;
}

.category-table th:nth-child(6),
.category-table td:nth-child(6) {
  width: 12%;
}

@media (max-height: 820px) and (min-width: 901px) {
  .table-wrap {
    min-height: 330px;
  }

  .category-table th,
  .category-table td {
    height: 44px;
    padding: 0 24px;
  }

  .category-table th {
    height: 38px;
  }
}
</style>
