<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { MusicalNoteIcon } from '@heroicons/vue/24/solid'
import { fetchGenres } from '../api/genre'
import { fetchSongMarket } from '../api/songMarket'
import { Heart, ShoppingCart, Play, Flame, Search } from 'lucide-vue-next'
import { useCartStore } from '../stores/CartStore'
import type { Items } from '../types/Product'

const cartStore = useCartStore()

const filter = ref<'SONG' | 'ALBUM'>('SONG')
const period = ref<'TODAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH')
const region = ref<'FOREIGN' | 'Korea'>('Korea')
const sort = ref<'RELEASED' | 'LIKE' | 'VIEW'>('RELEASED')
const page = ref(0)
const size = ref(15)
const genres = ref<string[]>([])
const genre = ref<string | null>(null)
const favorites = ref<Set<number>>(new Set())
const inputSearchTerm = ref('')
const searchTerm = ref('')

const products = ref<Items[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const toggleFavorite = (productId: number) => {
  if (favorites.value.has(productId)) {
    favorites.value.delete(productId)
  } else {
    favorites.value.add(productId)
  }
}

const executeSearch = () => {
  searchTerm.value = inputSearchTerm.value
  page.value = 0
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    executeSearch()
  }
}

const loadGenres = async () => {
  try {
    const data = await fetchGenres()
    genres.value = data
  } catch (err) {
    console.error('장르 불러오기 실패', err)
  }
}

const loadTracks = async (isNewSearch = false) => {
  try {
    isLoading.value = true
    const fetchedProducts = await fetchSongMarket(
      filter.value,
      region.value,
      period.value,
      sort.value,
      genre.value,
      page.value,
      size.value,
      searchTerm.value
    )

    if (page.value === 0 || isNewSearch) {
      products.value = fetchedProducts
    } else {
      products.value = [...products.value, ...fetchedProducts]
    }
    error.value = null
  } catch (err) {
    error.value = '데이터를 불러오는 데 실패했습니다.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadGenres()
  loadTracks()
})

watch([filter, region, period, sort, genre, searchTerm], () => {
  page.value = 0
  loadTracks(true)
})

watch(page, (newPage) => {
  if (newPage > 0) {
    loadTracks()
  }
})

const addToCart = (productId: number) => {
  cartStore.addToCart(String(productId))
}
</script>

