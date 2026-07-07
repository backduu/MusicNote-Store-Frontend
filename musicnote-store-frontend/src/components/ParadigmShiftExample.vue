<script setup lang="ts">
/**
 * React vs Vue Comparison:
 * 
 * [React]
 * const [data, setData] = useState(null);
 * useEffect(() => { fetchData() }, []);
 * useEffect(() => { console.log(data) }, [data]);
 * 
 * [Vue]
 * const data = ref(null);
 * onMounted(() => { fetchData() });
 * watch(data, (newValue) => { console.log(newValue) });
 */

import { ref, onMounted, watch } from 'vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { Trash2 } from 'lucide-vue-next'
import axios from 'axios'

interface Product {
  id: number
  name: string
}

// Props (React: function(props))
const props = defineProps<{
  initialId?: number
}>()

// State (React: useState)
const product = ref<Product | null>(null)
const loading = ref(false)

// Logic (React: Side effects in useEffect)
const fetchProduct = async (id: number) => {
  loading.value = true
  try {
    const response = await axios.get(`/api/products/${id}`)
    product.value = response.data
  } catch (error) {
    console.error('Failed to fetch', error)
  } finally {
    loading.value = false
  }
}

// Lifecycle (React: useEffect([], ()))
onMounted(() => {
  if (props.initialId) {
    fetchProduct(props.initialId)
  }
})

// Watch (React: useEffect([id], ()))
watch(() => props.initialId, (newId) => {
  if (newId) fetchProduct(newId)
})

// Action (React: const handleReset = () => ...)
const handleReset = () => {
  product.value = null
}
</script>

<template>
  <div class="p-6 border rounded-lg shadow-sm">
    <div v-if="loading" class="animate-pulse">Loading...</div>
    
    <div v-else-if="product" class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <ShoppingCartIcon class="w-6 h-6 text-blue-500" />
        <span class="text-lg font-bold">{{ product.name }}</span>
      </div>
      
      <button 
        @click="handleReset"
        class="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
      >
        <Trash2 class="w-5 h-5" />
      </button>
    </div>
    
    <div v-else class="text-gray-400">
      No product selected.
    </div>
  </div>
</template>
