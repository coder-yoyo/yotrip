<template>
  <div class="order">
    <van-sticky>
      <nav-bar title="订单列表"></nav-bar>
      <van-tabs
        v-model:active="currentOrder"
        title-active-color="#ff9854"
        :line-height="2"
      >
        <template v-for="(item, index) in orderTitles" :key="item">
          <van-tab :title="item" :name="index"></van-tab>
        </template>
      </van-tabs>
    </van-sticky>
  </div>
</template>

<script setup>
import useOrderStore from '@/stores/modules/order'
import NavBar from '@/components/nav-bar/nav-bar.vue';
import { storeToRefs } from 'pinia';

const orderStore = useOrderStore()
console.log(orderStore)
// // 发送网络请求
orderStore.fetchOrderListData()
const { currentOrder, orderlist } = storeToRefs(orderStore)
</script>

<style lang="less" scoped></style>
