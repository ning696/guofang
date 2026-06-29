# Components

本目录按“复用层级”组织组件，方便后续继续从 MasterGo / 截图还原页面时精准复用。

## `base/`

基础视觉组件，不绑定具体页面业务，允许被多个页面复用。

- `AppIcon.vue`：项目内统一线性图标组件。通过 `name` 选择图标，适合导航、按钮、卡片里的小图标。
- `ClassroomCard.vue`：统一教室卡片组件，来源于 `mastergo/子组件/教室`，用于展示教室/楼宇名称。
- `GlassPanel.vue`：首页设计稿里反复出现的半透明白色圆角面板容器。只负责外壳，不放业务标题和内容。
- `PageBackground.vue`：统一页面背景组件，来源于 `mastergo/子组件/背景`。应放在应用根部，所有页面共用这一层背景。

## `layout/`

页面框架组件，负责系统级布局区域。可在同类后台页面复用，但通常不放具体业务卡片。

- `SidebarNav.vue`：左侧主导航，接收 `NavItem[]`。包含选中态、hover 标记态和移动端横向滚动导航。
- `TopBar.vue`：顶部标题和用户工具区。包含消息、头像、角色、退出等固定头部元素。

## `home/`

首页业务组件，只服务当前首页或同类型首页。复用前应确认文案、数据结构和视觉尺寸是否一致。

- `ClassroomGrid.vue`：教室巡课面板，负责标题、6 列卡片网格和滚动条装饰。
- `RecentPatrol.vue`：最近巡课面板，接收 `PatrolRecord[]`。
- `SupervisionPanel.vue`：教学督导快捷入口面板，接收 `SupervisionAction[]`。
- `StatsPanel.vue`：底部统计面板，负责三列统计卡布局。
- `StatCard.vue`：单个统计卡片，接收 `StatCard` 数据。

## 数据位置

首页 mock 数据和类型暂放在 `src/mocks/home.ts`。如果后续多个页面复用这些类型，建议把类型拆到 `src/types/home.ts` 或按模块放到 `src/types/`。

## 新组件放置规则

- 多页面可复用的纯 UI：放 `base/`。
- 系统骨架、导航、顶部栏、侧栏：放 `layout/`。
- 只属于某个页面的业务模块：放对应页面目录，例如 `home/`。
- 默认模板、临时调试、一次性截图辅助组件：不要留在 `components/` 根目录。
