<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppIcon from '../base/AppIcon.vue'
import logoUrl from '../../assets/logo.png'
import type { NavItem } from '../../mocks/navigation'

const props = defineProps<{
  items: NavItem[]
}>()

const defaultRouteByLabel: Partial<Record<string, string>> = {
  首页: '/',
  教学督导: '/supervision',
}

const router = useRouter()
const expandedItems = ref<Set<string>>(new Set())

const toggleExpand = (label: string) => {
  if (expandedItems.value.has(label)) {
    expandedItems.value.delete(label)
  } else {
    expandedItems.value.add(label)
  }
}

const isExpanded = (label: string) => expandedItems.value.has(label)

const handleItemClick = (item: NavItem) => {
  if (item.children) {
    toggleExpand(item.label)
    return
  }

  const targetRoute = item.to ?? defaultRouteByLabel[item.label]

  if (targetRoute) {
    router.push(targetRoute)
  }
}
</script>

<template>
  <aside class="sidebar" aria-label="主导航">
    <div class="brand">
      <img class="brand-logo" :src="logoUrl" alt="logo" />
    </div>

    <nav class="nav-list">
      <template v-for="item in items" :key="item.label">
        <button
          class="nav-item"
          :class="{ active: item.active, highlighted: item.highlighted, 'has-children': item.children }"
          type="button"
          @click="handleItemClick(item)"
        >
          <span class="nav-indicator"></span>
          <AppIcon class="nav-icon" :name="item.icon" />
          <span class="nav-label">{{ item.label }}</span>
          <span v-if="item.children" class="expand-icon" :class="{ expanded: isExpanded(item.label) }">›</span>
          <span v-if="item.highlighted" class="hover-note">hover</span>
        </button>

        <template v-if="item.children && isExpanded(item.label)">
          <button
            v-for="child in item.children"
            :key="child.label"
            class="nav-item nav-item-child"
            :class="{ active: child.active }"
            type="button"
            @click="handleItemClick(child)"
          >
            <span class="nav-indicator"></span>
            <span class="nav-label">{{ child.label }}</span>
          </button>
        </template>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 10;
  width: 220px;
  padding: 16px 20px 24px;
  background: rgba(255, 255, 255, 0);
  box-sizing: border-box;
}

.brand {
  display: flex;
  align-items: center;
  width: 153px;
  height: 48px;
  margin: 4px 0 38px 8px;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.nav-list {
  display: grid;
  gap: 6px;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 180px;
  height: 44px;
  padding: 0 12px 0 20px;
  border: 0;
  border-radius: 0.5rem;
  color: #000;
  background: transparent;
  opacity: 1;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 0.88rem;
  font-weight: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  cursor: pointer;
  box-sizing: border-box;
  transition: opacity 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
}

.nav-item-child {
  padding-left: 40px;
  font-size: 0.81rem;
  color: rgba(0, 0, 0, 0.7);
}

.expand-icon {
  position: absolute;
  right: 12px;
  font-size: 18px;
  line-height: 1;
  transition: transform 0.2s ease;
  user-select: none;
}

.expand-icon.expanded {
  transform: rotate(-90deg);
}

.nav-item:hover {
  opacity: 0.9;
  color: #fff;
  background: #1947ff;
  box-shadow: 0 0.38rem 1rem rgba(0, 71, 255, 0.3);
}

.nav-item.active {
  opacity: 1;
  color: #fff;
  background: #0f3df4;
  box-shadow: 0 0.38rem 1rem rgba(0, 71, 255, 0.3);
}

.nav-item.highlighted {
  opacity: 0.9;
  background: #1947ff;
  box-shadow: 0 0.38rem 1rem rgba(0, 71, 255, 0.3);
}

.nav-indicator {
  position: absolute;
  left: 0;
  top: 10px;
  width: 2px;
  height: 24px;
  border-radius: 0 2px 2px 0;
  background: transparent;
}

.nav-item.active .nav-indicator {
  background: #fff;
}

.nav-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  margin-right: 12px;
}

.nav-label {
  white-space: nowrap;
}

.hover-note {
  position: absolute;
  top: 3px;
  right: 5px;
  color: #f00;
  font-size: 12px;
  line-height: 17px;
}

@media (max-width: 900px) {
  .sidebar {
    position: sticky;
    top: 0;
    width: 100%;
    height: auto;
    padding: 10px 12px;
    background: rgba(248, 249, 252, 0.94);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(105, 123, 169, 0.12);
  }

  .brand {
    display: none;
  }

  .nav-list {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .nav-item {
    width: auto;
    min-width: 104px;
    flex: 0 0 auto;
  }
}
</style>
