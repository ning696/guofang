<script setup lang="ts">
import { computed, ref } from 'vue'
import IndicatorCreateModal from '../components/indicator-management/IndicatorCreateModal.vue'
import IndicatorFilters from '../components/indicator-management/IndicatorFilters.vue'
import IndicatorTable from '../components/indicator-management/IndicatorTable.vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import SupervisionPagination from '../components/supervision/SupervisionPagination.vue'
import {
  evaluationIndicators,
  type EvaluationIndicator,
} from '../mocks/indicatorManagement'
import { indicatorManagementNavItems } from '../mocks/navigation'

const indicators = ref<EvaluationIndicator[]>(evaluationIndicators.map((indicator) => ({ ...indicator })))
const currentPage = ref(1)
const pageSize = ref(10)
const keyword = ref('')
const committedKeyword = ref('')
const showCreateModal = ref(false)
const visibleRowCount = 3

const filteredIndicators = computed(() => {
  const normalizedKeyword = committedKeyword.value.trim()

  return indicators.value.filter((indicator) =>
    normalizedKeyword ? indicator.name.includes(normalizedKeyword) : true,
  )
})

const paginatedIndicators = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value

  return filteredIndicators.value.slice(start, start + pageSize.value).slice(0, visibleRowCount)
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
  indicators.value = indicators.value.map((indicator) => {
    if (indicator.id !== id) {
      return indicator
    }

    return {
      ...indicator,
      status: indicator.status === 'enabled' ? 'disabled' : 'enabled',
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

const addIndicator = (value: { name: string; status: EvaluationIndicator['status'] }) => {
  const nextId = Math.max(...indicators.value.map((indicator) => indicator.id)) + 1

  indicators.value = [
    {
      id: nextId,
      name: value.name || '新增指标',
      createdAt: '2026-04-14 17:05',
      updatedAt: '--',
      status: value.status,
    },
    ...indicators.value,
  ]
  committedKeyword.value = ''
  keyword.value = ''
  currentPage.value = 1
  closeCreateForm()
}
</script>

<template>
  <div class="indicator-management-page">
    <SidebarNav :items="indicatorManagementNavItems" />
    <TopBar />

    <main class="indicator-main">
      <section class="indicator-panel">
        <h1>指标管理</h1>

        <IndicatorFilters
          v-model:keyword="keyword"
          @create="showCreateForm"
          @search="applyFilters"
          @reset="resetFilters"
        />

        <IndicatorTable :indicators="paginatedIndicators" @toggle-status="toggleStatus" />

        <SupervisionPagination
          class="indicator-pagination"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="filteredIndicators.length"
          @update:current-page="currentPage = $event"
          @update:page-size="setPageSize"
        />
      </section>
    </main>

    <IndicatorCreateModal
      :visible="showCreateModal"
      @cancel="closeCreateForm"
      @confirm="addIndicator"
    />
  </div>
</template>

<style scoped>
.indicator-management-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.indicator-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  min-height: 100svh;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  box-sizing: border-box;
}

.indicator-panel {
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

.indicator-panel :deep(.indicator-filters) {
  margin-bottom: 18px;
}

.indicator-pagination {
  margin-top: auto;
}

@media (max-height: 820px) and (min-width: 901px) {
  .indicator-main {
    --panel-bottom-gap: 8px;
  }

  .indicator-panel {
    padding: 18px 24px 16px;
  }

  h1 {
    margin-bottom: 14px;
  }
}

@media (max-width: 900px) {
  .indicator-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .indicator-panel {
    min-height: 0;
    padding: 20px 16px 22px;
  }
}
</style>
