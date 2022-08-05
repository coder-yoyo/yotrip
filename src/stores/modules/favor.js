import { defineStore } from "pinia";
import { getFavorList, getHistoryList } from '@/services'

const useFavorStore = defineStore('favor', {
  state: () => ({
    favorlist: [],
    historylist: null,
    landlordlist: null
  }),

  actions: {
    async fetchFavorList() {
      const res = await getFavorList()
      this.favorlist = res.data.data.items
      console.log(this.favorlist)
    },

    async fetchHistoryList() {
      const res = await getHistoryList()
      this.historylist = res.data.data.items
      // console.log(this.historylist)
    }
  }
})

export default useFavorStore