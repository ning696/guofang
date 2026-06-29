<script setup lang="ts">
import { ref } from 'vue'
import searchIcon from '../../assets/教学督导/搜索.svg'
import resetIcon from '../../assets/教学督导/重置.svg'
import CourseDatePicker from './CourseDatePicker.vue'
import type { SelectOption } from '../../mocks/supervision'

defineProps<{
  courseTimeOptions: SelectOption[]
  courseTypeOptions: SelectOption[]
  selectedDate: string
}>()

const emit = defineEmits<{
  'update:selectedDate': [value: string]
}>()

const selectedCourseTime = ref('第二节')
const hoveredCourseTime = ref('第三节')
const isCourseTimeOpen = ref(false)

const selectCourseTime = (option: SelectOption) => {
  selectedCourseTime.value = option.label
  hoveredCourseTime.value = option.label
  isCourseTimeOpen.value = false
}

const toggleCourseTime = () => {
  isCourseTimeOpen.value = !isCourseTimeOpen.value

  if (isCourseTimeOpen.value) {
    hoveredCourseTime.value = '第三节'
  }
}

const setSelectedDate = (value: string) => {
  emit('update:selectedDate', value)
}

const resetFilters = () => {
  setSelectedDate('')
}
</script>

<template>
  <form class="filters" @submit.prevent @reset="resetFilters">
    <div class="field time-select-field">
      <span>课程时间</span>
      <div class="time-select-control">
        <button
          class="time-select-trigger"
          :class="{ active: isCourseTimeOpen }"
          type="button"
          :aria-expanded="isCourseTimeOpen"
          aria-label="课程时间"
          @click="toggleCourseTime"
        >
          <span>{{ selectedCourseTime }}</span>
          <span class="time-select-chevron" aria-hidden="true"></span>
        </button>

        <div v-if="isCourseTimeOpen" class="time-select-menu">
          <button
            v-for="option in courseTimeOptions"
            :key="option.value || option.label"
            class="time-select-option"
            :class="{ 'is-highlighted': hoveredCourseTime === option.label }"
            type="button"
            @mouseenter="hoveredCourseTime = option.label"
            @focus="hoveredCourseTime = option.label"
            @click="selectCourseTime(option)"
          >
            {{ option.label }}
          </button>
        </div>
      </div>
    </div>

    <label class="field select-field">
      <span>课程类型</span>
      <select aria-label="课程类型">
        <option
          v-for="option in courseTypeOptions"
          :key="option.value || option.label"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </label>

    <div class="field date-field">
      <span>课程日期</span>
      <CourseDatePicker :model-value="selectedDate" @update:model-value="setSelectedDate" />
    </div>

    <label class="keyword-field">
      <input aria-label="关键词" placeholder="请输入课程、教室、学院、教员名称" type="text" />
    </label>

    <button class="search-button" type="submit">
      <img class="button-icon" :src="searchIcon" alt="" aria-hidden="true" />
      <span>搜索</span>
    </button>
    <button class="reset-button" type="reset">
      <img class="button-icon" :src="resetIcon" alt="" aria-hidden="true" />
      <span>重置</span>
    </button>
  </form>
</template>

<style scoped>
.filters {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 2px 10px;
  border-top: 1px solid rgba(229, 231, 235, 0.9);
  box-sizing: border-box;
}

.field {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 0 0 auto;
  color: #191c1e;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.field > span:first-child {
  white-space: nowrap;
}

select,
.time-select-trigger {
  height: 36px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  color: #191c1e;
  background: #fff;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

.time-select-field {
  position: relative;
  z-index: 20;
}

.time-select-control {
  position: relative;
  width: 160px;
}

.time-select-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 160px;
  padding: 0 16px 0 14px;
  color: #191c1e;
  cursor: pointer;
}

.time-select-trigger:hover,
.time-select-trigger:focus-visible,
.time-select-trigger.active {
  border-color: #1947ff;
}

.time-select-trigger:focus-visible {
  box-shadow: 0 0 0 2px rgba(25, 71, 255, 0.1);
}

.time-select-chevron {
  width: 8px;
  height: 8px;
  border-right: 1.6px solid #99a0ac;
  border-bottom: 1.6px solid #99a0ac;
  transform: translateY(-2px) rotate(45deg);
}

.time-select-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 30;
  width: 160px;
  height: 212px;
  padding: 16px 8px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 10px 30px 0 rgba(190, 198, 223, 0.4);
  box-sizing: border-box;
}

.time-select-option {
  display: flex;
  align-items: center;
  width: 144px;
  height: 36px;
  padding: 0 16px;
  border: 0;
  border-radius: 8px;
  color: #000;
  background: transparent;
  text-align: left;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  box-sizing: border-box;
}

.time-select-option.is-highlighted,
.time-select-option:hover,
.time-select-option:focus-visible {
  color: #1947ff;
  background: #f5f6fa;
  font-weight: 500;
  outline: none;
}

select {
  width: 160px;
  padding: 0 38px 0 14px;
  color: #99a0ac;
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, #99a0ac 50%),
    linear-gradient(135deg, #99a0ac 50%, transparent 50%);
  background-position:
    calc(100% - 19px) 15px,
    calc(100% - 14px) 15px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.keyword-field input::placeholder {
  color: #99a0ac;
}

.keyword-field {
  flex: 0 0 250px;
  width: 250px;
  min-width: 250px;
  max-width: 250px;
}

.keyword-field input {
  width: 100%;
  height: 36px;
  padding: 0 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  color: #191c1e;
  background: #fff;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

.keyword-field input:hover,
.keyword-field input:focus {
  border-color: #1947ff;
}

.keyword-field input:focus {
  box-shadow: 0 0 0 1px rgba(25, 71, 255, 0.08);
}

.search-button,
.reset-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 0 0 auto;
  width: 82px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid transparent;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  box-sizing: border-box;
}

.search-button {
  border-radius: 8px;
  color: #fff;
  background: #1947ff;
}

.search-button:hover {
  opacity: 0.9;
  border-radius: 8px;
  background: #1947ff;
}

.search-button:active {
  opacity: 1;
  border-radius: 8px;
  background: #0f3df4;
}

.reset-button {
  color: #000;
  background: #fff;
  border-color: #e5e7eb;
}

.button-icon {
  width: 16px;
  height: 16px;
  display: block;
}

@media (max-height: 820px) and (min-width: 901px) {
  .filters {
    padding: 6px 2px 8px;
  }

  select,
  .keyword-field input,
  .time-select-trigger,
  .search-button,
  .reset-button {
    height: 34px;
  }

  select {
    background-position:
      calc(100% - 19px) 14px,
      calc(100% - 14px) 14px;
  }
}

@media (max-width: 1500px) {
  .filters {
    flex-wrap: wrap;
  }
}

@media (max-width: 620px) {
  .filters,
  .field {
    align-items: stretch;
  }

  .field,
  .keyword-field,
  .time-select-control,
  .time-select-trigger,
  .time-select-menu,
  select {
    width: 100%;
  }

  .keyword-field {
    flex: 1 1 100%;
    width: 100%;
    min-width: 0;
    max-width: none;
  }

  .field {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
