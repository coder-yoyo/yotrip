<template>
  <div class="home-data-list">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in homeitem" :key="item.data.houseId">
        <home-item-v3 
          v-if="item.discoveryContentType === 3" 
          :item-data="item.data"
          @click="itemClick(item.data)"  
        />
        <home-item-v9 
          v-else-if="item.discoveryContentType === 9" 
          :item-data="item.data"
          @click="itemClick(item.data)"
          />
      </template>
    </div>
  </div>
</template>

<script setup>
import HomeItemV3 from '@/components/home-item-v3/home-item-v3.vue';
import HomeItemV9 from '@/components/home-item-v9/home-item-v9.vue';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const homeStore = useHomeStore()
const { homeitem } = storeToRefs(homeStore)
// console.log(homeitem)

const router = useRouter()
const itemClick = (item) => {
  //点击首页房屋item跳转到detail页面
  router.push('/detail/' + item.houseId)
}
</script>

<style lang="less" scoped>
  .home-data-list {
    padding: 10px 8px;

    .title {
      font-size: 22px;
      padding: 10px;
      font-weight: 700;
      color: var(--primary-color);
    }

    .list {
      display: flex;
      flex-wrap: wrap;
    }
  }

</style>