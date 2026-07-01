<script setup lang="ts">
import { computed, ref } from 'vue'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import SupervisionPagination from '../components/supervision/SupervisionPagination.vue'
import TemplateCreateForm from '../components/template-management/TemplateCreateForm.vue'
import TemplateFilters from '../components/template-management/TemplateFilters.vue'
import TemplateTable from '../components/template-management/TemplateTable.vue'
import {
  evaluationTemplates,
  templateCategoryOptions,
} from '../mocks/templateManagement'
import { templateManagementNavItems } from '../mocks/navigation'

const activeView = ref<'list' | 'create'>('list')
const currentPage = ref(1)
const pageSize = ref(10)
const selectedCategory = ref('')
const keyword = ref('')
const committedCategory = ref('')
const committedKeyword = ref('')
const visibleRowCount = 3

const filteredTemplates = computed(() => {
  const normalizedKeyword = committedKeyword.value.trim()

  return evaluationTemplates.filter((template) => {
    const matchesCategory = committedCategory.value
      ? template.category === committedCategory.value
      : true
    const matchesKeyword = normalizedKeyword ? template.name.includes(normalizedKeyword) : true

    return matchesCategory && matchesKeyword
  })
})

const paginatedTemplates = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value

  return filteredTemplates.value.slice(start, start + pageSize.value).slice(0, visibleRowCount)
})

const applyFilters = () => {
  committedCategory.value = selectedCategory.value
  committedKeyword.value = keyword.value
  currentPage.value = 1
}

const resetFilters = () => {
  selectedCategory.value = ''
  keyword.value = ''
  committedCategory.value = ''
  committedKeyword.value = ''
  currentPage.value = 1
}

const setPageSize = (value: number) => {
  pageSize.value = value
  currentPage.value = 1
}

const showCreateView = () => {
  activeView.value = 'create'
}

const showListView = () => {
  activeView.value = 'list'
}
</script>

<template>
  <div class="template-management-page">
    <SidebarNav :items="templateManagementNavItems" />
    <TopBar />

    <main class="template-main">
      <section class="template-panel" :class="{ 'create-panel': activeView === 'create' }">
        <template v-if="activeView === 'list'">
          <h1>模板管理</h1>

          <TemplateFilters
            v-model:selected-category="selectedCategory"
            v-model:keyword="keyword"
            :categories="templateCategoryOptions"
            @create="showCreateView"
            @search="applyFilters"
            @reset="resetFilters"
          />

          <TemplateTable :templates="paginatedTemplates" />

          <SupervisionPagination
            class="template-pagination"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="filteredTemplates.length"
            @update:current-page="currentPage = $event"
            @update:page-size="setPageSize"
          />
        </template>

        <TemplateCreateForm
          v-else
          :categories="templateCategoryOptions"
          @back="showListView"
          @publish="showListView"
        />
      </section>
    </main>
  </div>
</template>

<style scoped>
.template-management-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.template-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  min-height: 100svh;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  box-sizing: border-box;
}

.template-panel {
  display: flex;
  flex-direction: column;
  min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
  padding: 26px 30px 24px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}

.template-panel.create-panel {
  padding-top: 24px;
}

h1 {
  margin: 0 0 18px;
  color: #191c1e;
  font: 600 20px/28px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.template-panel :deep(.template-filters) {
  margin-bottom: 18px;
}

.template-pagination {
  margin-top: auto;
}

@media (max-height: 820px) and (min-width: 901px) {
  .template-main {
    --panel-bottom-gap: 8px;
  }

  .template-panel {
    padding: 18px 24px 16px;
  }

  .template-panel.create-panel {
    padding-top: 18px;
  }

  h1 {
    margin-bottom: 14px;
  }
}

@media (max-width: 900px) {
  .template-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .template-panel {
    min-height: 0;
    padding: 20px 16px 22px;
  }
}
</style>