<template>
  <div class="home-item">
    <div class="item-info">
      <div class="cover">
        <img :src="itemData.image.url" alt="">
      </div>

      <div class="desc">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span>{{ itemData.location }}</span>
        </div>
        
        <div class="name">{{ itemData.houseName }}</div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="price">
          <div class="newprice">
            ¥ {{ itemData.finalPrice }}
          </div>
          <div class="oldprice">
            ¥ {{ itemData.productPrice }}
          </div>
          <div class="tip" v-if="itemData.priceTipBadge">
            {{ itemData.priceTipBadge.text}}
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

  const props = defineProps({
    itemData: {
      type: Object,
      default: () => {}
    }
  })

</script>

<style lang="less" scoped>
  .home-item {
    width: 50%;

    .item-info {
      margin: 5px;
      background: #fff;
      border-radius: 6px;
      overflow: hidden;

      .cover {
        img {
          width: 100%;
        }
      }

      .desc {
        padding: 8px 10px;
        color: #666;
        font-size: 12px;

      .location {
        display: flex;
        align-items: center;
        img {
          width: 12px;
        }
      }
        .name {
          margin: 5px 0;
          font-size: 14px;
          line-height: 1.25;
          color: #333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          }

        .price {
          display: flex;
          align-items: flex-start;
          margin: 8px 0;

          .newprice {
            color: var(--primary-color);
            font-size: 14px;
          }

          .oldprice {
            margin: 0 3px;
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
          }

          .tip {
            background: linear-gradient(270deg,#f66,#ff9f9f);
            color: #fff;
            padding: 2px 6px;
            border-radius: 8px;
          }
        }
      }
    }
  }
</style>