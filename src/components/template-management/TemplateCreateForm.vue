<script setup lang="ts">
import type { TemplateCategoryOption } from '../../mocks/templateManagement'

defineProps<{
  categories: TemplateCategoryOption[]
}>()

const emit = defineEmits<{
  back: []
  publish: []
}>()

const relatedOptions = ['研究生课堂教学质量评估表', '本科课堂教学质量评估表', '实验课评价表']
const indicatorOptions = ['教学态度', '教学内容', '教学方法', '教学效果']
</script>

<template>
  <div class="create-view">
    <div class="create-head">
      <button class="back-button" type="button" @click="emit('back')">
        <span class="back-chevron">‹</span>
        <span>返回</span>
      </button>
      <h1>新增模板</h1>
    </div>

    <form class="create-form" @submit.prevent="emit('publish')">
      <label class="form-field">
        <span class="required">模板名称</span>
        <input type="text" placeholder="请输入" />
      </label>

      <label class="form-field">
        <span class="required">所属分类</span>
        <span class="select-shell">
          <select>
            <option value="">请选择</option>
            <option v-for="category in categories" :key="category.value" :value="category.value">
              {{ category.label }}
            </option>
          </select>
        </span>
      </label>

      <label class="form-field">
        <span class="required">关联选项表</span>
        <span class="select-shell">
          <select>
            <option value="">请选择</option>
            <option v-for="option in relatedOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </span>
      </label>

      <section class="indicator-section" aria-label="评价指标与项目">
        <span class="section-label required">评价指标与项目</span>

        <div class="indicator-card">
          <label class="form-field compact">
            <span class="required">评价指标</span>
            <span class="select-shell">
              <select>
                <option value="">请选择</option>
                <option v-for="option in indicatorOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </span>
          </label>

          <label class="form-field compact">
            <span class="required">评价项目</span>
            <textarea placeholder="请输入"></textarea>
          </label>

          <div class="weight-row">
            <label class="weight-input">
              <span class="required">权重</span>
              <input type="text" placeholder="请输入" />
            </label>
            <label class="weight-unit">
              <span class="sr-only">权重单位</span>
              <span class="select-shell">
                <select>
                  <option>值</option>
                  <option>百分比</option>
                </select>
              </span>
            </label>
          </div>
        </div>

        <button class="add-item-button" type="button">
          <span>＋</span>
          <span>添加项目</span>
        </button>
      </section>

      <button class="add-indicator-button" type="button">
        <span>⊕</span>
        <span>添加评价指标</span>
      </button>

      <fieldset class="status-field">
        <legend class="required">模板状态</legend>
        <label>
          <input type="radio" name="template-status" checked />
          <span>开启</span>
        </label>
        <label>
          <input type="radio" name="template-status" />
          <span>禁用</span>
        </label>
      </fieldset>

      <button class="publish-button" type="submit">
        <span class="publish-icon">↗</span>
        <span>发布</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.create-view {
  min-height: 100%;
}

.create-head {
  display: flex;
  align-items: center;
  gap: 38px;
  height: 24px;
  margin-bottom: 24px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0;
  border: 0;
  color: #2f3a4a;
  background: transparent;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.back-chevron {
  font-size: 22px;
  line-height: 20px;
  transform: translateY(-1px);
}

h1 {
  margin: 0;
  color: #191c1e;
  font: 600 15px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.create-form {
  width: min(460px, 100%);
  margin: 0 auto;
}

.form-field,
.indicator-section {
  display: grid;
  gap: 8px;
  margin: 0 0 18px;
}

.form-field > span:first-child,
.section-label,
legend {
  color: #1f2630;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.required::before {
  content: '*';
  margin-right: 1px;
  color: #ff4d4f;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid #dfe5ee;
  border-radius: 8px;
  outline: none;
  color: #1f2630;
  background: rgba(255, 255, 255, 0.9);
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
}

input,
select {
  height: 38px;
}

input {
  padding: 0 14px;
}

textarea {
  height: 80px;
  padding: 12px 14px;
  resize: none;
}

input::placeholder,
textarea::placeholder {
  color: #b1bac8;
}

.select-shell {
  position: relative;
  display: block;
}

.select-shell::after {
  content: '';
  position: absolute;
  top: 14px;
  right: 16px;
  width: 8px;
  height: 8px;
  border-right: 1.5px solid #9aa3b2;
  border-bottom: 1.5px solid #9aa3b2;
  pointer-events: none;
  transform: rotate(45deg);
}

select {
  padding: 0 42px 0 14px;
  appearance: none;
  color: #9aa3b2;
}

input:hover,
select:hover,
textarea:hover,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  border-color: #1947ff;
}

.indicator-section {
  margin-bottom: 10px;
  padding: 0;
}

.indicator-card {
  display: grid;
  gap: 18px;
  padding: 18px 20px 20px;
  border-radius: 8px;
  background: rgba(244, 246, 250, 0.96);
}

.form-field.compact {
  margin-bottom: 0;
}

.weight-row {
  display: flex;
  align-items: end;
  gap: 14px;
}

.weight-input {
  display: grid;
  gap: 8px;
  width: 120px;
}

.weight-unit {
  width: 120px;
}

.add-item-button,
.add-indicator-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  background: transparent;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.add-item-button {
  color: #1f2630;
  border: 1px dashed #c9d1df;
}

.add-indicator-button {
  margin: 0 0 18px;
  color: #1947ff;
  border: 1px dashed #1947ff;
  background: rgba(25, 71, 255, 0.02);
}

.status-field {
  display: flex;
  align-items: center;
  gap: 30px;
  margin: 0 0 50px;
  padding: 0;
  border: 0;
}

.status-field legend {
  display: block;
  width: 100%;
  margin-bottom: 10px;
}

.status-field label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #1f2630;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.status-field input {
  width: 16px;
  height: 16px;
  accent-color: #1947ff;
}

.publish-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 82px;
  height: 36px;
  margin: 0 auto;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: #1947ff;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-shadow: 0 5px 12px rgba(25, 71, 255, 0.18);
}

.publish-icon {
  font-size: 14px;
  line-height: 1;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

@media (max-height: 820px) and (min-width: 901px) {
  .create-head {
    margin-bottom: 16px;
  }

  .form-field,
  .indicator-section {
    margin-bottom: 14px;
  }

  .indicator-card {
    gap: 14px;
    padding: 14px 18px 16px;
  }

  .status-field {
    margin-bottom: 28px;
  }
}

@media (max-width: 560px) {
  .create-head {
    gap: 22px;
  }

  .weight-row {
    align-items: stretch;
    flex-direction: column;
  }

  .weight-input,
  .weight-unit {
    width: 100%;
  }
}
</style>
