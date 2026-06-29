<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  pageSize: number
  total: number
}>()

const emit = defineEmits<{
  'update:currentPage': [value: number]
  'update:pageSize': [value: number]
}>()

const pageSizeOptions = [10, 20, 50]

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const visiblePages = computed<Array<number | 'ellipsis'>>(() => {
  const last = pageCount.value

  if (last <= 7) {
    return Array.from({ length: last }, (_, index) => index + 1)
  }

  if (props.currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', last]
  }

  if (props.currentPage >= last - 3) {
    return [1, 'ellipsis', last - 4, last - 3, last - 2, last - 1, last]
  }

  return [1, 'ellipsis', props.currentPage - 1, props.currentPage, props.currentPage + 1, 'ellipsis', last]
})

const goToPage = (page: number) => {
  const safePage = Math.min(Math.max(page, 1), pageCount.value)
  emit('update:currentPage', safePage)
}

const handlePageSizeChange = (event: Event) => {
  const value = Number((event.target as HTMLSelectElement).value)
  emit('update:pageSize', value)
}

const handleJump = (event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)

  if (Number.isFinite(value)) {
    goToPage(value)
  }
}
</script>

<template>
  <div class="pagination" aria-label="分页">
    <span class="total">共 {{ total }} 条</span>
    <span>每页</span>
    <label class="page-size">
      <select :value="pageSize" aria-label="每页条数" @change="handlePageSizeChange">
        <option v-for="option in pageSizeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      <span class="caret"></span>
    </label>
    <span>条</span>
    <button
      class="page-arrow"
      :class="{ disabled: currentPage === 1 }"
      type="button"
      aria-label="上一页"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    ></button>
    <template v-for="(page, index) in visiblePages" :key="`${page}-${index}`">
      <span v-if="page === 'ellipsis'" class="ellipsis">...</span>
      <button
        v-else
        class="page-number"
        :class="{ active: currentPage === page }"
        type="button"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>
    <button
      class="page-arrow next"
      :class="{ disabled: currentPage === pageCount }"
      type="button"
      aria-label="下一页"
      :disabled="currentPage === pageCount"
      @click="goToPage(currentPage + 1)"
    ></button>
    <span>前往</span>
    <input
      class="jump-input"
      aria-label="跳转页码"
      :value="currentPage"
      type="number"
      min="1"
      :max="pageCount"
      @change="handleJump"
    />
    <span>页</span>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 2px 0;
  color: #6f7682;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.total {
  margin-right: 4px;
}

button,
input,
select {
  height: 28px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.36);
  color: #6f7682;
  font: inherit;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: default;
}

.page-size {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 58px;
  height: 28px;
}

.page-size select {
  width: 100%;
  padding: 0 24px 0 10px;
  appearance: none;
  outline: none;
}

.caret {
  position: absolute;
  right: 9px;
  width: 0;
  height: 0;
  pointer-events: none;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #99a0ac;
}

.page-arrow {
  position: relative;
  width: 28px;
  flex: 0 0 28px;
}

.page-arrow::before {
  content: '';
  position: absolute;
  top: 9px;
  left: 11px;
  width: 8px;
  height: 8px;
  border-left: 1.8px solid currentColor;
  border-bottom: 1.8px solid currentColor;
  transform: rotate(45deg);
}

.page-arrow.next::before {
  left: 8px;
  transform: rotate(225deg);
}

.disabled {
  opacity: 0.45;
}

.page-number {
  min-width: 22px;
  height: 28px;
  padding: 0 4px;
  border-color: transparent;
  background: transparent;
}

.page-number.active {
  color: #1947ff;
}

.jump-input {
  width: 58px;
  padding: 0 8px;
  text-align: center;
}

@media (max-height: 820px) and (min-width: 901px) {
  .pagination {
    gap: 10px;
    padding-top: 8px;
  }

  button,
  input,
  select,
  .page-size {
    height: 26px;
  }

  .page-arrow,
  .page-number {
    height: 26px;
  }
}

@media (max-width: 760px) {
  .pagination {
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 16px;
  }
}
</style>
