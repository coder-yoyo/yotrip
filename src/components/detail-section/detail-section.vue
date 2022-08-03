<template>
  <div class="section">
    <div class="header">
      <div class="title">
       {{ title }}
      </div>
    </div>

    <div class="content">
      <slot>
        我是默认内容
      </slot>
    </div>

    <div class="footer">
      <span class="more" v-if="moreText.length">
        {{ moreText }}
        <van-icon name="arrow" />
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '我是默认标题'
  },

  moreText: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
  .section {
    padding: 0 15px;
    margin-top: 12px;
    // border-top: 2px solid #f2f3f4;
    background-color: #fff;

    .header {
      height: 50px;
      line-height: 50px;
      border-bottom: 1px solid #eee;

      .title {
        font-size: 20px;
        font-weight: 700;
        color: #333;
      }
    }

    .content {
      padding: 8px 0;
    }

    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 44px;
      line-height: 44px;
      color: var(--primary-color);
      font-size: 14px;
      font-weight: 600;
      

    }
  }
</style>