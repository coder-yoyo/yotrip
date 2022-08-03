<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="" />
    </div>
    <HomeCityReset/>
    <CategoryList/>
    <div class="search-bar" v-if="isShowSearchBar">
      <SearchBar/>
    </div>
    <HomeDataList/>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './cnps/home-nav-bar.vue'
import HomeCityReset from './cnps/home-city-reset.vue';
import CategoryList from './cnps/home-category-list.vue';
import HomeDataList from './cnps/home-data-list.vue';
import SearchBar from '@/components/search-bar/search-bar.vue'


import useScroll from '@/hooks/useScroll';

const homeStore = useHomeStore()
// 网络请求
homeStore.fetchHotSuggestData()
homeStore.fetchHomeCategoriesData()
homeStore.fetchHomeItemlistData()
//拿到是否到底部   往上滚动的距离
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  // console.log(newValue)
  if (newValue) {
    // 新的值为true
    homeStore.fetchHomeItemlistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 定义可响应数据  可用计算属性  一改都改
//是否显示搜索框
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 515
})
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  .banner {
    img {
      width: 100%;
    }
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
