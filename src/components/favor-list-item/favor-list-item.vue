<template>
  <div class="favor-list-item">
    <div class="wrapper">
      <!-- 图片展示 -->
      <img class="banner" :src="houseData.defaultPicture" alt="">
      <!-- 评分 -->
      <div class="bottom">
        <favor-msg-tip :item-data="houseData.commentBriefForCD"></favor-msg-tip>
      </div>
      <!-- 侧边栏 -->
      <div class="side-bar">
        <favor-side-bar :item-data="getSideBarData"></favor-side-bar>
      </div>
    </div>
    <div class="content">
      <favor-list-item-title :item-data="getTitleData"></favor-list-item-title>
      <favor-list-item-info :item-data="getInfoData"></favor-list-item-info>
   </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import FavorMsgTip from '@/components/favor-msg-tip/favor-msg-tip.vue'
import FavorSideBar from '@/components/favor-side-bar/favor-side-bar.vue';
import FavorListItemTitle from '@/components/favor-list-item-title/favor-list-item-total.vue'
import FavorListItemInfo from '../favor-list-item-info/favor-list-item-info.vue';

const props = defineProps({
  itemData: {
    type: Object,
    default: () => {}
  }
});

const houseData = ref({})
// 监听数据变化
watch(() => props.itemData, (newValue, oldValue) => {
  houseData.value = newValue
},
{
  immediate: true
})

// 拿到侧边栏相应的数据
const getSideBarData = computed(() => {
  let data = houseData.value

  let favoriteCount = 0
  let totalCount = 0
  if (data.preloadHouse) {
    favoriteCount = data.preloadHouse.favoriteCount
    totalCount = data.preloadHouse.totalCount
  } else {
    totalCount = data.commentBriefForCD.totalCount
  }

  return {
    logoUrl: data.logoUrl,
    favoriteCount,
    totalCount
  }
})


// 拿到标题数据
const getTitleData = computed(() => {
  let data = houseData.value

  return {
    address: data.address,
    unit: data.unitSummeries[0]?.text,
    unitDesp: data.unitSummeries[1]?.text,
    unitName: data.unitName,
  }
})

// 拿到房屋描述info
const getInfoData = computed(() => {
  let data = houseData.value
  return {
    houseTags: data.houseTags,
    promoContent: data.promoContent,
    finalPrice: data.finalPrice,
    productPrice: data.productPrice,
    priceTipBadge: data.priceTipBadge,
  }
})
</script>

<style lang="less" scoped>
.favor-list-item {
  margin: 10px 0;

  .wrapper {
    position: relative;
    .banner {
      width: 100%;
      border-radius: 6px;
      margin-bottom: 7px;
    }

    .bottom {
      position: absolute;
      bottom: 15px;
      left: 10px;
      right: 10px;
    }

    .side-bar {
      position: absolute;
      bottom: 30px;
      right: 10px;
    }
  }
}
</style>