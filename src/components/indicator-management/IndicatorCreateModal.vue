<script setup lang="ts">
import { reactive, watch } from 'vue'
import modalBackground from '../../assets/弹窗背景.svg'
import type { IndicatorStatus } from '../../mocks/indicatorManagement'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  cancel: []
  confirm: [value: { name: string; status: IndicatorStatus }]
}>()

const form = reactive({
  name: '',
  status: 'enabled' as IndicatorStatus,
})

const modalBackgroundStyle = {
  backgroundImage: `url(${modalBackground})`,
}

const resetForm = () => {
  form.name = ''
  form.status = 'enabled'
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      resetForm()
    }
  },
)

const handleCancel = () => {
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm', {
    name: form.name.trim(),
    status: form.status,
  })
  resetForm()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="indicator-modal">
      <div v-if="visible" class="modal-overlay" @click="handleCancel">
        <form class="modal-card" :style="modalBackgroundStyle" @click.stop @submit.prevent="handleConfirm">
          <button class="close-button" type="button" aria-label="关闭" @click="handleCancel">×</button>
          <h2 class="modal-title">新增指标</h2>

          <div class="form-card">
            <label class="form-field">
              <span class="field-label"><span class="required">*</span>指标名称</span>
              <input v-model="form.name" type="text" placeholder="请输入" />
            </label>

            <fieldset class="status-field">
              <legend><span class="required">*</span>指标状态</legend>
              <label>
                <input v-model="form.status" type="radio" name="indicator-status" value="enabled" />
                <span>启用</span>
              </label>
              <label>
                <input v-model="form.status" type="radio" name="indicator-status" value="disabled" />
                <span>禁用</span>
              </label>
            </fieldset>
          </div>

          <div class="modal-footer">
            <button class="footer-button cancel" type="button" @click="handleCancel">取消</button>
            <button class="footer-button confirm" type="submit">确认</button>
          </div>
        </form>
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
  background: rgba(0, 0, 0, 0.54);
}

.modal-card {
  position: relative;
  width: 520px;
  height: 300px;
  padding: 22px 20px 18px;
  border: 0;
  border-radius: 18px;
  background-color: #eaf6ff;
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 520px 300px;
  box-shadow: 0 18px 44px rgba(16, 37, 78, 0.18);
  box-sizing: border-box;
  transform: translateY(-18px);
}

.close-button {
  position: absolute;
  top: 16px;
  right: 18px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #2f85e8;
  background: rgba(232, 246, 255, 0.95);
  font: 500 22px/1 Arial, sans-serif;
  cursor: pointer;
}

.modal-title {
  margin: 0 0 18px;
  color: #fff;
  text-align: center;
  font: 600 18px/25px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.form-card {
  width: 480px;
  height: 150px;
  padding: 17px 18px 19px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.98);
  box-sizing: border-box;
}

.form-field {
  display: block;
  margin-bottom: 12px;
}

.field-label,
.status-field legend {
  display: block;
  margin-bottom: 5px;
  color: #191c1e;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.required {
  margin-right: 2px;
  color: #ff4d4f;
}

input[type='text'] {
  width: 100%;
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d9dfe8;
  border-radius: 3px;
  outline: none;
  color: #191c1e;
  background: #fff;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

input[type='text']::placeholder {
  color: #b8bec8;
}

input[type='text']:focus-visible {
  border-color: #1947ff;
}

.status-field {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  column-gap: 28px;
  margin: 0;
  padding: 0 0 1px;
  border: 0;
}

.status-field legend {
  grid-column: 1 / -1;
  margin-bottom: 7px;
}

.status-field label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #191c1e;
  font: 400 13px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-field input {
  width: 14px;
  height: 14px;
  margin: 0;
  accent-color: #1947ff;
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 12px;
}

.footer-button {
  width: 54px;
  height: 34px;
  border-radius: 5px;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

.footer-button.cancel {
  border: 1px solid #d9dfe8;
  color: #191c1e;
  background: #fff;
}

.footer-button.confirm {
  border: 0;
  color: #fff;
  background: #1947ff;
}

.indicator-modal-enter-active,
.indicator-modal-leave-active {
  transition: opacity 0.2s ease;
}

.indicator-modal-enter-active .modal-card,
.indicator-modal-leave-active .modal-card {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.indicator-modal-enter-from,
.indicator-modal-leave-to {
  opacity: 0;
}

.indicator-modal-enter-from .modal-card,
.indicator-modal-leave-to .modal-card {
  transform: translateY(-12px) scale(0.96);
  opacity: 0;
}

@media (max-width: 560px) {
  .modal-card {
    width: calc(100vw - 32px);
    height: 300px;
    padding-inline: 14px;
    background-size: 520px 300px;
  }

  .form-card {
    width: 100%;
  }
}
</style>
