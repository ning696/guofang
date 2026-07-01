<script setup lang="ts">
import { computed, ref } from 'vue'
import CategoryCreateModal from '../components/category-management/CategoryCreateModal.vue'
import CategoryFilters from '../components/category-management/CategoryFilters.vue'
import CategoryTable from '../components/category-management/CategoryTable.vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import SupervisionPagination from '../components/supervision/SupervisionPagination.vue'
import {
  evaluationCategories,
  type EvaluationCategory,
} from '../mocks/categoryManagement'
import { categoryManagementNavItems } from '../mocks/navigation'

const categories = ref<EvaluationCategory[]>(evaluationCategories.map((category) => ({ ...category })))
const currentPage = ref(1)
const pageSize = ref(10)
const keyword = ref('')
const committedKeyword = ref('')
const showCreateModal = ref(false)
const visibleRowCount = 3

const filteredCategories = computed(() => {
  const normalizedKeyword = committedKeyword.value.trim()

  return categories.value.filter((category) =>
    normalizedKeyword ? category.name.includes(normalizedKeyword) : true,
  )
})

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value

  return filteredCategories.value.slice(start, start + pageSize.value).slice(0, visibleRowCount)
})

const applyFilters = () => {
  committedKeyword.value = keyword.value
  currentPage.value = 1
}

const resetFilters = () => {
  keyword.value = ''
  committedKeyword.value = ''
  currentPage.value = 1
}

const setPageSize = (value: number) => {
  pageSize.value = value
  currentPage.value = 1
}

const toggleStatus = (id: number) => {
  categories.value = categories.value.map((category) => {
    if (category.id !== id) {
      return category
    }

    return {
      ...category,
      status: category.status === 'enabled' ? 'disabled' : 'enabled',
      updatedAt: '2026-04-14 17:05',
    }
  })
}

const showCreateForm = () => {
  showCreateModal.value = true
}

const closeCreateForm = () => {
  showCreateModal.value = false
}

const addCategory = (value: { name: string; userGroup: string; status: EvaluationCategory['status'] }) => {
  const nextId = Math.max(...categories.value.map((category) => category.id)) + 1

  categories.value = [
    {
      id: nextId,
      name: value.name || '新增分类',
      userGroup: value.userGroup || '督导组',
      createdAt: '2026-04-14 17:05',
      updatedAt: '--',
      status: value.status,
    },
    ...categories.value,
  ]
  committedKeyword.value = ''
  keyword.value = ''
  currentPage.value = 1
  closeCreateForm()
}
</script>

<template>
  <div class="category-management-page">
    <SidebarNav :items="categoryManagementNavItems" />
    <TopBar />

    <main class="category-main">
      <section class="category-panel">
        <h1>分类管理</h1>

        <CategoryFilters
          v-model:keyword="keyword"
          @create="showCreateForm"
          @search="applyFilters"
          @reset="resetFilters"
        />

        <CategoryTable :categories="paginatedCategories" @toggle-status="toggleStatus" />

        <SupervisionPagination
          class="category-pagination"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="filteredCategories.length"
          @update:current-page="currentPage = $event"
          @update:page-size="setPageSize"
        />
      </section>
    </main>

    <CategoryCreateModal
      :visible="showCreateModal"
      @cancel="closeCreateForm"
      @confirm="addCategory"
    />
  </div>
</template>

<style scoped>
.category-management-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.category-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  min-height: 100svh;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  box-sizing: border-box;
}

.category-panel {
  display: flex;
  flex-direction: column;
  min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
  padding: 26px 30px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}

h1 {
  margin: 0 0 18px;
  color: #191c1e;
  font: 600 20px/28px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.category-panel :deep(.category-filters) {
  margin-bottom: 18px;
}

.category-pagination {
  margin-top: auto;
}

@media (max-height: 820px) and (min-width: 901px) {
  .category-main {
    --panel-bottom-gap: 8px;
  }

  .category-panel {
    padding: 18px 24px 16px;
  }

  h1 {
    margin-bottom: 14px;
  }
}

@media (max-width: 900px) {
  .category-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .category-panel {
    min-height: 0;
    padding: 20px 16px 22px;
  }
}
</style>
