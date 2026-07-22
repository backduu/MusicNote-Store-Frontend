<script setup lang="ts">
import { ref, computed } from 'vue';
import { Flame, Play, Heart, ShoppingCart } from 'lucide-vue-next';
import { useCartStore } from '../stores/CartStore';
import { useHotTracks } from '../composables/useHotTracks';

const cartStore = useCartStore();
const {
  filter,
  period,
  sort,
  page,
  size,
  products,
  isLoading,
  error
} = useHotTracks();

const favorites = ref<Set<number>>(new Set());

const toggleFavorite = (productId: number) => {
  if (favorites.value.has(productId)) {
    favorites.value.delete(productId);
  } else {
    favorites.value.add(productId);
  }
};

const filteredProducts = computed(() => {
  if (filter.value === 'ALL') return products.value;
  return products.value.filter(p => p.type === filter.value);
});

const addToCart = (productId: number) => {
  cartStore.addToCart(productId);
};
</script>

<template>
  <section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-3 mb-4">
        <Flame class="w-8 h-8 text-red-500 animate-pulse" />
        <h1 class="text-4xl font-bold text-gray-900">Hot Tracks</h1>
      </div>
      <p class="text-lg text-gray-600 mb-8 text-left">TOP 100의 뜨거운 음악들을 만나보세요</p>

      <!-- 필터 영역 -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
            <div class="flex space-x-2">
              <button v-for="t in (['ALL', 'SONG', 'ALBUM', 'SHEET'] as const)" :key="t"
                @click="filter = t"
                :class="['px-4 py-2 rounded-lg font-medium transition-colors', filter === t ? 'bg-[#4f46e5] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                {{ t === 'ALL' ? '전체' : t === 'ALBUM' ? '음반' : t === 'SONG' ? '음원' : '악보' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">기간</label>
            <div class="flex space-x-2">
              <button v-for="p in (['TODAY', 'WEEK', 'MONTH'] as const)" :key="p"
                @click="period = p"
                :class="['px-4 py-2 rounded-lg font-medium transition-colors', period === p ? 'bg-[#4f46e5] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']">
                {{ p === 'TODAY' ? '오늘' : p === 'WEEK' ? '이번 주' : '이번 달' }}
              </button>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">정렬</label>
            <select v-model="sort" class="w-full border rounded-lg px-3 py-2 text-sm">
              <option value="VIEW">인기순</option>
              <option value="LIKE">좋아요순</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 리스트 영역 -->
      <div v-if="isLoading && page === 0" class="text-center py-10">
        <p class="text-lg text-gray-600">로딩 중입니다...</p>
      </div>
      <div v-else-if="error" class="text-center text-red-600 py-10">{{ error }}</div>
      <div v-else class="space-y-3">
        <div v-for="(product, index) in filteredProducts" :key="product.id" class="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#6366f1] text-white font-bold">
              {{ index + 1 }}
            </div>
            <router-link :to="`/products/${product.id}`" class="w-16 h-16 rounded-lg overflow-hidden">
              <img :src="product.previewUrl" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </router-link>
            <div class="flex-1 min-w-0">
              <router-link :to="`/products/${product.id}`" class="block text-lg font-semibold text-gray-900 hover:text-[#4f46e5] truncate">{{ product.title }}</router-link>
              <p class="text-sm text-gray-600 truncate">{{ product.creator }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {{ product.type === 'ALBUM' ? '음반' : product.type === 'SONG' ? '음원' : '악보' }}
                </span>
                <span class="text-xs text-gray-600">{{ product.genre }}</span>
              </div>
            </div>
            <div class="hidden md:flex md:items-center md:space-x-6 mr-4 text-right">
              <div>
                <p class="text-xs text-gray-500">조회</p>
                <p class="text-sm font-bold text-gray-900">{{ (product.view || 0).toLocaleString() }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">좋아요</p>
                <p class="text-sm font-bold text-red-500">{{ (product.like || 0).toLocaleString() }}</p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="p-2 bg-gray-100 rounded-lg hover:text-[#4f46e5]" title="미리 듣기"><Play class="w-5 h-5" /></button>
              <button @click="addToCart(product.id)" class="p-2 bg-gray-100 rounded-lg hover:text-[#4f46e5]" title="장바구니 담기"><ShoppingCart class="w-5 h-5" /></button>
              <button @click="toggleFavorite(product.id)" :class="['p-2 rounded-lg', favorites.has(product.id) ? 'bg-red-100 text-red-600' : 'bg-gray-100']" title="좋아요">
                <Heart class="w-5 h-5" :fill="favorites.has(product.id) ? 'currentColor' : 'none'" />
              </button>
            </div>
          </div>
        </div>
        <div v-if="products.length > 0 && products.length % size === 0" class="flex justify-center mt-6">
          <button @click="page++" :disabled="isLoading" class="px-6 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50">
            {{ isLoading ? '로딩 중...' : '더보기' }}
          </button>
        </div>
      </div>
      <div v-if="filteredProducts.length === 0 && !isLoading" class="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Flame class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-600">해당하는 곡이 없습니다</p>
      </div>
    </div>
  </section>
</template>