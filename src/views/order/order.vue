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

    <div class="content">
      <div v-if="orderlist?.length">
        <template v-for="(item, index) in orderlist" :key="item">
          <order-item :item-data="item"></order-item>
        </template>
      </div>

      <div v-else="!orderlist.length" class="tips">
        <img src="@/assets/img/order/icon-order.png" alt="" />
        <div class="title">近期暂无订单</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia';
import useOrderStore from '@/stores/modules/order'
import NavBar from '@/components/nav-bar/nav-bar.vue';
import OrderItem from "./cpns/order-itme.vue"

const orderStore = useOrderStore()
// 发送网络请求
orderStore.fetchOrderListData()
const { currentOrder, orderlist, orderTitles } = storeToRefs(orderStore)
// 用来判断订单数据类型
const orderTitleType = ["all", "recent", "pend"]

watch(currentOrder, (newValue, oldVaule) => {
  if (newValue !== undefined) {
    orderStore.fetchOrderListData(orderTitleType[newValue])
  }
})
</script>

<style lang="less" scoped>
.order {
  height: 100vh;
  --van-tabs-line-height: 40px;
  padding-bottom: 55px;

  .content {
    height: calc(100% - 86px);
    overflow: scroll;

    .tips {
      text-align: center;
      margin-top: 80px;
      img {
        width: 88%;
      }

      .title {
        margin-top: 20px;
        color: #000;
        font-size: 18px;
      }
    }
  }
}
</style>
