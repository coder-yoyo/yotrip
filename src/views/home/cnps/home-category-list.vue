<template>
  <van-tabs class="category" 
            line-height="0"
            color='#ff9854'
            title-active-color="#ff9854"
  >

    <template v-for="(item, index) in categories" :key="item">
      <van-tab class="list"
               #title
        >
        <div class="item">
          <img :src="item.pictureUrl" :alt="index">
          <div class="title">
            {{ item.title }}
          </div>
        </div>
      </van-tab>
    </template>
  </van-tabs>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';

  const homeStore = useHomeStore()
  const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
  .category{
    margin-top: 20px;
      .item {
        text-align: center;
        line-height: 1;
          img {
            width: 32px;
          }
          .title {
            font-size: 12px;
          }
      }

  }

</style>