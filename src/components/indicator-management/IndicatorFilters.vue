<script setup lang="ts">
import searchIcon from '../../assets/教学督导/搜索.svg'
import resetIcon from '../../assets/教学督导/重置.svg'

defineProps<{
  keyword: string
}>()

const emit = defineEmits<{
  'update:keyword': [value: string]
  create: []
  search: []
  reset: []
}>()

const updateKeyword = (event: Event) => {
  emit('update:keyword', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <form class="indicator-filters" @submit.prevent="emit('search')" @reset.prevent="emit('reset')">
    <button class="create-button" type="button" @click="emit('create')">
      <span class="plus">+</span>
      <span>新增</span>
    </button>

    <label class="filter-field name-field">
      <input
        :value="keyword"
        type="search"
        aria-label="指标名称"
        placeholder="请输入指标名称"
        @input="updateKeyword"
      />
    </label>

    <button class="search-button" type="submit">
      <img :src="searchIcon" alt="" aria-hidden="true" />
      <span>搜索</span>
    </button>

    <button class="reset-button" type="reset">
      <img :src="resetIcon" alt="" aria-hidden="true" />
      <span>重置</span>
    </button>
  </form>
</template>

<style scoped>
.indicator-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.create-button,
.search-button,
.reset-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border-radius: 6px;
  border: 1px solid transparent;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
  box-sizing: border-box;
}

.create-button {
  gap: 6px;
  width: 86px;
  color: #fff;
  background: #1947ff;
  box-shadow: 0 4px 10px rgba(25, 71, 255, 0.16);
}

.plus {
  font-size: 18px;
  line-height: 18px;
  transform: translateY(-1px);
}

.filter-field {
  display: inline-flex;
  align-items: center;
  min-width: 0;
}

input {
  width: 260px;
  height: 36px;
  padding: 0 14px;
  border: 1px solid #e6eaf1;
  border-radius: 6px;
  outline: none;
  color: #1f2630;
  background: rgba(255, 255, 255, 0.82);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

input::placeholder {
  color: #a9b1c0;
}

input:hover,
input:focus-visible {
  border-color: #1947ff;
}

.search-button {
  gap: 6px;
  width: 74px;
  color: #fff;
  background: #1947ff;
  box-shadow: 0 4px 10px rgba(25, 71, 255, 0.16);
}

.reset-button {
  gap: 6px;
  width: 74px;
  color: #111827;
  border-color: #e6eaf1;
  background: rgba(255, 255, 255, 0.86);
}

.search-button img,
.reset-button img {
  width: 16px;
  height: 16px;
  display: block;
}

@media (max-width: 760px) {
  .indicator-filters {
    flex-wrap: wrap;
  }
}

@media (max-width: 560px) {
  .create-button,
  .filter-field,
  .name-field,
  input,
  .search-button,
  .reset-button {
    width: 100%;
  }
}
</style>