<template>
  <section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center space-x-3 mb-4">
        <MusicalNoteIcon class="w-8 h-8 text-teal-500 animate-bounce" />
        <h1 class="text-4xl font-bold text-gray-900">음악 아카이브</h1>
      </div>
      <p class="text-lg text-gray-600 mb-8 text-left">
        최신 음원부터 인기 트랙까지, 원하는 음악을 바로 만나보세요
      </p>
    </div>

    <!-- 필터 영역 -->
    <div class="bg-white border border-gray-200 rounded-lg p-6 mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 장르 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2 text-left">장르</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="g in genres"
              :key="g"
              @click="genre = genre === g ? null : g"
              :class="[
                'px-3 py-1 rounded-lg text-sm transition-colors',
                genre === g ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ g }}
            </button>
          </div>
        </div>

        <!-- 기간 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2 text-left">기간</label>
          <div class="flex space-x-2">
            <button
              v-for="p in (['TODAY', 'WEEK', 'MONTH', 'YEAR'] as const)"
              :key="p"
              @click="period = p"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                period === p ? 'bg-[#4f46e5] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ p === 'TODAY' ? '오늘' : p === 'WEEK' ? '이번 주' : p === 'MONTH' ? '이번 달' : '올해' }}
            </button>
          </div>
        </div>

        <!-- 정렬 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2 text-left">정렬</label>
          <select
            v-model="sort"
            class="w-full border rounded-lg px-3 py-2 text-sm"
          >
            <option value="RELEASED">출시순</option>
            <option value="LIKE">좋아요순</option>
            <option value="VIEW">조회수순</option>
          </select>
        </div>

        <!-- 타입 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2 text-left">음원/음반</label>
          <div class="flex space-x-2">
            <button
              v-for="t in (['SONG', 'ALBUM'] as const)"
              :key="t"
              @click="filter = t"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                filter === t ? 'bg-[#4f46e5] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ t === 'SONG' ? '음원' : '음반' }}
            </button>
          </div>
        </div>

        <!-- 국가 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2 text-left">국내/국외</label>
          <div class="flex space-x-2">
            <button
              v-for="r in (['Korea', 'FOREIGN'] as const)"
              :key="r"
              @click="region = r"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                region === r ? 'bg-[#4f46e5] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ r === 'Korea' ? '국내음악' : '해외음악' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 검색창 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div class="flex space-x-2">
        <div class="relative flex-1">
          <input
            v-model="inputSearchTerm"
            type="text"
            placeholder="제목, 아티스트, 작곡가 등으로 검색하세요..."
            @keydown="handleKeyDown"
            class="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-base focus:ring-[#4f46e5] focus:border-[#4f46e5]"
          />
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
          @click="executeSearch"
          class="px-6 py-3 bg-[#4f46e5] text-white rounded-lg font-medium hover:bg-[#6366f1] transition-colors flex items-center"
        >
          검색
        </button>
      </div>
    </div>

    <!-- 리스트 영역 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
      <div v-if="isLoading && page === 0" class="text-center py-10">
        <p class="text-lg text-gray-600">로딩 중입니다...</p>
      </div>
      <div v-else-if="error" class="text-center py-10">
        <p class="text-lg text-red-600">{{ error }}</p>
      </div>
      <template v-else>
        <div v-for="(product, index) in products" :key="product.id" class="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-4">
            <div class="shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#4f46e5] to-[#6366f1]">
                <span class="text-lg font-bold text-white">{{ index + 1 }}</span>
              </div>
            </div>

            <router-link :to="`/products/${product.id}`" class="flex-0 w-16 h-16 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img :src="product.previewUrl" :alt="product.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </router-link>

            <div class="flex-1 min-w-0">
              <router-link :to="`/products/${product.id}`" class="block text-lg font-semibold text-gray-900 hover:text-[#4f46e5] truncate mb-1">
                {{ product.title }}
              </router-link>
              <p v-if="product.creator" class="text-sm text-gray-600 truncate mb-2">{{ product.creator }}</p>
              <div class="flex items-center space-x-2 flex-wrap">
                <span class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                  {{ product.type === 'ALBUM' ? '음반' : product.type === 'SONG' ? '음원' : '악보' }}
                </span>
                <span class="text-xs text-gray-600">{{ product.genre }}</span>
                <span v-if="product.createdAt" class="text-xs text-gray-500">
                  {{ new Date(product.createdAt).toLocaleDateString('ko-KR') }}
                </span>
              </div>
            </div>

            <div class="hidden md:flex md:flex-col md:items-end md:space-y-2">
              <div class="text-right">
                <p class="text-sm text-gray-600">조회</p>
                <p class="text-lg font-bold text-gray-900">{{ (product.view || 0).toLocaleString() }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-600">좋아요</p>
                <p class="text-lg font-bold text-red-500">{{ (product.like || 0).toLocaleString() }}</p>
              </div>
            </div>

            <div class="flex-0">
              <div class="flex flex-col space-y-2">
                <button class="inline-flex items-center justify-center space-x-1 px-3 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#6366f1] transition-colors text-sm font-medium" title="미리 듣기">
                  <Play class="w-4 h-4" />
                  <span class="hidden sm:inline">듣기</span>
                </button>
                <button
                  @click="toggleFavorite(product.id)"
                  :class="[
                    'inline-flex items-center justify-center px-3 py-2 rounded-lg transition-colors text-sm font-medium',
                    favorites.has(product.id) ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                  title="좋아요"
                >
                  <Heart class="w-4 h-4" :fill="favorites.has(product.id) ? 'currentColor' : 'none'" />
                  <span class="hidden sm:inline">{{ favorites.has(product.id) ? '찜됨' : '찜하기' }}</span>
                </button>
                <button
                  @click="addToCart(product.id)"
                  class="inline-flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#4f46e5] hover:text-[#4f46e5] transition-colors text-sm font-medium"
                  title="장바구니 담기"
                >
                  <ShoppingCart class="w-4 h-4" />
                  <span class="hidden sm:inline">담기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="products.length !== 0" class="flex justify-center mt-6">
          <button
            :disabled="isLoading || products.length % size !== 0"
            @click="page++"
            class="px-6 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            {{ isLoading ? '불러오는 중...' : '더보기' }}
          </button>
        </div>
      </template>

      <div v-if="products.length === 0 && !isLoading" class="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <Flame class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p class="text-gray-600">해당하는 곡이 없습니다</p>
      </div>
    </div>
  </section>
</template>
