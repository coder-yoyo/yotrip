<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      class="tabs"
      v-if="showTabControl"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />

    <van-nav-bar
      title="房屋详情"
      left-text="YO旅"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />

      <detail-infos
        name="描述"
        :ref="getSectionRef"
        :top-infos="mainPart.topModule"
      />

      <detail-facility
        name="设施"
        :ref="getSectionRef"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />

      <detail-landlord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />

      <detail-comment
        name="评论"
        :ref="getSectionRef"
        :comments="mainPart.dynamicModule.commentModule"
      />

      <detail-notice
        name="须知"
        :ref="getSectionRef"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />

      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />

      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">YOYO静旅, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/services'

import TabControl from '@/components/tab-control/tab-control.vue'
import DetailSwipe from './cpns/detail_01-swipe.vue'
import DetailInfos from './cpns/detail_02-infos.vue'
import DetailFacility from './cpns/detail_03-facility.vue'
import DetailLandlord from './cpns/detail_04-landlord.vue'
import DetailComment from './cpns/detail_05-comment.vue'
import DetailNotice from './cpns/detail_06-notice.vue'
import DetailMap from './cpns/detail_07-map.vue'
import DetailIntro from './cpns/detail_08-intro.vue'
import useScroll from '@/hooks/useScroll'

const route = useRoute()
const router = useRouter()
// 拿到房子标识
const houseId = route.params.id

const detailInfos = ref({})
// 这里还有一个bug
const mainPart = computed(() => detailInfos?.value?.mainPart)
//网络请求获取数据  下面改变上面也改
getDetailInfos(houseId).then((res) => {
  detailInfos.value = res.data
})

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// tabControl相关操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)

// 控制是否显示tabControl
const showTabControl = computed(() => {
  return scrollTop.value >= 320
})

// 获取tabControl的标题
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
// 将每一个组件添加到sectionEls里面(键值对对应)
const getSectionRef = (value) => {
  // 解决元素没有渲染的问题
  if (value) {
    const name = value.$el.getAttribute("name")
    sectionEls.value[name] = value.$el
  }
}
// 来自隔壁的联动(发射过来的事件tabItemClick)
let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  // 拿到当前选中的key
  const key = Object.keys(sectionEls.value)[index]
  // 拿到当前选中的元素
  const el = sectionEls.value[key]
  // 拿到元素高度
  let distance = el.offsetTop
  // 第一个不需要  后面的需要-44(tabControl的高度)来停到想要的位置
  if (index !== 0) {
    distance = distance - 44
  }
  // 点击之后改变状态
  isClick = true
  currentDistance = distance

  //点击来到响应的位置 
  detailRef.value.scrollTo({
    top: distance,
    behavior: 'smooth',
  })
}


// detail滚动tabControl自动变动
const tabControlRef = ref()
// 监听滚动
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return
  // 获取到每一个元素
  const els = Object.values(sectionEls.value)
  // 拿到每一个元素的高度
  const values = els.map(el => el.offsetTop)
  // 根据新的scrollTop匹配索引
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(tabControlRef.value)
  //这种放法不行
  // tabControlRef.value?.currentIndex = index
    tabControlRef.value?.setCurrentIndex(index)
})
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
