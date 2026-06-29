<script setup lang="ts">
import warningIcon from '../../assets/退出登录感叹号.svg'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click="emit('cancel')">
        <div class="modal-card" @click.stop>
          <button class="close-btn" type="button" aria-label="关闭" @click="emit('cancel')">×</button>
          <h3 class="modal-title">提示</h3>
          <div class="modal-body">
            <img class="warning-icon" :src="warningIcon" alt="" aria-hidden="true" />
            <p class="modal-text">确定要退出登录吗？</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-cancel" type="button" @click="emit('cancel')">取消</button>
            <button class="btn btn-confirm" type="button" @click="emit('confirm')">确认</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
}

.modal-card {
  position: relative;
  width: 22.5rem;
  height: 11rem;
  padding: 1.25rem;
  border-radius: 1.13rem;
  background: #fff;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.63rem;
  height: 1.63rem;
  border: 0;
  border-radius: 0.5rem;
  color: #999;
  background: transparent;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.close-btn:hover {
  color: #000;
  background: rgba(0, 0, 0, 0.04);
}

.modal-title {
  margin: 0.13rem 0 0;
  color: #000;
  font: 600 1rem/1.38rem 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.modal-body {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.13rem;
}

.warning-icon {
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
}

.modal-text {
  margin: 0;
  color: #262626;
  font: 400 0.88rem/1.25rem 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.modal-footer {
  position: absolute;
  bottom: 1.25rem;
  right: 1.5rem;
  display: flex;
  gap: 0.63rem;
}

.btn {
  width: 3.75rem;
  height: 2.25rem;
  border-radius: 0.5rem;
  font: 400 0.88rem/1.25rem 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
  transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}

.btn-cancel {
  border: 0.06rem solid #d9d9d9;
  color: #262626;
  background: #fff;
}

.btn-cancel:hover {
  border-color: #bbb;
  background: rgba(0, 0, 0, 0.02);
}

.btn-confirm {
  border: 0;
  color: #fff;
  background: #1947ff;
}

.btn-confirm:hover {
  background: #0f3df4;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-card,
.modal-leave-active .modal-card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-card,
.modal-leave-to .modal-card {
  transform: scale(0.9);
  opacity: 0;
}
</style>
