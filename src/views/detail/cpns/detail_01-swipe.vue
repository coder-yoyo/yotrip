<template>
  <div class="swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>

      <template #indicator="{ active, total }">
        <div class="indicator">
          <template v-for="(value, key, index) in swipeGroup" :key="key">
            <span class="item" 
                  :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})
// 进行分组前的对象
const swipeGroup = {}
// 一次循环对其进行分组
for (const item of props.swipeData) {
  // 开始swipeGroup没有key  是underfined
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

// console.log(swipeGroup)
// 定义转换数据的方法
const nameReg = /(【.*?】)/i
const getName = (name) => {
  const results = nameReg.exec(name)
  // console.log(results)
  return results[1]
}

// 获取图片数据的index
const getCategoryIndex = (item) => {
  const valueArray = swipeGroup[item.enumPictureCategory]
  return valueArray.findIndex(data => data === item ) + 1
}
</script>

<style lang="less" scoped>
.swipe {

  .my-swipe {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 8px;
      display: flex;
      padding: 4px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, .5);
      border-radius: 6px;

      .item {
        margin: 0 1px;
        padding: 2px 3px;
        &.active  {
          // padding: 2px 3px;
          border-radius: 3px;
          background-color: rgba(255, 152, 84, .8);
          color: #fff;
        }
      }
    }
  }
}
</style>  