import yoRequest from '../request'

export function getDetailInfos(houseId) {
  return yoRequest.get({
    url: '/detail/infos',
    params: {
      houseId
    }
  })
}