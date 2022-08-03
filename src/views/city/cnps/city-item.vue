<template>
  <div class="city-item">
    <van-index-bar :index-list="listItem">
      <van-index-anchor index="热门" />
      <!-- 热门城市展示 -->
      <div class="list">
        <template v-for="(city, index) in itemData.hotCities" :key="index">
          <div class="hotcity" @click="cityClick(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <!-- left字母导航展示 -->
      <template v-for="(cityItem, itemIndex) in itemData.cities" :key="itemIndex">
        <van-index-anchor :index="cityItem.group" />
        <!-- 城市名称展示 -->
        <template v-for="(city, cityIndex) in cityItem.cities" :key="cityIndex">
           <van-cell :title="city.cityName" @click="cityClick(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
// import useCityStore from '@/stores/modules/city';
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

// 接受父组件传过来的数据
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({})
  }
})

// 动态索引
const listItem = computed(() => {
//每一个item的group映射到list数组
  const list = props.itemData.cities.map(item => item.group)
  list.unshift('#')
  return list
})
console.log(listItem)

//点击切换首页当前城市
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  cityStore.currentCity = city

  // 返回上一级
  router.back()
}
</script>

<style lang="less" scoped>
.city-item {
  --van-index-bar-index-active-color: var(--primary-color);
  --van-index-anchor-sticky-text-color: var(--primary-color);
  .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;

  .hotcity {
    width: 70px;
    height: 28px;
    border-radius: 14px;
    font-size: 12px;
    color: #000;
    text-align: center;
    line-height: 28px;
    background-color: #fff4ec;
    margin: 5px 0;
  }

}
}

</style>