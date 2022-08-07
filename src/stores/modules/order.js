import { defineStore } from 'pinia'
import { getOrderList } from '@/services'

const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null,
    orderlist: [],
    orderTitles: ["全部订单", "近期订单", "待支付"],
  }),

  actions: {
    async fetchOrderListData(slect) {
      const res = await getOrderList(slect)
      this.orderlist = res.data.data.orders
      // console.log(this.orderlist)
    }
  }
})

export default useOrderStore