<script setup lang="ts">
import CourseStatusBadge from './CourseStatusBadge.vue'
import type { SupervisionCourse } from '../../mocks/supervision'

defineProps<{
  courses: SupervisionCourse[]
}>()
</script>

<template>
  <div class="table-wrap">
    <table class="course-table">
      <thead>
        <tr>
          <th>课程</th>
          <th>教室</th>
          <th>教室类型</th>
          <th>学院</th>
          <th>教员</th>
          <th>课程日期</th>
          <th>课程时间</th>
          <th>课程状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in courses" :key="course.id">
          <td class="course-name">{{ course.course }}</td>
          <td>{{ course.room }}</td>
          <td>{{ course.roomType }}</td>
          <td>{{ course.college }}</td>
          <td>{{ course.teacher }}</td>
          <td>{{ course.date }}</td>
          <td>{{ course.time }}</td>
          <td class="status-cell">
            <CourseStatusBadge :status="course.status" />
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
  min-height: 560px;
  overflow-x: auto;
}

.course-table {
  width: 100%;
  height: 100%;
  min-width: 1180px;
  border-collapse: collapse;
  table-layout: fixed;
  color: rgba(0, 0, 0, 0.88);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.course-table th,
.course-table td {
  height: 62px;
  padding: 0 30px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.95);
  box-sizing: border-box;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
}

.course-table th {
  height: 44px;
  background: rgba(255, 255, 255, 0.6);
  font-weight: 500;
}

.course-table th:first-child {
  border-top-left-radius: 8px;
}

.course-table th:last-child {
  border-top-right-radius: 8px;
}

.course-table tbody tr {
  transition: background 0.2s ease;
}

.course-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 8px rgba(190, 198, 223, 0.4);
}

.course-name {
  overflow: hidden;
  text-overflow: ellipsis;
}

.status-cell {
  text-align: center;
}

.course-table th:nth-child(1),
.course-table td:nth-child(1) {
  width: 28%;
}

.course-table th:nth-child(2),
.course-table td:nth-child(2) {
  width: 15%;
}

.course-table th:nth-child(3),
.course-table td:nth-child(3) {
  width: 11%;
}

.course-table th:nth-child(4),
.course-table td:nth-child(4) {
  width: 14%;
}

.course-table th:nth-child(5),
.course-table td:nth-child(5) {
  width: 12%;
}

.course-table th:nth-child(6),
.course-table td:nth-child(6) {
  width: 10%;
}

.course-table th:nth-child(7),
.course-table td:nth-child(7) {
  width: 10%;
}

.course-table th:nth-child(8),
.course-table td:nth-child(8) {
  width: 10%;
}

@media (max-height: 820px) and (min-width: 901px) {
  .table-wrap {
    min-height: 500px;
  }

  .course-table th,
  .course-table td {
    height: 58px;
    padding: 0 24px;
  }

  .course-table th {
    height: 40px;
  }
}
</style>
