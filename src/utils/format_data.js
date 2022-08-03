import dayjs from 'dayjs'

export function formatMonthDay(data, formatStr = 'MM月DD日') {
  return dayjs(data).format(formatStr)
}

export function getTotalDays(startData, endData) {
  return dayjs(endData).diff(startData, 'day')
}