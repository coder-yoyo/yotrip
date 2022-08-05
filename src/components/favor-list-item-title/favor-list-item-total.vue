<template>
  <div class="favor-list-item-total">
    <div class="info">
      <van-tag class="tip" color="#3f4954" text-color="#fff">
        {{ itemData.address }}
      </van-tag>
      <span class="name">{{ itemData.unit }}</span>
      <span class="desp">{{ itemData.unitDesp }}</span>
    </div>
    <div class="title ellipsis-text-2">{{ itemData.unitName }}</div>
  </div>
</template>

<script setup>
defineProps({
  itemData: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="less" scoped>

.info {
  display: flex;
  align-items: center;

  .tip {
    white-space: nowrap;
  }

  .name,
  .desp {
    font-size: 12px;
    white-space: nowrap;
    color: #666;
  }
  .name {
    position: relative;
    margin-left: 10px;
    margin-right: 10px;

    &::after {
      position: absolute;
      content: "";
      top: 45%;
      right: -25%;
      width: 2px;
      height: 2px;
      border-radius: 2px;
      background-color: #666;
    }
  }
}

.title {
  line-height: 22px;
  font-size: 18px;
  margin-top: 8px;
  font-weight: 500;
}
</style>