import { defineStore } from 'pinia'
import { getCitiesData } from '@/services'
const useCityStore = defineStore('city', {
  state: () => ({
    citiesData: {},
    // 默认当前城市
    currentCity: {
      cityName: '漯河'
    }
  }),

  actions: {
    async fetchCitiesData() {
      const res = await getCitiesData()
      this.citiesData = res.data
      // console.log(this.citiesData)    
    }
  }

})

export default useCityStore