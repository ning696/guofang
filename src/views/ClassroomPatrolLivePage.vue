<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SidebarNav from '../components/layout/SidebarNav.vue'
import TopBar from '../components/layout/TopBar.vue'
import classroomVideo from '../assets/教室巡课/视频.mp4'
import classroomRightPanel from '../assets/教室巡课/教室巡课右侧.svg'
import moreClassroomIcon from '../assets/教室巡课/教室巡课详情页面/更多教室左侧.svg'
import teacherInfoIcon from '../assets/教室巡课/教室巡课详情页面/教员左侧.svg'
import classInfoIcon from '../assets/教室巡课/教室巡课详情页面/班级左侧.svg'
import roomInfoIcon from '../assets/教室巡课/教室巡课详情页面/教室左侧.svg'
import onlineReviewIcon from '../assets/教室巡课/教室巡课详情页面/在线评价左侧.svg'
import zoomInIcon from '../assets/教室巡课/教室巡课详情页面/拉近左侧图标.svg'
import zoomOutIcon from '../assets/教室巡课/教室巡课详情页面/拉远左侧按钮.svg'
import screenshotIcon from '../assets/教室巡课/教室巡课详情页面/截图左侧图标.svg'
import directionUpIcon from '../assets/教室巡课/教室巡课详情页面/方向键上.svg'
import directionLeftIcon from '../assets/教室巡课/教室巡课详情页面/方向键左.svg'
import directionRightIcon from '../assets/教室巡课/教室巡课详情页面/方向键右.png'
import directionDownIcon from '../assets/教室巡课/教室巡课详情页面/方向键下.svg'
import metricInteractIcon from '../assets/教室巡课/教室巡课详情页面/课堂数据互动.svg'
import metricListenIcon from '../assets/教室巡课/教室巡课详情页面/课堂数据抢答.svg'
import metricQuestionIcon from '../assets/教室巡课/教室巡课详情页面/课堂数据提问.svg'
import metricProcessIcon from '../assets/教室巡课/教室巡课详情页面/课堂数据互动答题左侧.svg'
import hemisphereControlIcon from '../assets/教室巡课/教室巡课详情页面/半球机图标.svg'
import moreCommentsArrowIcon from '../assets/教室巡课/教室巡课详情页面/查看更多评论右侧下拉.svg'
import reviewModalBackground from '../assets/弹窗背景.svg'
import {
  classroomLiveDetail,
  classroomLiveMessages,
  classroomPatrolMeta,
} from '../mocks/classroomPatrol'
import { classroomPatrolNavItems } from '../mocks/navigation'

const tabIconByName: Record<string, string> = {
  在线评价: onlineReviewIcon,
}

const metricIconByTone: Record<string, string> = {
  interact: metricInteractIcon,
  listen: metricListenIcon,
  question: metricQuestionIcon,
  process: metricProcessIcon,
}
const dataTabs = ['课堂数据', '留言'] as const
const selectedControlTab = ref(classroomLiveDetail.activeControlTab)
const selectedDataTab = ref<(typeof dataTabs)[number]>('课堂数据')
const messageDraft = ref('')
const showOnlineReviewModal = ref(false)
const reviewModalBackgroundStyle = { backgroundImage: `url(${reviewModalBackground})` }

const selectControlTab = (tab: string) => {
  selectedControlTab.value = tab

  if (tab === classroomLiveDetail.activeControlTab) {
    showOnlineReviewModal.value = true
  }
}

const closeOnlineReviewModal = () => {
  showOnlineReviewModal.value = false
}

const selectDataTab = (tab: (typeof dataTabs)[number]) => {
  selectedDataTab.value = tab
}

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push({ name: 'classroom-patrol' })
}
</script>

