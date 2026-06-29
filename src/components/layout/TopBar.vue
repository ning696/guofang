<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../base/AppIcon.vue'
import LogoutModal from '../base/LogoutModal.vue'
import mailIcon from '../../assets/邮件.svg'
import messageIcon from '../../assets/消息.svg'
import switchIcon from '../../assets/管理员右侧的切换身份按钮.svg'
import avatarImage from '../../assets/默认头像.png'

const showLogoutModal = ref(false)

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
      <button class="circle-tool message" type="button" aria-label="消息">
        <img :src="messageIcon" alt="" class="tool-icon" />
        <span class="message-badge"></span>
        <span class="tool-tip dark-tip">消息</span>
      </button>
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
}

@media (max-width: 560px) {
  .topbar {
    align-items: center;
  }

  .circle-tool:first-child,
  .divider,
  .admin-name {
    display: none;
  }
}
</style>
