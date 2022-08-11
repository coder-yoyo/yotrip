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
          ></search-bar>
        </template>
      </nav-bar>
      <!-- 位置欢迎度排序  筛选 -->
      <dropdown-select :items-data="searchConditions"></dropdown-select>

      <!-- 优惠--多人入住 -->
      <div class="tab-wrapper">
        <tab-select :items-data="searchHouse.hotFilters"></tab-select>
      </div>
    </div>
    <div class="list">
      <template v-for="(item, index) in searchHouse.items">
        <favor-list-item :item-data="item"></favor-list-item>
      </template>
    </div>

    <!-- 点击搜索显示搜索面板 -->
    <search-panel
      v-if="showSearchPanel"
      :searchPanelDatas="guessulike.groups"
      @cancel="handleCancel"
      @search="handleSearch"
      @tag-click="handleTagClick"
      @result-item-click="handleResultItemClick"
    >
    </search-panel>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import SearchBar from '@/components/search-bar/search-bar.vue';
import DropdownSelect from '@/components/dropdown-select/dropdown-select.vue';
import TabSelect from '@/components/tab-select/tab-select.vue';
// 这里和favor展示界面一样
import FavorListItem from '@/components/favor-list-item/favor-list-item.vue';
import SearchPanel from './cpns/search-panel/search-panel.vue';
import { getSearchHouse, getSearchConditions, getGuessulike } from "@/services";


const route = useRoute()
const router = useRouter()
const routeQuery = ref(route.query)
const PLACEHOLDER = "搜索博尔塔拉的景点、地标、房源"
// 定义变量
const showCancelIcon = ref(false)
const showSearchPanel = ref(false)

const keyWord = ref(PLACEHOLDER)
// 网络请求数据保存处
const searchHouse = ref([]);
const searchConditions = ref([]);
const guessulike = ref([]);

// 发送网络请求
getSearchConditions().then((res) => {
  searchConditions.value = res.data.data.allConditions;
  // console.log(searchConditions.value)
});
getSearchHouse().then((res) => {
  searchHouse.value = res.data.data;
  // console.log(searchHouse.value)
});
getGuessulike().then((res) => {
  guessulike.value = res.data;
  // console.log(guessulike.value)
});

// 取消按钮的处理
const handleCancelClick = () => {
  keyWord.value = PLACEHOLDER
  showCancelIcon.value = false
}

const handleSearchClick = () => {
  showSearchPanel.value = true;
}
// 点击搜索事件处理
const handleCancel = () => {
  showSearchPanel.value = false;
};
const handleSearch = () => {};
const handleTagClick = (value) => {
  showSearchPanel.value = false;
  if (value.keyWord) {
    showCancelIcon.value = true;
    keyWord.value = value.keyWord;
  } else {
    showCancelIcon.value = false;
  }
};

const handleResultItemClick = (item) => {
  console.log(item.name)
  handleTagClick({
    keyWord: item.name,
  });
};

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