<script setup lang="ts">
import firstRankImage from '../../assets/评价报表/第一名.svg'
import secondRankImage from '../../assets/评价报表/第二名.svg'
import thirdRankImage from '../../assets/评价报表/第三名.svg'
import avatarImage from '../../assets/评价报表/演示头像.svg'
import titleLeftIcon from '../../assets/评价报表/排名文字左侧的图标.svg'
import titleRightIcon from '../../assets/评价报表/排名文字右侧的图标.svg'
import type { EvaluationRankingItem } from '../../mocks/evaluationReport'

const props = defineProps<{
  title: string
  items: EvaluationRankingItem[]
  showAvatarList?: boolean
}>()

const podiumImageByRank: Record<number, string> = {
  1: firstRankImage,
  2: secondRankImage,
  3: thirdRankImage,
}

const podiumItems = [2, 1, 3]
  .map((rank) => props.items.find((item) => item.rank === rank))
  .filter((item): item is EvaluationRankingItem => Boolean(item))

const listItems = props.items.filter((item) => item.rank > 3)

const formatScore = (score: number) => `${score.toFixed(1)}分`
</script>

<template>
  <article class="ranking-card">
    <header class="ranking-header">
      <div class="ranking-title">
        <img :src="titleLeftIcon" alt="" aria-hidden="true" />
        <h2>{{ title }}</h2>
        <img :src="titleRightIcon" alt="" aria-hidden="true" />
      </div>
      <button class="more-button" type="button">更多 <span aria-hidden="true">›</span></button>
    </header>

    <div class="podium" :class="{ 'course-podium': !showAvatarList }">
      <div
        v-for="item in podiumItems"
        :key="item.rank"
        class="podium-item"
        :class="`rank-${item.rank}`"
      >
        <img class="podium-bg" :src="podiumImageByRank[item.rank]" alt="" aria-hidden="true" />
        <div class="podium-copy">
          <strong>{{ item.name }}</strong>
          <span>{{ formatScore(item.score) }}</span>
        </div>
      </div>
    </div>

    <ol class="ranking-list">
      <li
        v-for="item in listItems"
        :key="item.rank"
        class="ranking-row"
        :class="{ 'without-avatar': !showAvatarList }"
      >
        <span class="row-rank">{{ item.rank }}</span>
        <img v-if="showAvatarList" class="row-avatar" :src="avatarImage" alt="" aria-hidden="true" />
        <span class="row-name" :title="item.name">{{ item.name }}</span>
        <span class="row-score">{{ formatScore(item.score) }}</span>
      </li>
    </ol>
  </article>
</template>

<style scoped>
.ranking-card {
  min-width: 0;
  padding: 26px 28px 28px;
  border-radius: 8px;
  background: rgba(255, 252, 246, 0.92);
  box-sizing: border-box;
}

.ranking-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 28px;
  margin-bottom: 16px;
}

.ranking-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 0;
}

.ranking-title img {
  width: 20px;
  height: 14px;
  display: block;
}

h2 {
  margin: 0;
  color: #bd7a12;
  font: 700 20px/28px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  letter-spacing: 0;
  white-space: nowrap;
}

.more-button {
  position: absolute;
  right: 0;
  top: 3px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  color: #9b6a24;
  background: transparent;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  cursor: pointer;
}

.podium {
  display: grid;
  grid-template-columns: minmax(108px, 1fr) minmax(128px, 1.12fr) minmax(108px, 1fr);
  align-items: end;
  justify-items: center;
  gap: 8px;
  min-height: 236px;
  margin-bottom: 14px;
}

.podium-item {
  position: relative;
  width: min(100%, 160px);
  aspect-ratio: 160 / 207;
}

.podium-item.rank-2,
.podium-item.rank-3 {
  width: min(100%, 142px);
}

.podium-bg {
  width: 100%;
  height: 100%;
  display: block;
}

.podium-copy {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 42px;
  display: grid;
  gap: 10px;
  justify-items: center;
  text-align: center;
}

.rank-1 .podium-copy {
  bottom: 52px;
}

.rank-2 .podium-copy,
.rank-3 .podium-copy {
  bottom: 38px;
}

.podium-copy strong {
  max-width: 100%;
  overflow: hidden;
  color: #bd7a12;
  font: 600 15px/21px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rank-2 .podium-copy strong {
  color: #6077a5;
}

.rank-3 .podium-copy strong {
  color: #c16d56;
}

.podium-copy span {
  color: currentColor;
  font: 600 16px/22px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.rank-1 .podium-copy span {
  color: #bd7a12;
}

.rank-2 .podium-copy span {
  color: #6077a5;
}

.rank-3 .podium-copy span {
  color: #c16d56;
}

.ranking-list {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ranking-row {
  display: grid;
  grid-template-columns: 42px 34px minmax(0, 1fr) auto;
  align-items: center;
  min-height: 50px;
  padding: 0 28px 0 20px;
  border-radius: 8px;
  background: rgba(246, 247, 250, 0.86);
  color: #191c1e;
  box-sizing: border-box;
}

.ranking-row.without-avatar {
  grid-template-columns: 42px minmax(0, 1fr) auto;
  column-gap: 10px;
}

.row-rank {
  color: #191c1e;
  font: 500 15px/21px 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.row-avatar {
  width: 30px;
  height: 30px;
  display: block;
}

.row-name {
  min-width: 0;
  overflow: hidden;
  padding-right: 12px;
  color: #191c1e;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-score {
  color: #191c1e;
  font: 400 14px/20px 'PingFang SC', 'Microsoft YaHei', sans-serif;
  white-space: nowrap;
}

@media (max-width: 1180px) {
  .ranking-card {
    padding: 22px 22px 24px;
  }

  .podium {
    min-height: 210px;
  }
}

@media (max-width: 560px) {
  .ranking-card {
    padding: 20px 16px;
  }

  .ranking-header {
    justify-content: flex-start;
  }

  h2 {
    font-size: 17px;
  }

  .more-button {
    position: static;
    margin-left: auto;
  }

  .podium {
    grid-template-columns: repeat(3, minmax(92px, 1fr));
    overflow-x: auto;
    justify-items: center;
  }

  .ranking-row {
    padding-right: 14px;
    padding-left: 14px;
  }
}
</style>
