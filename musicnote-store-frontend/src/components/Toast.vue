<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { CheckCircle, XCircle, X } from 'lucide-vue-next'

interface Props {
  message: string
  type: 'success' | 'fail' | 'error'
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

let timer: number | undefined

onMounted(() => {
  timer = window.setTimeout(() => {
    emit('close')
  }, 3000)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 animate-slide-up">
    <div
      :class="[
        'flex items-center space-x-3 px-4 py-3 rounded-lg shadow-lg',
        type === 'success'
          ? 'bg-green-50 border border-green-200 text-green-800'
          : type === 'error'
          ? 'bg-red-50 border border-red-200 text-red-800'
          : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
      ]"
    >
      <CheckCircle v-if="type === 'success'" class="w-5 h-5 text-green-500" />
      <XCircle v-else class="w-5 h-5 text-red-500" />

      <span class="text-sm font-medium">{{ message }}</span>

      <button @click="$emit('close')" class="ml-2 hover:opacity-70 transition-opacity">
        <X class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
