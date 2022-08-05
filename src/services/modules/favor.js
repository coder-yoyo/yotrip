import yoRequest from '../request'
// 获取收藏数据
export function getFavorList() {
  return yoRequest.get({
    url: "/favor/list",
  })
}
// 获取历史数据
export function getHistoryList() {
  return yoRequest.get({
    url: "/favor/history",
  })
}