import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "lodash";

export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
 // 获取各种高度
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }

    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // 滚动到底部触发
      isReachBottom.value = true
    }
  }, 150)
  // 监听事件
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener('scroll', scrollListenerHandler)
  })
  //移除事件
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}