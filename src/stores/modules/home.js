import { defineStore } from "pinia";
import { getHomeHotSuggests, getHomeCategories, getHomeItemlist } from '@/services'

const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    // home下方数据展示
    nextPage: 1,
    homeitem: []
  }),

  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },

    async fetchHomeCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
      // console.log(this.categories)
    },

    async fetchHomeItemlistData() {
      const res = await getHomeItemlist(this.nextPage)
      // console.log(res.data)
      this.homeitem.push(...res.data)
      this.nextPage++
    }
  }
})

export default useHomeStore