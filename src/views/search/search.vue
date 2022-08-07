<template>
  <div class="search">
    <div class="search-nav-bar">
      <nav-bar>
        <template #title>
          <search-bar
            class="search-bar"
            :title="routeQuery.currentCity"
            :start-date="routeQuery.startDate"
            :end-date="routeQuery.endDate"
            :key-word="keyWord"
            :cancel-icon="showCancelIcon"
            @cancel-click="handleCancelClick"
            @searchClick="handleSearchClick"
          >

          </search-bar>
        </template>
      </nav-bar>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import SearchBar from '@/components/search-bar/search-bar.vue';

const route = useRoute()
const router = useRouter()
const routeQuery = ref(route.query)
const showCancelIcon = ref(false)
const showSearchPanel = ref(false)
const PLACEHOLDER = "搜索博尔塔拉的景点、地标、房源";
const keyWord = ref(PLACEHOLDER)

// 取消按钮的处理
const handleCancelClick = () => {
  keyWord.value = PLACEHOLDER
  showCancelIcon.value = false
}

//
const handleTagClick = (value) => {
  showSearchPanel.value = false
  if (value.keyWord) {
    showCancelIcon = true
    keyWord.value = value.keyWord
  }

}

const handleSearchClick = () => {
  showSearchPanel.value = true;
}

</script>

<style lang="less" scoped>
:deep(.van-sticky--fixed .guide-login) {
  margin-left: 0;
  margin-right: 0;
}
.search {
  overflow: hidden;
  width: 100%;
  height: 100%;
  .search-nav-bar {
    position: fixed;
    width: 100%;
    z-index: 100;
  }
  .search-conditions {
    padding-top: 46px;
  }
  .tab-wrapper {
    padding: 12px 0 10px 20px;
    background-color: #f7f8fb;
  }
  .list {
    padding: 141px 20px 0 20px;
    z-index: -1;
    position: relative;
  }
}
</style>