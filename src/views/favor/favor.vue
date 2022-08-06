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

        <van-tab title="房东" name="landlord">
          <div class="content">
            <div v-if="landlordlist.length" class="list"></div>

            <div v-else class="no-data">
              <img 
                class="icon-no-data" 
                src="@/assets/img/favor/empty_favorite.44731802.png" 
                alt=""
              />
              <div class="name">暂无收藏</div>
              <div class="desp">
                点击
                <img src="@/assets/img/favor/favor.png" alt="">
                即可收藏对应房东
              </div>
              <div class="btn" @click="handleBtnClick">随便去逛逛</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <div v-if="active === 1" class="history">
      <div class="content">
        <template v-for="(item, index) in historylist">
          <favor-list-item :item-data="item"></favor-list-item>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/nav-bar/nav-bar.vue';
import useFavorStore from '@/stores/modules/favor'
import { storeToRefs } from 'pinia';
import FavorListItem from '@/components/favor-list-item/favor-list-item.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const titles = ['我的收藏', '浏览历史']
const active = ref(0)
const activeName = ref('house')

const favorStroe = useFavorStore()
favorStroe.fetchFavorList()
favorStroe.fetchHistoryList()
const { favorlist, historylist, landlordlist } = storeToRefs(favorStroe)

const handleBtnClick = () => {
  router.push('/')
}


</script>

<style lang="less" scoped>
.favor {
  padding: 10px 20px 55px 20px;
  .no-data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-no-data {
      width: 100%;
    }
    .name {
      color: #333;
      font-size: 18px;
      font-weight: 500;
      line-height: 27px;
    }
    .desp {
      color: #666;
      line-height: 18px;
      font-size: 14px;
      margin: 7px auto 36px;

      img {
        position: relative;
        top: 4px;
        width: 12px;
      }
    }
    .btn {
      padding: 0 38px;
      height: 40px;
      line-height: 40px !important;
      font-size: 16px;
      color: #fff;
      background: var(--primary-color);
      border-radius: 20px;
      border: none;
      outline: none;
    }
  }
}
</style>
