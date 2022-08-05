<template>
  <div class="favor-side-bar">
    <img class="avatar" :src="itemData.logoUrl" alt="">
    <div class="collection">
      <img class="heart-img" src="@/assets/img/search/tj-mob-ui_unit-item_collected-new.png" alt="">
      <span v-if="itemData.favoriteCount">{{ itemData.favoriteCount }}</span>
    </div>

    <div class="message">
      <img class="msg-img" src="@/assets/img/search/tj-mob-ui_unit-item_comment-new.png" alt="">
      <span v-if="itemData.totalCount">{{ itemData.totalCount}}</span>
    </div>
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
.favor-side-bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 5px;
  }

  .message,
  .collection {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;

    .msg-img,
    .heart-img {
      width: 30px;
      height: 30px;
    }

    span {
      color: #fff;
    }
  }
}
</style>