<template>
  <div class="classroom-live-page">
    <SidebarNav :items="classroomPatrolNavItems" />
    <TopBar />

    <main class="live-main">
      <section class="live-shell" aria-label="教室巡课实时画面">
      <section class="top-panel">
        <div class="live-toolbar">
        <button class="toolbar-button back-button" type="button" @click="goBack">
          <span aria-hidden="true">‹</span>
          <span>返回</span>
        </button>
        <RouterLink class="toolbar-button more-button" :to="{ name: 'classroom-patrol' }">
          <img class="toolbar-icon" :src="moreClassroomIcon" alt="" aria-hidden="true" />
          <span>更多教室</span>
        </RouterLink>
      </div>

      <header class="lesson-head">
        <h1>{{ classroomLiveDetail.course }}</h1>
        <div class="lesson-meta" aria-label="课程信息">
          <span class="meta-item teacher">
            <img class="meta-icon" :src="teacherInfoIcon" alt="" aria-hidden="true" />
            教员：<strong>{{ classroomLiveDetail.teacher }}</strong>
          </span>
          <span class="meta-item class-name">
            <img class="meta-icon" :src="classInfoIcon" alt="" aria-hidden="true" />
            班级：<strong>{{ classroomLiveDetail.className }}</strong>
          </span>
          <span class="meta-item room">
            <img class="meta-icon" :src="roomInfoIcon" alt="" aria-hidden="true" />
            教室：<strong>{{ classroomLiveDetail.room }}</strong>
          </span>
        </div>
        <p>{{ classroomPatrolMeta.currentTime }}</p>
      </header>

      <section class="media-panel">
        <video
          class="classroom-video"
          :src="classroomVideo"
          autoplay
          muted
          loop
          playsinline
          aria-label="教室实时视频"
        ></video>
        <img class="course-board" :src="classroomRightPanel" alt="概率论与数理统计课件画面" />
        <span class="online-count">实时巡课人数：{{ classroomLiveDetail.onlineCount }}</span>
      </section>
        </section>

        <section class="detail-grid">
        <section class="control-panel" aria-label="在线评价与设备控制">
          <div class="control-tabs">
            <button
              v-for="tab in classroomLiveDetail.controlTabs"
              :key="tab"
              class="tab-button"
              :class="{
                active: tab === classroomLiveDetail.activeControlTab,
                selected: tab === selectedControlTab && tab !== classroomLiveDetail.activeControlTab,
              }"
              type="button"
              @click="selectControlTab(tab)"
            >
              <img
                v-if="tabIconByName[tab]"
                class="tab-icon"
                :src="tabIconByName[tab]"
                alt=""
                aria-hidden="true"
              />              {{ tab }}
            </button>
          </div>

          <div v-if="selectedControlTab === '半球机'" class="control-stage control-stage-limited">
            <div class="limited-control-state" role="status">
              <img class="limited-control-icon" :src="hemisphereControlIcon" alt="" aria-hidden="true" />
              <span>仅球机画面支持远程控制</span>
            </div>
          </div>

          <div v-else class="control-stage">
            <div class="direction-pad" aria-label="云台方向控制">
              <button type="button" aria-label="向上"><img :src="directionUpIcon" alt="" aria-hidden="true" /></button>
              <button type="button" aria-label="向左"><img :src="directionLeftIcon" alt="" aria-hidden="true" /></button>
              <button class="primary" type="button" aria-label="复位">↻</button>
              <button type="button" aria-label="向右"><img :src="directionRightIcon" alt="" aria-hidden="true" /></button>
              <button type="button" aria-label="向下"><img :src="directionDownIcon" alt="" aria-hidden="true" /></button>
            </div>

            <div class="camera-actions">
              <button class="action-button" type="button">
                <img class="action-icon" :src="zoomInIcon" alt="" aria-hidden="true" />
                拉近
              </button>
              <button class="action-button" type="button">
                <img class="action-icon" :src="zoomOutIcon" alt="" aria-hidden="true" />
                拉远
              </button>
              <button class="action-button wide" type="button">
                <img class="action-icon" :src="screenshotIcon" alt="" aria-hidden="true" />
                截图
              </button>
            </div>
          </div>

          <p class="control-tip">
            教学督导请选择常态录播按钮，如果异常，请选择录课按钮，教室监控、设备巡检，考试巡查请选择轻录播和半球机按钮。
          </p>
        </section>

        <section class="data-panel" aria-label="课堂数据">
          <div class="data-tabs">
            <button
              v-for="tab in dataTabs"
              :key="tab"
              class="data-tab"
              :class="{ active: tab === selectedDataTab }"
              type="button"
              @click="selectDataTab(tab)"
            >
              {{ tab }}
            </button>
          </div>

          <div v-if="selectedDataTab === '课堂数据'" class="metric-list">
            <article
              v-for="row in classroomLiveDetail.metricRows"
              :key="row.label"
              class="metric-row"
            >
              <div class="metric-label" :class="row.tone">
                <img :src="metricIconByTone[row.tone]" alt="" aria-hidden="true" />
                {{ row.label }}
              </div>
              <div class="metric-values">
                <div v-for="metric in row.metrics" :key="metric.label" class="metric-item">
                  <strong>{{ metric.value }}</strong>
                  <span>{{ metric.label }}</span>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="message-panel">
            <div class="message-compose">
              <input v-model="messageDraft" type="text" placeholder="说点什么~" aria-label="留言内容" />
              <button type="button">发表</button>
            </div>

            <div class="message-list">
              <article v-for="message in classroomLiveMessages" :key="message.author" class="message-item">
                <header>
                  <strong>{{ message.author }}</strong>
                  <time>{{ message.time }}</time>
                </header>
                <p>{{ message.content }}</p>
              </article>
            </div>

            <button class="more-comments" type="button">
              查看更多评论
              <img class="more-comments-icon" :src="moreCommentsArrowIcon" alt="" aria-hidden="true" />
            </button>
          </div>
        </section>
      </section>
      </section>
    </main>

    <Teleport to="body">
      <Transition name="review-modal-fade">
        <div v-if="showOnlineReviewModal" class="review-modal-overlay" @click="closeOnlineReviewModal">
          <section class="review-modal-card" :style="reviewModalBackgroundStyle" aria-label="在线评价" @click.stop>
            <header class="review-modal-header">
              <h2>在线评价</h2>
              <button class="review-modal-close" type="button" aria-label="关闭" @click="closeOnlineReviewModal">×</button>
            </header>

            <form class="review-modal-body" @submit.prevent="closeOnlineReviewModal">
              <label class="review-template-field">
                <span>评价模板</span>
                <select aria-label="评价模板">
                  <option>学员评教评价量表</option>
                </select>
              </label>

              <section class="review-section">
                <h3>督教及考核</h3>
                <div class="review-question required">
                  <p>向心示范，注重对学员学习过程的考核：</p>
                  <div class="review-options">
                    <label><input type="radio" name="model" checked />很好</label>
                    <label><input type="radio" name="model" />好</label>
                    <label><input type="radio" name="model" />中</label>
                  </div>
                </div>
              </section>

              <section class="review-section">
                <h3>教学内容及准备</h3>
                <div class="review-question required">
                  <p>教学内容充实：</p>
                  <div class="review-options">
                    <label><input type="radio" name="content" checked />很好</label>
                    <label><input type="radio" name="content" />好</label>
                    <label><input type="radio" name="content" />中</label>
                  </div>
                </div>
                <div class="review-question required">
                  <p>教学内容与理论知识有机结合：</p>
                  <div class="review-options">
                    <label><input type="radio" name="combine" checked />很好</label>
                    <label><input type="radio" name="combine" />好</label>
                    <label><input type="radio" name="combine" />中</label>
                  </div>
                </div>
                <label class="review-text-field required">
                  <span>授课内容</span>
                  <textarea placeholder="请输入"></textarea>
                </label>
              </section>

              <label class="review-text-field review-comment required">
                <span>课堂评价</span>
                <textarea placeholder="点击输入文字状态"></textarea>
              </label>
            </form>

            <footer class="review-modal-footer">
              <button class="review-cancel" type="button" @click="closeOnlineReviewModal">取消</button>
              <button class="review-submit" type="button" @click="closeOnlineReviewModal">提交</button>
            </footer>
          </section>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.classroom-live-page {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  overflow-x: hidden;
  background: transparent;
  color: #191c1e;
}

