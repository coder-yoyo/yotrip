import yoRequest from '../request'

export function getHomeHotSuggests() {
  return yoRequest.get({
    url: '/home/hotSuggests'
  })
}

export function getHomeCategories() {
  return yoRequest.get({
    url: '/home/categories'
  })
}

export function getHomeItemlist(nextPage) {
  return yoRequest.get({
    url: '/home/houselist',
    params: {
      page: nextPage
    }
  })
}