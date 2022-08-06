import { defineStore } from 'pinia'
import { getOrderList } from '@/services'

const useOrderStore = defineStore('order', {
  state: () => ({
    currentOrder: null,
    orderlist: [0],

  }),

  actions: {
    async fetchOrderListData() {
      const res = await getOrderList()
      this.orderlist = res.data.data.orders
      console.log(this.orderlist)
    }
  }
})

export default useOrderStore