.live-main {
  --panel-top-offset: 76px;
  --panel-bottom-gap: 32px;
  position: relative;
  margin-left: 220px;
  min-height: 100svh;
  padding: var(--panel-top-offset) 20px var(--panel-bottom-gap) 10px;
  box-sizing: border-box;
}

.live-shell {
  min-width: 0;
  min-height: calc(100svh - var(--panel-top-offset) - var(--panel-bottom-gap));
  box-sizing: border-box;
}

.top-panel {
  min-width: 0;
  padding: 18px 20px 22px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.78);
  box-sizing: border-box;
}

.live-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 32px;
  margin-bottom: 12px;
}

.toolbar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  color: #586b8f;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 4px 12px rgba(175, 197, 224, 0.18);
  font: 500 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-decoration: none;
  cursor: pointer;
}

.back-button {
  padding-left: 8px;
  background: transparent;
  box-shadow: none;
}

.back-button span:first-child {
  font-size: 18px;
  line-height: 18px;
}

.toolbar-icon {
  width: 14px;
  height: 14px;
  display: block;
  flex: 0 0 auto;
}

.lesson-head {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  min-height: 34px;
  padding-right: 6px;
}

.lesson-head h1 {
  margin: 0;
  color: #191c1e;
  font: 600 24px/34px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 38px;
  min-width: 0;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #697ba9;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.meta-item strong {
  color: #191c1e;
  font-weight: 600;
}

