<template>
  <div class="favor">
    <NavBar left-text="YO旅">
      <template #title>
        <van-tabs v-model:active="active" type="card" shrink>
          <van-tab v-for="item in titles" :title="item"></van-tab>
        </van-tabs>
      </template>
    </NavBar>

    <!-- 我的  藏藏 -->
    <div class="favorite" v-if="active === 0">
      <van-tabs v-model:active="activeName">
        <van-tab title="房屋" name="house">
          <div class="content" v-if="favorlist">
            <template v-for="(item, index) in favorlist">
              <favor-list-item :item-data="item"></favor-list-item>
            </template>
          </div>
        </van-tab>

        <van-tab title="房东" name="house">
          <div class="content" v-if="favorlist">
            <template v-for="(item, index) in favorlist">
            <!-- {{ item }} -->
            </template>
          </div>
        </van-tab>

      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import useFavorStore from '@/stores/modules/favor'
import { storeToRefs } from 'pinia';
import FavorListItem from '@/components/favor-list-item/favor-list-item.vue';

const titles = ['我的收藏', '浏览历史']
const active = ref(0)
const activeName = ref('house')

const favorStroe = useFavorStore()
favorStroe.fetchFavorList()
favorStroe.fetchHistoryList()
const { favorlist, historylist } = storeToRefs(favorStroe)



</script>

<style lang="less" scoped>
.favor {
  padding: 10px 20px 55px 20px;
}
</style>
