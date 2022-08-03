<template>
  <div class="tab-bar">
    <van-tabbar route v-model="currentIndex" active-color="#ff9854">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" />
            <img v-else :src="getAssetURL(item.imageActive)" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar'
import { getAssetURL } from '@/utils/load_assets'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router';

const currentIndex = ref(0)
// 解决一个小bug  监听路由改变找到对应的索引
const route = useRoute()
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if (index === -1) return
  currentIndex.value = index
})

//显示右上角提示信息  后续添加功能
// const badge = ''
// const tabbarItemClick = (index) => {
//   if(index === 2) {
//     return  badge="3"
//   }
// }
</script>

<style lang="less" scoped>
.tab-bar {
  // :deep(.class)找到子组件的类, 让子组件的类也可以生效
  :deep(.van-tabbar-item__icon) {
    font-size: 50px;
  }

  img {
    height: 26px;
  }
}
</style>