.meta-icon {
  width: 18px;
  height: 18px;
  display: block;
  flex: 0 0 auto;
}

.lesson-head p {
  margin: 0;
  color: #697ba9;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.media-panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px;
  margin-top: 8px;
  box-sizing: border-box;
}

.classroom-video,
.course-board {
  width: 100%;
  aspect-ratio: 600 / 340;
  border-radius: 4px;
  display: block;
  object-fit: cover;
  background: #d9ecff;
}

.course-board {
  object-fit: fill;
}

.online-count {
  position: absolute;
  right: 20px;
  top: -28px;
  color: #697ba9;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  margin-top: 14px;
}

.control-panel,
.data-panel {
  min-width: 0;
  min-height: 248px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.74);
  box-sizing: border-box;
}

.control-panel {
  display: flex;
  flex-direction: column;
  min-height: 286px;
  padding: 14px 16px 18px;
}

.control-tabs,
.data-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
}

.tab-button,
.data-tab {
  height: 30px;
  border: 0;
  border-radius: 6px;
  padding: 0 14px;
  color: #536986;
  background: rgba(236, 245, 255, 0.88);
  font: 500 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

.tab-button.active {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #fff;
  background: #0a5bff;
}

.tab-button.selected {
  color: #1947ff;
  background: #fff;
}

.tab-icon {
  width: 14px;
  height: 14px;
  display: block;
  flex: 0 0 auto;
}

.control-stage {
  display: grid;
  grid-template-columns: 178px minmax(0, 1fr);
  gap: 44px;
  align-items: center;
  flex: 1 1 auto;
  margin-top: 14px;
  padding: 26px 62px;
  border-radius: 2px;
  background: rgba(236, 245, 255, 0.82);
  box-sizing: border-box;
}
.control-stage.control-stage-limited {
  grid-template-columns: 1fr;
  place-items: center;
  min-height: 142px;
  padding: 20px;
}

.limited-control-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #3d4a60;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-align: center;
}

