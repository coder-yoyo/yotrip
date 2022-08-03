<template>
  <div class="search">
    <div class="select-time">

      <div class="item start">
        <div class="name">住</div>
        <div class="date">{{ startDateStr }}</div>
      </div>

      <div class="item leave">
        <div class="name">离</div>
        <div class="date">{{ endDateStr }}</div>
      </div>
    </div>

    <div class="content">
      <div class="keyword">
        关键字/位置/民宿
      </div>
      <div class="right">
        <i class="icon-search"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { formatMonthDay } from '@/utils/format_data';



const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value, 'MM.DD'))
const endDateStr = computed(() => formatMonthDay(endDate.value, 'MM.DD'))
</script>

<style lang="less" scoped>
  .search {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 10px;
    font-size: 14px;
    border-radius: 6px;
    background: #f2f4f6;
    .select-time {
      display: flex;
      flex-direction: column;
      color: var(--primary-color);
      .item {
        display: flex;
        align-items: center;
        height: 12px;
        font-size: 10px;
        margin: 2px;
        .name{
          font-size: 10px;
        }

        .date {
          position: relative;
          color: #333;
          margin: 0 10px 0 3px;
          font-weight: 500;
        }
      }

      .leave .date::after {
        content: " ";
        width: 0;
        height: 0;
        border: 4px solid #666;
        border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #666;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
        position: absolute;
        bottom: -3px;
        right: -12px;
        }
      }

      .content {
        position: relative;
        display: flex;
        align-items: center;
        flex: 1;
        padding: 0 6px;
        text-align: left;
        border-left: 1px solid #fff;

        .keyword {
          max-width: 155px;
          font-size: 12px;
          color: #999;
        }

      }

      .right {
        display: flex;
        align-items: center;
        
        .icon-search {
          position: absolute;
          right: 0;
          display: inline-block;
          background-image: url(../../assets/img/home/home-sprite.png);
          width: 24px;
          height: 24px;    
          background-position: -29px -151px;
          background-size: 207px 192px;
        }
      }
    }
</style>