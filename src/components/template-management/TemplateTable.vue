<script setup lang="ts">
import type { EvaluationTemplate, TemplateStatus } from '../../mocks/templateManagement'

defineProps<{
  templates: EvaluationTemplate[]
}>()

const statusText: Record<TemplateStatus, string> = {
  enabled: '已启用',
  disabled: '已禁用',
}
</script>

<template>
  <div class="table-wrap">
    <table class="template-table">
      <thead>
        <tr>
          <th>模板名称</th>
          <th>所属分类</th>
          <th>创建时间</th>
          <th>修改时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="template in templates" :key="template.id">
          <td class="template-name">{{ template.name }}</td>
          <td>{{ template.category }}</td>
          <td>{{ template.createdAt }}</td>
          <td>{{ template.updatedAt }}</td>
          <td>
            <span class="status" :class="template.status">
              <span class="status-dot"></span>
              <span>{{ statusText[template.status] }}</span>
            </span>
          </td>
          <td>
            <div class="actions" aria-label="模板操作">
              <button class="action view" type="button">查看</button>
              <button class="action disable" type="button">禁用</button>
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

.template-table {
  width: 100%;
  min-width: 1160px;
  border-collapse: collapse;
  table-layout: fixed;
  color: rgba(17, 24, 39, 0.88);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.template-table th,
.template-table td {
  height: 48px;
  padding: 0 28px;
  border-bottom: 1px solid rgba(229, 233, 241, 0.92);
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  box-sizing: border-box;
}

.template-table th {
  height: 40px;
  color: rgba(17, 24, 39, 0.92);
  background: rgba(255, 255, 255, 0.58);
  font-weight: 500;
}

.template-table th:first-child {
  border-top-left-radius: 6px;
}

.template-table th:last-child {
  border-top-right-radius: 6px;
}

.template-table tbody tr {
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.template-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.52);
  box-shadow: 0 5px 16px rgba(185, 197, 222, 0.18);
}

.template-name {
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

.action.disable {
  color: #ffad2f;
}

.action.delete {
  color: #ff4d4f;
}

.template-table th:nth-child(1),
.template-table td:nth-child(1) {
  width: 38%;
}

.template-table th:nth-child(2),
.template-table td:nth-child(2) {
  width: 14%;
}

.template-table th:nth-child(3),
.template-table td:nth-child(3),
.template-table th:nth-child(4),
.template-table td:nth-child(4) {
  width: 16%;
}

.template-table th:nth-child(5),
.template-table td:nth-child(5) {
  width: 12%;
}

.template-table th:nth-child(6),
.template-table td:nth-child(6) {
  width: 12%;
}

@media (max-height: 820px) and (min-width: 901px) {
  .table-wrap {
    min-height: 330px;
  }

  .template-table th,
  .template-table td {
    height: 44px;
    padding: 0 24px;
  }

  .template-table th {
    height: 38px;
  }
}
</style>