.limited-control-icon {
  width: 80px;
  height: 80px;
  display: block;
  object-fit: contain;
}
.direction-pad {
  --direction-button-size: 32px;
  display: grid;
  grid-template-columns: repeat(3, var(--direction-button-size));
  grid-template-rows: repeat(3, var(--direction-button-size));
  justify-content: center;
  gap: 8px;
}

.direction-pad button {
  display: grid;
  place-items: center;
  width: var(--direction-button-size);
  height: var(--direction-button-size);
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
}

.direction-pad img {
  width: var(--direction-button-size);
  height: var(--direction-button-size);
  display: block;
  object-fit: contain;
}

.direction-pad button:nth-child(1) {
  grid-column: 2;
}

.direction-pad button:nth-child(2) {
  grid-column: 1;
  grid-row: 2;
}

.direction-pad button:nth-child(3) {
  grid-column: 2;
  grid-row: 2;
  color: #fff;
  background: #0a5bff;
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
}

.direction-pad button:nth-child(4) {
  grid-column: 3;
  grid-row: 2;
}

.direction-pad button:nth-child(5) {
  grid-column: 2;
  grid-row: 3;
}

.camera-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(126px, 1fr));
  gap: 14px;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  border: 1px solid transparent;
  border-radius: 6px;
  color: #3d4a60;
  background: #fff;
  font: 500 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-shadow: 0 2px 8px rgba(100, 130, 180, 0.08);
  cursor: pointer;
}

.action-icon {
  width: 14px;
  height: 14px;
  display: block;
  flex: 0 0 auto;
}

.action-button:hover,
.action-button:focus-visible {
  border-color: rgba(25, 71, 255, 0.65);
  box-shadow: 0 0 0 2px rgba(25, 71, 255, 0.08), 0 2px 8px rgba(100, 130, 180, 0.08);
  outline: none;
}

.action-button.wide {
  grid-column: 1 / -1;
}

.control-tip {
  margin: 16px 0 0;
  color: #697ba9;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.data-panel {
  display: flex;
  flex-direction: column;
  height: 420px;
  padding: 14px 22px 18px;
  overflow: hidden;
}

.data-tabs {
  border-bottom: 1px solid rgba(217, 228, 242, 0.86);
}

.data-tab {
  position: relative;
  padding: 0 8px;
  color: #191c1e;
  background: transparent;
}

.data-tab.active {
  color: #0055ff;
}

.data-tab.active::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: -1px;
  height: 3px;
  border-radius: 999px;
  background: #0055ff;
}

.metric-list {
  display: grid;
  flex: 1 1 auto;
  gap: 10px;
  min-height: 0;
  margin-top: 14px;
  overflow: hidden;
}

.message-panel {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  margin-top: 16px;
  padding-right: 6px;
  overflow: hidden;
}

.message-compose {
  display: grid;
  flex: 0 0 auto;
  grid-template-columns: minmax(0, 1fr) 58px;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(217, 228, 242, 0.86);
}

.message-compose input {
  min-width: 0;
  height: 38px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px;
  color: #191c1e;
  background: #fff;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  outline: none;
}

.message-compose input::placeholder {
  color: #b8c5d9;
}

.message-compose button {
  height: 38px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: #7f9cff;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

.message-list {
  display: grid;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  scrollbar-color: rgba(199, 209, 222, 0.9) transparent;
  scrollbar-width: thin;
}

.message-list::-webkit-scrollbar {
  width: 4px;
}

.message-list::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(199, 209, 222, 0.9);
}

.message-item {
  padding: 16px 0;
  border-bottom: 1px solid rgba(217, 228, 242, 0.86);
}

.message-item header {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 6px;
}

