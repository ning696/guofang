# guofang

基于 Vue 3、TypeScript 和 Vite 构建的前端项目，当前主要实现课堂巡课、教学督导、课表视图等页面原型。项目使用组件化方式组织页面结构，页面数据暂时来自本地 mock 文件，适合继续对接后端接口或还原设计稿页面。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Vue Router
- vue-tsc

## 功能模块

- 首页概览：课堂巡课入口、最近巡课记录、统计卡片、教学督导快捷入口。
- 教学督导：课程列表、状态筛选、分页、课表视图、课程状态展示。
- 公共布局：顶部栏、侧边导航、统一页面背景和基础视觉组件。
- 本地数据：通过 `src/mocks` 提供页面演示数据。

## 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

启动后根据终端提示访问本地地址，通常为：

```text
http://localhost:5173
```

### 生产构建

```bash
npm run build
```

构建产物会输出到 `dist` 目录。

### 本地预览构建结果

```bash
npm run preview
```

## 项目结构

```text
guofang/
├─ public/                  # 静态资源
├─ src/
│  ├─ assets/               # 图片、SVG 等页面资源
│  ├─ components/           # 通用组件和业务组件
│  │  ├─ base/              # 基础视觉组件
│  │  ├─ home/              # 首页相关组件
│  │  ├─ layout/            # 页面布局组件
│  │  └─ supervision/       # 教学督导相关组件
│  ├─ mocks/                # 本地 mock 数据
│  ├─ router/               # 路由配置
│  ├─ views/                # 页面级组件
│  ├─ App.vue               # 应用根组件
│  ├─ main.ts               # 应用入口
│  └─ style.css             # 全局样式
├─ index.html
├─ package.json
└─ vite.config.ts
```

## 路由说明

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | `HomePage.vue` | 首页概览 |
| `/supervision` | `SupervisionPage.vue` | 教学督导页面 |

## 开发说明

- 新增通用基础组件时，优先放在 `src/components/base`。
- 新增页面布局相关组件时，放在 `src/components/layout`。
- 只服务于某个页面的业务组件，放在对应业务目录，例如 `home` 或 `supervision`。
- 页面演示数据集中放在 `src/mocks`，后续接入接口时可以逐步替换为 API 请求。
- 图片和设计还原资源放在 `src/assets`，建议按业务模块继续分目录管理。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查并构建生产包 |
| `npm run preview` | 预览生产构建结果 |

## 备注

当前项目仍处于前端页面搭建阶段，部分中文 mock 数据可能来自设计稿导出或编码转换结果。正式接入后端接口前，建议先统一校对文案、字段命名和接口数据结构。
