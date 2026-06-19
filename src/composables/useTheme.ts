import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') !== 'light')

function apply() {
  document.documentElement.classList.toggle('light', !isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

apply()

watch(isDark, apply)

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}
