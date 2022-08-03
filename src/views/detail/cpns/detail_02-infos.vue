<template>
  <div class="infos">
    <div class="name">{{ topInfos.houseName }}</div>

    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </span>
      </template>
    </div>

    <div class="comment use-many">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief.overall }}</span>
        <span class="title">{{ topInfos.commentBrief.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief.commentBrief }}</span>
      </div>

      <div class="right">
        <span class="count">
          {{ topInfos.commentBrief.totalCount }}条评论
          <van-icon name="arrow" />
        </span>
      </div>
    </div>

    <div class="position use-many">
      <div class="left">
        {{ topInfos.nearByPosition.address  }}
      </div>

      <div class="right">
        地图·周边
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  topInfos: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="less" scoped>
.infos {
  padding: 16px;
  background-color: #fff;
  .name {
    font-size: 20px;
    font-weight: 700;
    // 实现两端对齐的效果
    text-align: justify;
    line-height: 24px;
    margin-bottom: 6px;
    // 文本超出三行省略
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
  }
  .tags {
    margin: 10px 0;
    .item {
      font-size: 12px;
      margin: 0 2px;
      padding: 1px 3px;
      border-radius: 2px;
    }
  }

  .use-many {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 12px;
    background-color: #f5f7fa;
    .right {
      color: var(--primary-color);
    }
  }

  .comment {
    color: #333;
    font-weight: 700;
    .score {
      font-size: 18px;
    }

    .title {
      margin: 0 3px;
    }

    .brief {
      color: #666;
    }
  }

  .position {
    .left {
      font-size: 14px;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>
