<template>
  <div class="city-reset">
    <div class="select location botto_line_color">
      <div class="city" @click="resetCityClick">{{ currentCity.cityName }}</div>
      <div class="mylocation" @click="positionClick">
        <span class="desc">我的位置</span>
        <img src="@/assets/img/home/Location_icon.png" alt="" />
      </div>
    </div>

    <div class="select order-room botto_line_color" @click="showClick">
      <div class="item in-room">
        <span class="state">入住</span>
        <span class="time">{{ startDateStr }}</span>
      </div>
      <div class="total-night">
        共{{ totalNight }}晚
      </div>
      <div class="item leave-room">
        <span class="state">离店</span>
        <span class="time">{{ endDateStr }}</span>
      </div>

      <!-- 日期选择表 -->
    </div>
    <van-calendar v-model:show="show" 
                    type="range" 
                    color="#ff9854"
                    :show-confirm="false"
                    @confirm="onConfirm" 
                    :formatter="formatter"
      />

    <div class="tips select botto_line_color">
      <div class="state">价格不限</div>
      <div class="desc">人数不限</div>
    </div>
    
    <div class="select botto_line_color">关键字/位置/民宿名</div>

    <!-- 热门城市推荐 -->
    <div class="hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="hotcity">
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 即刻搜索 -->
    <div class="select search-btn">
      <div class="btn" @click="startSearch">开始搜索</div>
    </div>
  </div>


  
</template>

<script setup>

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { formatMonthDay, getTotalDays } from '@/utils/format_data'
import useMainStore from '@/stores/modules/main';
import myBMap from '@/utils/find_mycity'

// 城市选择页面跳转
const router = useRouter()
  const resetCityClick = () => {
    router.push('/city')
  }

// 拿到cityStore
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 定位到当前的位置
  const positionClick = () => {
    myBMap.init().then(BMap=>{
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition((position)=>{
        let city = position.address.city;             //获取城市信息
        let province = position.address.province; 
        currentCity.value.cityName = city    //获取省份信息
        // console.log(city)
        // console.log(province)
      },(e)=>{
        console.log(e)
        console.log('定位失败')
      }, {provider: 'baidu'})
    })
}


//日期范围的处理
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const totalNight = ref(getTotalDays(startDate.value, endDate.value))
// 日历选项
let show = ref(false)
//是否显示日历
const showClick = () => {
  show.value = true
}

//显示预定的时间
const onConfirm = (value) => {
  // console.log(value)
  const selectStarDate = value[0]
  // console.log(selectStarDate)  标准时间
  const selectEndDate = value[1]
  mainStore.startDate = selectStarDate
  mainStore.endDate = selectEndDate
  totalNight.value = getTotalDays(selectStarDate, selectEndDate)
  show.value = false

}

// 修改日期的备注
 const formatter = (day) => {
    if (day.type === 'start') {
      day.bottomInfo = '入住';
    } else if (day.type === 'end') {
      day.bottomInfo = '离店';
    }
    return day;
 }

// 展示home的hot-suggest数据
const homeStore = useHomeStore()
const { hotSuggests } = storeToRefs(homeStore)

// 即刻搜索
const startSearch = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.value.cityName
    }
  })
}
</script>

<style lang="less" scoped>
  .city-reset {
    --van-calendar-popup-height: 60%;
    .select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      padding: 0 20px;
    }
    .location {

      .city {
        flex: 1;
      }

      .mylocation {
        width: 74px;
        display: flex;
        align-items: center;

        .desc {
          font-size: 12px;
        }

        img {
          width: 18px;
          margin-left: 5px;
        }
      }
    }

    .order-room {

      .item {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 44px;
        width: 74px;

        .state {
          font-size: 12px;
          color: #999;
        }

        .time {
            margin-top: 3px;
            color: #333;
            font-size: 15px;
            font-weight: 500;
        }
      }
    }

    .tips {
      color: #666;
      .desc {
        width: 74px;
        height: 44px;
        line-height: 44px;
        border-left: 1px solid  var(--line-color);
      }
    }

    .hot-suggest {
      display: flex;
      flex-wrap: wrap;
      text-align: center;
      padding: 10px 20px;
      .hotcity {
        padding: 4px 8px;
        margin: 4px;
        border-radius: 14px;
        color: rgb(63, 73, 84);
        font-size: 12px;
        background-color: rgb(241, 243, 245);
      }


    }

    .search-btn {
      // width: ;
      .btn {
        flex: 1;
        height: 40px;
        line-height: 40px;
        color: #fff;
        text-align: center;
        border-radius: 22px;
        font-size: 18px;
        font-weight: 500;
        background-image: var(
          --tjc-theme-linear-gradient,
          linear-gradient(90deg, #fa8c1d, #fcaf3f));
        }
  }
}
</style>