.message-item strong {
  color: #24364d;
  font: 600 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.message-item time {
  color: #7d91ad;
  font: 400 12px/18px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.message-item p {
  margin: 0;
  color: #4c6078;
  font: 400 14px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.more-comments {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: fit-content;
  margin: 18px auto 0;
  padding: 0;
  border: 0;
  color: #1947ff;
  background: transparent;
  font: 500 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}
.more-comments-icon {
  width: 12px;
  height: 12px;
  display: block;
  flex: 0 0 auto;
}

.metric-row {
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  align-items: stretch;
  min-height: 62px;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}

.metric-label {
  display: grid;
  place-items: center;
  align-content: center;
  gap: 4px;
  margin: 7px;
  padding: 6px 0;
  border-radius: 8px;
  color: #1947ff;
  background: #e9efff;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: normal;
  text-align: center;
  box-sizing: border-box;
}

.metric-label.listen {
  color: #0047ff;
  background: #e9f6ff;
}

.metric-label.question {
  color: #5738fb;
  background: #eee9ff;
}

.metric-label.process {
  color: #ff6600;
  background: #fff1df;
}
.metric-label img {
  width: 16px;
  height: 16px;
  display: block;
  object-fit: contain;
}


.metric-values {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
}

.metric-item {
  display: grid;
  place-items: center;
  gap: 8px;
  min-width: 0;
  padding: 0 10px;
  border-left: 1px solid rgba(217, 228, 242, 0.92);
  text-align: center;
}

.metric-item strong {
  color: #191c1e;
  font: 700 18px/24px Arial, 'PingFang SC', sans-serif;
}

.metric-item span {
  color: #697ba9;
  font: 400 12px/16px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

.review-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  justify-items: center;
  align-items: start;
  min-height: 100svh;
  padding: 62px 24px;
  overflow: auto;
  background: rgba(7, 12, 22, 0.58);
  box-sizing: border-box;
}

.review-modal-card {
  display: flex;
  flex-direction: column;
  width: 520px;
  height: 878px;
  overflow: hidden;
  border-radius: 18px;
  background-color: #eaf4ff;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 300px;
  box-shadow: 0 10px 30px rgba(18, 34, 63, 0.18);
}

.review-modal-header {
  position: relative;
  display: grid;
  flex: 0 0 64px;
  place-items: center;
  background: transparent;
}

.review-modal-header h2 {
  margin: 0;
  color: #ffffff;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: normal;
}

.review-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.82);
  color: #4c86d7;
  font-family: Arial, sans-serif;
  font-size: 22px;
  font-weight: 400;
  line-height: 22px;
  cursor: pointer;
}

.review-modal-body {
  flex: 1 1 auto;
  min-height: 0;
  margin: 0 20px;
  padding: 20px 20px 24px;
  overflow-y: auto;
  border-radius: 10px;
  background: #ffffff;
  box-sizing: border-box;
  scrollbar-color: rgba(199, 209, 222, 0.9) transparent;
  scrollbar-width: thin;
}

.review-modal-body::-webkit-scrollbar {
  width: 4px;
}

.review-modal-body::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(199, 209, 222, 0.9);
}

.review-template-field,
.review-text-field {
  display: grid;
  gap: 8px;
  color: #1d2530;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.review-template-field select {
  width: 260px;
  height: 38px;
  padding: 0 36px 0 12px;
  border: 1px solid #e4ebf5;
  border-radius: 6px;
  color: #3d4a60;
  background: #ffffff;
  font: 400 13px/20px '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  outline: none;
}

.review-section {
  margin-top: 20px;
  padding: 16px 18px 18px;
  border-radius: 8px;
  background: #f4f7fb;
}

.review-section h3 {
  position: relative;
  margin: 0 0 14px;
  padding-left: 10px;
  color: #1d2530;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.review-section h3::before {
  position: absolute;
  left: 0;
  top: 5px;
  width: 3px;
  height: 10px;
  border-radius: 999px;
  background: #1947ff;
  content: '';
}

