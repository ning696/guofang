<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppIcon from '../base/AppIcon.vue'
import LogoutModal from '../base/LogoutModal.vue'
import mailIcon from '../../assets/邮件.svg'
import messageIcon from '../../assets/消息.svg'
import openedMailIcon from '../../assets/邮件以打开.svg'
import unopenedMailIcon from '../../assets/邮件未打开.svg'
import messageModalBg from '../../assets/弹窗背景.svg'
import switchIcon from '../../assets/管理员右侧的切换身份按钮.svg'
import avatarImage from '../../assets/默认头像.png'

const showLogoutModal = ref(false)
const messageTabs = ['消息', '待办', '已办'] as const
type MessageTab = (typeof messageTabs)[number]
type MessageItem = {
  id: number
  text: string
  unread: boolean
}

const activeMessageTab = ref<MessageTab>('消息')
const showMessagePanel = ref(false)
const showMessageDetail = ref(false)
const messageDetailBackgroundStyle = { backgroundImage: `url(${messageModalBg})` }

const messageItems: MessageItem[] = [
  { id: 1, text: '标题文字示例标题文字', unread: true },
  { id: 2, text: '标题文字示例标题文字示例标题...', unread: false },
  { id: 3, text: '标题文字示例', unread: false },
]

const toggleMessagePanel = () => {
  showMessagePanel.value = !showMessagePanel.value
}

const selectMessageTab = (tab: MessageTab) => {
  activeMessageTab.value = tab
}

const openMessageDetail = () => {
  showMessagePanel.value = false
  showMessageDetail.value = true
}

const closeMessagePanel = () => {
  showMessagePanel.value = false
}

const closeMessageDetail = () => {
  showMessageDetail.value = false
}

onMounted(() => {
  document.addEventListener('click', closeMessagePanel)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMessagePanel)
})

const handleLogout = () => {
  showLogoutModal.value = false
  // TODO: 实际退出登录逻辑（清除 token、跳转登录页等）
  console.log('退出登录')
}

const handleCancelLogout = () => {
  showLogoutModal.value = false
}
</script>

<template>
  <header class="topbar">
    <h1>教学巡视督导系统</h1>

    <div class="user-tools" aria-label="用户工具">
      <button class="circle-tool mail" type="button" aria-label="邮件">
        <img :src="mailIcon" alt="" class="tool-icon" />
        <span class="tool-tip feedback-tip">意见反馈</span>
      </button>
      <div class="message-menu" @click.stop>
        <button
          class="circle-tool message"
          type="button"
          aria-label="消息"
          :aria-expanded="showMessagePanel"
          @click="toggleMessagePanel"
        >
          <img :src="messageIcon" alt="" class="tool-icon" />
          <span class="message-badge"></span>
          <span v-if="!showMessagePanel" class="tool-tip dark-tip">消息</span>
        </button>

        <div v-if="showMessagePanel" class="message-popover">
          <div class="message-tabs" role="tablist" aria-label="消息分类">
            <button
              v-for="tab in messageTabs"
              :key="tab"
              class="message-tab"
              :class="{ active: tab === activeMessageTab }"
              type="button"
              role="tab"
              :aria-selected="tab === activeMessageTab"
              @click="selectMessageTab(tab)"
            >
              {{ tab }}
            </button>
          </div>

          <div class="message-popover-list">
            <button
              v-for="item in messageItems"
              :key="item.id"
              class="message-popover-item"
              :class="{ unread: item.unread }"
              type="button"
              @click="openMessageDetail"
            >
              <span class="message-popover-icon">
                <img :src="item.unread ? unopenedMailIcon : openedMailIcon" alt="" aria-hidden="true" />
                <span v-if="item.unread" class="message-popover-dot"></span>
              </span>
              <span class="message-popover-text">{{ item.text }}</span>
              <span v-if="item.unread" class="message-popover-more" aria-hidden="true">·</span>
            </button>
          </div>

          <button class="message-read-all" type="button">一键已读</button>
        </div>
      </div>
      <span class="divider"></span>
      <img class="avatar" :src="avatarImage" alt="用户头像" />
      <strong class="admin-name">admin</strong>
      <button class="role-button" type="button">
        管理员
        <img :src="switchIcon" alt="" class="switch-icon" />
      </button>
      <button class="logout" type="button" aria-label="退出" @click="showLogoutModal = true">
        <AppIcon name="logout" />
        <span class="tool-tip dark-tip logout-tip">退出登录</span>
      </button>
    </div>

    <Teleport to="body">
      <Transition name="message-detail-fade">
        <div v-if="showMessageDetail" class="message-detail-overlay" @click="closeMessageDetail">
          <section class="message-detail-card" :style="messageDetailBackgroundStyle" aria-label="消息详情" @click.stop>
            <header class="message-detail-header">
              <h2>消息详情</h2>
              <button class="message-detail-close" type="button" aria-label="关闭" @click="closeMessageDetail">×</button>
            </header>

            <div class="message-detail-body">
              <div class="message-detail-date">4月16日</div>
              <h3>关于标题文字示例通知</h3>
              <p>尊敬的用户：</p>
              <p>为统一平台服务体验，我们标题文字示例标题文字示例标题文字示例标题文字示例标题文字示例。</p>
              <p>此次变更内容如下：</p>
              <ol>
                <li>文字示例：文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例。</li>
                <li>文字示例：文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例。</li>
                <li>文字示例：文字示例文字示例文字示例文字示例文字示例文字示例文字示例文字示例。</li>
                <li>文字示例：文字示例文字示例文字示例文字示例文字示例文字示例文字示例。</li>
              </ol>
            </div>

            <footer class="message-detail-footer">
              <button class="message-detail-action" type="button" @click="closeMessageDetail">查看</button>
            </footer>
          </section>
        </div>
      </Transition>
    </Teleport>

    <LogoutModal
      :visible="showLogoutModal"
      @confirm="handleLogout"
      @cancel="handleCancelLogout"
    />
  </header>
