import { onMounted, onBeforeUnmount } from 'vue'

/**
 * 滚动入场：给带 .reveal 的元素在进入视口时加上 .is-visible
 * 尊重系统「减少动态效果」偏好，CSS 侧已做兜底。
 */
export function useReveal() {
  let observer = null

  onMounted(() => {
    const targets = document.querySelectorAll('.reveal')
    if (!targets.length) return

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )

    targets.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
}