.review-question {
  margin-top: 14px;
}

.review-question:first-of-type {
  margin-top: 0;
}

.review-question p,
.review-text-field span {
  margin: 0 0 10px;
  color: #1d2530;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
}

.required p::before,
.review-text-field.required span::before {
  color: #ff4d4f;
  content: '*';
}

.review-options {
  display: flex;
  align-items: center;
  gap: 42px;
}

.review-options label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #3d4a60;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
}

.review-options input {
  width: 14px;
  height: 14px;
  margin: 0;
  accent-color: #176bff;
}

.review-text-field textarea {
  width: 100%;
  min-height: 78px;
  padding: 12px;
  resize: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #1d2530;
  background: #ffffff;
  font: 400 13px/20px '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  box-sizing: border-box;
  outline: none;
}

.review-text-field textarea::placeholder {
  color: #b4c0d0;
}

.review-comment {
  margin-top: 18px;
}

.review-comment textarea {
  min-height: 96px;
  border-color: #176bff;
}

.review-modal-footer {
  display: flex;
  flex: 0 0 72px;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.review-modal-footer button {
  min-width: 54px;
  height: 30px;
  padding: 0 18px;
  border-radius: 6px;
  font-family: '苹方-简', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
}

.review-cancel {
  border: 1px solid #d9e2f0;
  color: #536986;
  background: #ffffff;
}

.review-submit {
  border: 1px solid #176bff;
  color: #ffffff;
  background: #176bff;
}

.review-modal-fade-enter-active,
.review-modal-fade-leave-active {
  transition: opacity 0.16s ease;
}

.review-modal-fade-enter-active .review-modal-card,
.review-modal-fade-leave-active .review-modal-card {
  transition: transform 0.16s ease, opacity 0.16s ease;
}

.review-modal-fade-enter-from,
.review-modal-fade-leave-to {
  opacity: 0;
}

.review-modal-fade-enter-from .review-modal-card,
.review-modal-fade-leave-to .review-modal-card {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
@media (max-width: 1080px) {
  .lesson-head {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .lesson-meta {
    flex-wrap: wrap;
    gap: 12px 24px;
  }

  .online-count {
    position: static;
    grid-column: 1 / -1;
    justify-self: end;
    margin-top: -8px;
  }

  .media-panel,
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .control-stage {
    grid-template-columns: 160px minmax(0, 1fr);
    padding: 22px 32px;
  }
}

@media (max-width: 900px) {
  .live-main {
    --panel-top-offset: 8px;
    --panel-bottom-gap: 24px;
    margin-left: 0;
    padding: var(--panel-top-offset) 12px var(--panel-bottom-gap);
  }

  .live-shell {
    min-height: 0;
  }

  .top-panel {
    padding: 14px;
  }
}

@media (max-width: 640px) {

  .lesson-head h1 {
    font-size: 21px;
    line-height: 30px;
  }

  .top-panel,
  .control-panel,
  .data-panel {
    padding: 12px;
  }

  .data-panel {
    height: auto;
    min-height: 420px;
  }

  .control-tabs {
    overflow-x: auto;
  }

  .tab-button {
    flex: 0 0 auto;
  }

  .control-stage {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 18px 12px;
  }

  .camera-actions {
    grid-template-columns: 1fr;
  }

  .metric-row {
    grid-template-columns: 72px minmax(0, 1fr);
  }

  .message-compose {
    grid-template-columns: minmax(0, 1fr);
  }

  .metric-values {
    grid-auto-flow: row;
    grid-auto-rows: minmax(42px, auto);
  }

  .metric-item {
    border-left: 1px solid rgba(217, 228, 242, 0.92);
    border-top: 1px solid rgba(217, 228, 242, 0.92);
  }

  .metric-item:first-child {
    border-top: 0;
  }

  .control-tip {
    white-space: normal;
  }
}
</style>