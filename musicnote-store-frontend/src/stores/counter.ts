import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// React Zustand Example (Comparison):
// const useStore = create((set) => ({
//   count: 0,
//   inc: () => set((state) => ({ count: state.count + 1 })),
// }))

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters (Computed)
  const doubleCount = computed(() => count.value * 2)
  
  // Actions
  function increment() {
    count.value++
  }

  function reset() {
    count.value = 0
  }

  return { count, doubleCount, increment, reset }
})
