import yoRequest from '../request'

export function getCitiesData() {
  return yoRequest.get({
    url: '/city/all'
  })
}