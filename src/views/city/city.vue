<template>
  <div class="city">
    <div class="top">
      <!-- 搜索框 -->
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        background="#ff9854"
        show-action
        @cancel="onCancel"
      >
        <template #action v-if="searchValue">
          <div @click="onClickButton">搜索</div>
        </template>
      </van-search>

      <!-- 切换地域tab -->
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in citiesData" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="city-tips">
      <template v-for="(value, key, index) in citiesData">
        <city-item v-show="tabActive === key" :item-data="value"></city-item>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useCityStore from '@/stores/modules/city'
import { useRouter } from 'vue-router'
import CityItem from './cnps/city-item.vue'

const router = useRouter()

const searchValue = ref()
const tabActive = ref()

//搜索框取消事件
const onCancel = () => {
  router.back()
}
// 搜索框搜索事件
const onClickButton = () => {
  console.log('111111111111sousuo')
}

// 从Store中拿取数据
const cityStore = useCityStore()
// 先请求数据
cityStore.fetchCitiesData()
const { citiesData } = storeToRefs(cityStore)
</script>

<style lang="less" scoped>
// 解决city - tabbar头部被下面的数据遮挡问题
.city {
  .top {
    position: relative;
    z-index: 9;
  }

  .city-tips {
    height: calc(100vh - 98px);
    //布局滚动
    overflow-y: auto;
  }
}
</style>
