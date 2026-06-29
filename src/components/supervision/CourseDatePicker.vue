<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import dateIcon from '../../assets/教学督导/课程日期.svg'

interface CalendarDay {
  key: string
  label: number
  value: string
  inCurrentMonth: boolean
  isSelected: boolean
}

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
const pickerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const viewDate = ref(getMonthStart(parseDate(props.modelValue) ?? new Date()))

const displayValue = computed(() => props.modelValue)
const monthLabel = computed(
  () => `${viewDate.value.getFullYear()}年 ${viewDate.value.getMonth() + 1}月`,
)

const calendarDays = computed<CalendarDay[]>(() => {
  const year = viewDate.value.getFullYear()
  const month = viewDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const firstWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7
  const startDate = new Date(year, month, 1 - firstWeekday)

  return Array.from({ length: cellCount }, (_, index) => {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + index)

    const value = formatDate(day)

    return {
      key: value,
      label: day.getDate(),
      value,
      inCurrentMonth: day.getMonth() === month,
      isSelected: value === props.modelValue,
    }
  })
})

watch(
  () => props.modelValue,
  (value) => {
    const nextDate = parseDate(value)

    if (nextDate) {
      viewDate.value = getMonthStart(nextDate)
    }
  },
)

const togglePicker = () => {
  isOpen.value = !isOpen.value
}

const closePicker = () => {
  isOpen.value = false
}

const changeMonth = (offset: number) => {
  viewDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + offset, 1)
}

const selectDate = (value: string) => {
  emit('update:modelValue', value)
  closePicker()
}

const handleDocumentPointerDown = (event: PointerEvent) => {
  if (!pickerRef.value?.contains(event.target as Node)) {
    closePicker()
  }
}

onMounted(() => {
  document.addEventListener('pointerdown', handleDocumentPointerDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', handleDocumentPointerDown)
})

function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    return null
  }

  const year = Number(match[1])
  const month = Number(match[2]) - 1
  const day = Number(match[3])
  const date = new Date(year, month, day)

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null
  }

  return date
}

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
</script>

<template>
  <div ref="pickerRef" class="date-picker">
    <button
      class="date-trigger"
      :class="{ active: isOpen }"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      aria-label="课程日期"
      @click="togglePicker"
    >
      <img class="date-icon" :src="dateIcon" alt="" aria-hidden="true" />
      <span class="date-value" :class="{ placeholder: !displayValue }">
        {{ displayValue || '请选择' }}
      </span>
    </button>

    <div v-if="isOpen" class="date-panel" role="dialog" aria-label="课程日期选择">
      <div class="date-panel-head">
        <button class="nav-button nav-double prev" type="button" aria-label="上一年" @click="changeMonth(-12)">
          <span></span>
          <span></span>
        </button>
        <button class="nav-button prev" type="button" aria-label="上一月" @click="changeMonth(-1)">
          <span></span>
        </button>
        <strong>{{ monthLabel }}</strong>
        <button class="nav-button next" type="button" aria-label="下一月" @click="changeMonth(1)">
          <span></span>
        </button>
        <button class="nav-button nav-double next" type="button" aria-label="下一年" @click="changeMonth(12)">
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="week-grid" aria-hidden="true">
        <span v-for="day in weekDays" :key="day">{{ day }}</span>
      </div>

      <div class="day-grid">
        <button
          v-for="day in calendarDays"
          :key="day.key"
          class="day-cell"
          :class="{ muted: !day.inCurrentMonth, selected: day.isSelected }"
          type="button"
          @click="selectDate(day.value)"
        >
          {{ day.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.date-picker {
  position: relative;
  z-index: 25;
  width: 240px;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.date-trigger {
  display: flex;
  align-items: center;
  width: 240px;
  height: 36px;
  padding: 0 16px 0 44px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
  background: #fff;
  color: #191c1e;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
}

.date-trigger:hover,
.date-trigger:focus-visible,
.date-trigger.active {
  border-color: #1947ff;
}

.date-trigger:focus-visible {
  box-shadow: 0 0 0 3px rgba(25, 71, 255, 0.16);
}

.date-icon {
  position: absolute;
  top: 8px;
  left: 14px;
  width: 20px;
  height: 20px;
  display: block;
  pointer-events: none;
}

.date-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date-value.placeholder {
  color: #99a0ac;
}

.date-panel {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 40;
  width: min(324px, calc(100vw - 32px));
  padding: 0 28px 22px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 12px 30px rgba(190, 198, 223, 0.34);
  box-sizing: border-box;
}

.date-panel-head {
  display: grid;
  grid-template-columns: 24px 24px 1fr 24px 24px;
  align-items: center;
  column-gap: 0;
  height: 45px;
  border-bottom: 1px solid rgba(229, 231, 235, 0.62);
}

.date-panel-head strong {
  color: #303133;
  font: 600 16px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: center;
}

.nav-button {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.nav-button span {
  width: 8px;
  height: 8px;
  border-top: 1.5px solid #c4c7cf;
  border-left: 1.5px solid #c4c7cf;
  box-sizing: border-box;
}

.nav-button.prev span {
  transform: rotate(-45deg);
}

.nav-button.next span {
  transform: rotate(135deg);
}

.nav-double {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.nav-double.prev span + span {
  margin-left: -4px;
}

.nav-double.next span + span {
  margin-left: -4px;
}

.nav-button:hover span,
.nav-button:focus-visible span {
  border-color: #1947ff;
}

.nav-button:focus-visible {
  outline: 1px solid #1947ff;
  outline-offset: -2px;
  border-radius: 4px;
}

.week-grid,
.day-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.week-grid {
  padding-top: 20px;
}

.week-grid span {
  height: 24px;
  color: #303133;
  font: 500 16px/24px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: center;
}

.day-grid {
  row-gap: 5px;
  padding-top: 8px;
}

.day-cell {
  justify-self: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  background: transparent;
  color: #6f737c;
  font: 400 16px/24px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: center;
  cursor: pointer;
  box-sizing: border-box;
}

.day-cell.muted {
  color: #c9c9c9;
}

.day-cell:hover,
.day-cell:focus-visible {
  border-color: #1947ff;
  color: #1947ff;
  outline: none;
}

.day-cell.selected {
  border-color: #1947ff;
  background: #1947ff;
  color: #fff;
}

.day-cell.selected:hover,
.day-cell.selected:focus-visible {
  color: #fff;
}

@media (max-height: 820px) and (min-width: 901px) {
  .date-trigger {
    height: 34px;
  }

  .date-icon {
    top: 10px;
  }
}

@media (max-width: 620px) {
  .date-picker,
  .date-trigger {
    width: 100%;
  }

  .date-panel {
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
