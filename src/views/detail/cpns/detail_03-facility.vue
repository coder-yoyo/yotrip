<template>
  <div class="falility">
    <detail-section title="房屋设施" more-text="查看全部设施">
      <div class="infos">
        <template v-for="(item, index) in houseFacility.houseFacilitys">
        <!-- 判断需要展示的图标 -->
          <div class="item" v-if="houseFacility.facilitySort?.includes(index)">
            <div class="left">
              <img :src="item.icon" alt="">
              <div class="text">{{ item.groupName }}</div>
            </div>

            <div class="right">
              <template v-for="(iten, indexx) in item.facilitys.slice(0, 4)" :key="indexx">
                <div class="desc">
                  <i class="icon_check icon"></i>
                  <span>{{ iten.name }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </detail-section>
  </div>
</template>

<script setup>
import DetailSection from '@/components/detail-section/detail-section.vue';

defineProps({
  houseFacility: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="less" scoped>
.falility {
  .infos {
    padding: 5px 0;
    border-radius: 6px;
    font-size: 12px;
    background-color: #f7f9fb;
    .item {
      display: flex;
      margin: 25px 10px;
      .left {
        width: 90px;
        text-align: center;
        margin-right: 40px;

        img {
          width: 20px;
          height: 20px;
        }

        .text {
          margin-top: 5px;
          color: #000;
        }
      }

       .right {
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          .desc {
            display: flex;
            align-items: center;
            width: 50%;
            margin: 4px 0;
          }
      }
    }
  }
}
</style>