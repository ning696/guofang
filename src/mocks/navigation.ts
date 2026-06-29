export interface NavItem {
  label: string
  active?: boolean
  highlighted?: boolean
  icon: 'home' | 'supervision' | 'classroom' | 'evaluation' | 'data' | 'record'
  to?: string
  children?: NavItem[]
  expanded?: boolean
}

const baseNavItems: NavItem[] = [
  { label: '首页', icon: 'home', to: '/' },
  { label: '教学督导', icon: 'supervision', to: '/supervision' },
  { label: '教室巡课', icon: 'classroom' },
  {
    label: '评价系统',
    icon: 'evaluation',
    expanded: false,
    children: [
      { label: '模板管理', icon: 'record' },
      { label: '分类管理', icon: 'record' },
      { label: '指标管理', icon: 'record' },
      { label: '选项管理', icon: 'record' },
      { label: '评价报表', icon: 'data' },
      { label: '评价记录', icon: 'record' },
    ],
  },
  { label: '巡课记录', icon: 'classroom' },
  { label: '巡课数据', icon: 'data' },
  { label: '留言记录', icon: 'record' },
  { label: '教学回看', icon: 'supervision' },
]

const createNavItems = (activeLabel: string): NavItem[] =>
  baseNavItems.map((item) => ({
    ...item,
    active: item.label === activeLabel,
    children: item.children?.map((child) => ({ ...child })),
  }))

export const navItems = createNavItems('首页')

export const supervisionNavItems = createNavItems('教学督导')