</template>

<style scoped>
.topbar {
  position: absolute;
  top: 0;
  left: 220px;
  right: 20px;
  z-index: 8;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 76px;
  padding-top: 20px;
  box-sizing: border-box;
}

h1 {
  margin: 0 0 0 20px;
  color: #022170;
  font: 600 20px/24px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.user-tools {
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  height: 44px;
}

.message-menu {
  position: relative;
  width: 44px;
  height: 44px;
}

.circle-tool,
.logout {
  position: relative;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0.06rem solid rgba(105, 123, 169, 0.1);
  border-radius: 999px;
  color: #191c1e;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0.25rem 0.88rem rgba(190, 198, 223, 0.2);
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.circle-tool:hover,
.logout:hover {
  background: rgba(255, 255, 255, 0.9);
  border-color: rgba(105, 123, 169, 0.2);
}

.tool-icon {
  width: 20px;
  height: 20px;
  display: block;
}

.circle-tool :deep(.app-icon),
.logout :deep(.app-icon) {
  width: 20px;
  height: 20px;
}

.message-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff3b30;
}

.message-popover {
  position: absolute;
  top: 52px;
  right: -86px;
  z-index: 30;
  width: 400px;
  height: 392px;
  padding: 16px 18px 12px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 10px 30px rgba(190, 198, 223, 0.4);
  box-sizing: border-box;
}

.message-tabs {
  display: flex;
  align-items: flex-start;
  gap: 28px;
  height: 32px;
  border-bottom: 1px solid rgba(217, 228, 242, 0.92);
}

.message-tab {
  position: relative;
  height: 32px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #1d2530;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: normal;
  cursor: pointer;
}

.message-tab.active {
  color: #1947ff;
}

.message-tab.active::after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  border-radius: 999px;
  background: #1947ff;
  content: '';
}

.message-popover-list {
  display: grid;
  gap: 18px;
  min-height: 178px;
  padding-top: 22px;
}

.message-popover-item {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) 12px;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-height: 36px;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
}

.message-popover-icon {
  position: relative;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #e9efff;
}

.message-popover-icon img {
  display: block;
  width: 20px;
  height: 20px;
}

.message-popover-dot {
  position: absolute;
  top: -2px;
  right: 0;
  width: 7px;
  height: 7px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: #ff2d20;
  box-sizing: content-box;
}

.message-popover-text {
  min-width: 0;
  overflow: hidden;
  color: #6f7c8e;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-popover-item.unread .message-popover-text {
  color: #1d2530;
  font-weight: 500;
}

.message-popover-more {
  color: #c2ccd9;
  font-family: Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  text-align: right;
}

.message-read-all {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 12px;
  height: 40px;
  padding: 10px 0 0;
  border: 0;
  border-top: 1px solid rgba(217, 228, 242, 0.92);
  background: transparent;
  color: #b1bdcc;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: normal;
  text-align: left;
  cursor: pointer;
}

.message-detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(7, 12, 22, 0.58);
  box-sizing: border-box;
}

.message-detail-card {
  width: 520px;
  height: 560px;
  overflow: hidden;
  border-radius: 18px;
  background-color: #eaf4ff;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 300px;
  box-shadow: 0 10px 30px rgba(18, 34, 63, 0.18);
}

.message-detail-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  background: transparent;
}

.message-detail-header h2 {
  margin: 0;
  color: #ffffff;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: normal;
}

