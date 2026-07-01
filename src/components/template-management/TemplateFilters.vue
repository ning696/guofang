<script setup lang="ts">
import searchIcon from '../../assets/教学督导/搜索.svg'
import resetIcon from '../../assets/教学督导/重置.svg'
import type { TemplateCategoryOption } from '../../mocks/templateManagement'

defineProps<{
  categories: TemplateCategoryOption[]
  selectedCategory: string
  keyword: string
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: string]
  'update:keyword': [value: string]
  create: []
  search: []
  reset: []
}>()

const updateCategory = (event: Event) => {
  emit('update:selectedCategory', (event.target as HTMLSelectElement).value)
}

const updateKeyword = (event: Event) => {
  emit('update:keyword', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <form class="template-filters" @submit.prevent="emit('search')" @reset.prevent="emit('reset')">
    <button class="create-button" type="button" @click="emit('create')">
      <span class="plus">+</span>
      <span>新增</span>
    </button>

    <label class="filter-field category-field">
      <span class="field-label">所属分类</span>
      <span class="select-shell">
        <select :value="selectedCategory" aria-label="所属分类" @change="updateCategory">
          <option value="">请选择</option>
          <option v-for="category in categories" :key="category.value" :value="category.value">
            {{ category.label }}
          </option>
        </select>
      </span>
    </label>

    <label class="filter-field name-field">
      <input
        :value="keyword"
        type="search"
        aria-label="模板名称"
        placeholder="请输入模板名称"
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
.template-filters {
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
  gap: 8px;
  min-width: 0;
}

.field-label {
  color: #1f2630;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.select-shell {
  position: relative;
  display: inline-flex;
  width: 138px;
  height: 36px;
}

.select-shell::after {
  content: '';
  position: absolute;
  top: 15px;
  right: 13px;
  width: 7px;
  height: 7px;
  border-right: 1.5px solid #9aa3b2;
  border-bottom: 1.5px solid #9aa3b2;
  pointer-events: none;
  transform: rotate(45deg);
}

select,
input {
  height: 36px;
  border: 1px solid #e6eaf1;
  border-radius: 6px;
  outline: none;
  color: #1f2630;
  background: rgba(255, 255, 255, 0.82);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

select {
  width: 100%;
  padding: 0 34px 0 14px;
  appearance: none;
}

input {
  width: 260px;
  padding: 0 14px;
}

input::placeholder {
  color: #a9b1c0;
}

select:hover,
select:focus-visible,
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

@media (max-width: 980px) {
  .template-filters {
    flex-wrap: wrap;
  }
}

@media (max-width: 560px) {
  .create-button,
  .filter-field,
  .select-shell,
  .name-field,
  input,
  .search-button,
  .reset-button {
    width: 100%;
  }

  .filter-field {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }
}
</style>