.message-detail-close {
  position: absolute;
  top: 12px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.82);
  color: #4c86d7;
  font-family: Arial, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
}

.message-detail-body {
  position: relative;
  height: 456px;
  margin: 10px 12px 0;
  padding: 18px 16px 0;
  overflow: hidden;
  border-radius: 0 0 8px 8px;
  background: #ffffff;
  color: #1d2530;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

.message-detail-date {
  position: absolute;
  top: 18px;
  right: 16px;
  color: #b2bbc8;
  font-size: 10px;
  font-weight: 400;
  line-height: 14px;
}

.message-detail-body h3 {
  max-width: 236px;
  margin: 0 0 14px;
  color: #1d2530;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
}

.message-detail-body p,
.message-detail-body li {
  margin: 0 0 12px;
  color: #1d2530;
  font-size: 11px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: normal;
}

.message-detail-body ol {
  margin: 0;
  padding-left: 0;
  list-style-position: inside;
}

.message-detail-footer {
  display: grid;
  place-items: center;
  height: 46px;
  background: #eaf4ff;
}

.message-detail-action {
  width: 44px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: #176bff;
  color: #ffffff;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
}

.message-detail-fade-enter-active,
.message-detail-fade-leave-active {
  transition: opacity 0.16s ease;
}

.message-detail-fade-enter-active .message-detail-card,
.message-detail-fade-leave-active .message-detail-card {
  transition: transform 0.16s ease, opacity 0.16s ease;
}

.message-detail-fade-enter-from,
.message-detail-fade-leave-to {
  opacity: 0;
}

.message-detail-fade-enter-from .message-detail-card,
.message-detail-fade-leave-to .message-detail-card {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.tool-tip {
  --tip-visible-opacity: 1;
  position: absolute;
  left: 50%;
  top: 50px;
  z-index: 12;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(-2px);
  transition: opacity 0.15s ease, visibility 0.15s ease, transform 0.15s ease;
}

.circle-tool:hover .tool-tip,
.circle-tool:focus-visible .tool-tip,
.logout:hover .tool-tip,
.logout:focus-visible .tool-tip {
  opacity: var(--tip-visible-opacity);
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

.feedback-tip {
  --tip-visible-opacity: 0.8;
  width: 76px;
  height: 36px;
  border-radius: 4px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  font: 400 16px/36px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-shadow: 0rem 0.13rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
}

.feedback-tip::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 33px;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.75);
}

.dark-tip {
  width: 44px;
  height: 36px;
  border-radius: 8px;
  color: #fff;
  background: rgba(0, 0, 0, 0.75);
  font: 400 14px/36px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-shadow: 0rem 0.13rem 0.5rem 0rem rgba(0, 0, 0, 0.15);
}

.dark-tip::before {
  content: '';
  position: absolute;
  top: -5px;
  left: 17px;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.75);
}

.logout-tip {
  width: 72px;
}

.logout-tip::before {
  left: 31px;
}

.divider {
  width: 1px;
  height: 30px;
  background: rgba(105, 123, 169, 0.2);
}

.avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.admin-name {
  color: #191c1e;
  font: 600 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.role-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 110px;
  height: 44px;
  padding: 0 12px;
  border: 0.06rem solid rgba(105, 123, 169, 0.1);
  border-radius: 0.5rem;
  color: #191c1e;
  background: rgba(255, 255, 255, 0.7);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  transition: background 0.15s ease, box-shadow 0.15s ease;
}

.role-button:hover {
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.06rem solid rgba(105, 123, 169, 0.1);
  box-shadow: 0rem 0.25rem 0.88rem 0rem rgba(190, 198, 223, 0.2);
}

.role-button:active {
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.06rem solid rgba(105, 123, 169, 0.1);
  box-shadow: 0rem 0.25rem 0.63rem 0rem rgba(190, 198, 223, 0.9);
}

.switch-icon {
  width: 20px;
  height: 20px;
  display: block;
}

.role-button :deep(.app-icon) {
  width: 18px;
  height: 18px;
}

@media (max-width: 900px) {
  .topbar {
    position: relative;
    left: auto;
    right: auto;
    height: auto;
    padding: 18px 18px 10px;
  }

  h1 {
    margin-left: 0;
  }

  .user-tools {
    gap: 8px;
  }

  .role-button,
  .tool-tip {
    display: none;
  }

  .message-popover {
    right: -72px;
  }
}

@media (max-width: 560px) {
  .topbar {
    align-items: center;
  }

  .message-popover {
    right: -16px;
    width: min(400px, calc(100vw - 24px));
  }

  .circle-tool:first-child,
  .divider,
  .admin-name {
    display: none;
  }
}
</style>
