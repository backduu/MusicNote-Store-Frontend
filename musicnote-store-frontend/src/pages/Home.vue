<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Flame, FileMusic, Music, Disc3 } from 'lucide-vue-next'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { fetchCarouselItems } from '../api/carousel'
import { fetchNewArrivals } from '../api/items'
import type { CarouselItem } from '../types/Carousel'
import type { Items } from '../types/Product'
import { ProductType } from '../types/ProductType'

const carouselItems = ref<CarouselItem[]>([])
const loading = ref(true)
const newArrivals = ref<Items[]>([])
const category = ref<ProductType>(ProductType.SONG)

const albumCount = ref(15)
const songCount = ref(15)
const sheetCount = ref(15)

const modules = [Navigation, Pagination, Autoplay]

onMounted(async () => {
  try {
    const [carouselData, newArrivalData] = await Promise.all([
      fetchCarouselItems(),
      fetchNewArrivals()
    ])
    carouselItems.value = carouselData
    newArrivals.value = newArrivalData
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})

const audioItems = computed(() => carouselItems.value.filter((i) => i.type === ProductType.SONG))
const albumItems = computed(() => carouselItems.value.filter((i) => i.type === ProductType.ALBUM))
const sheetItems = computed(() => carouselItems.value.filter((i) => i.type === ProductType.SHEET))

const activeList = computed(() => {
  if (category.value === ProductType.SONG) return audioItems.value
  if (category.value === ProductType.ALBUM) return albumItems.value
  return sheetItems.value
})

const slidesPerView = 3
const shouldLoop = computed(() => activeList.value.length > slidesPerView)

const newArrivalAlbums = computed(() => 
  newArrivals.value.filter((item) => item.type === ProductType.ALBUM).slice(0, albumCount.value)
)
const newArrivalSongs = computed(() => 
  newArrivals.value.filter((item) => item.type === ProductType.SONG).slice(0, songCount.value)
)
const newArrivalSheets = computed(() => 
  newArrivals.value.filter((item) => item.type === ProductType.SHEET).slice(0, sheetCount.value)
)
</script>

<template>
  <div>
    <!-- 캐러셀 전시 상품 세션 -->
    <section class="from-gray-50 to-gray-100 py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- 카테고리 버튼 -->
        <div class="flex justify-center gap-4 mb-6">
          <button
            @click="category = ProductType.SONG"
            :class="[
              'px-4 py-2 rounded-md border flex items-center gap-1',
              category === ProductType.SONG ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            ]"
          >
            <Music class="w-4 h-4" /> 음원
          </button>
          <button
            @click="category = ProductType.ALBUM"
            :class="[
              'px-4 py-2 rounded-md border flex items-center gap-1',
              category === ProductType.ALBUM ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            ]"
          >
            <Disc3 class="w-4 h-4" /> 음반
          </button>
          <button
            @click="category = ProductType.SHEET"
            :class="[
              'px-4 py-2 rounded-md border flex items-center gap-1',
              category === ProductType.SHEET ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
            ]"
          >
            <FileMusic class="w-4 h-4" /> 악보
          </button>
        </div>

        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
          <Music v-if="category === ProductType.SONG" class="w-6 h-6 text-indigo-600" />
          <Disc3 v-else-if="category === ProductType.ALBUM" class="w-6 h-6 text-indigo-600" />
          <FileMusic v-else class="w-6 h-6 text-indigo-600" />
          금주의 추천
          {{
            category === ProductType.SONG
              ? '음원'
              : category === ProductType.ALBUM
              ? '음반'
              : '악보'
          }}
        </h2>

        <div v-if="loading">
          <p class="text-center text-gray-500">로딩중...</p>
        </div>
        <div v-else-if="activeList.length === 0">
          <p class="text-center text-gray-400">해당 카테고리에 상품이 없습니다.</p>
        </div>
        <div v-else>
          <Swiper
            :modules="modules"
            :space-between="20"
            :slides-per-view="slidesPerView"
            navigation
            :pagination="{ clickable: true }"
            :autoplay="{ delay: 3000 }"
            :loop="shouldLoop"
            :breakpoints="{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }"
          >
            <SwiperSlide v-for="item in activeList" :key="item.id">
              <div class="bg-white shadow rounded-lg overflow-hidden">
                <img
                  :src="item.previewUrl"
                  :alt="item.title"
                  class="w-full h-48 object-cover"
                />
                <div class="p-4">
                  <h3 class="text-lg font-semibold text-gray-900">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ item.creator }}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>

    <!-- 오늘의 음반 -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Flame class="w-6 h-6 text-red-600" />
          오늘의 음반
        </h2>
        <div v-if="loading">
          <p class="text-gray-500">로딩중...</p>
        </div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in newArrivalAlbums"
              :key="item.id"
              class="bg-gray-50 shadow rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img
                :src="item.previewUrl"
                :alt="item.title"
                class="w-full h-40 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ item.creator }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <router-link
              to="/"
              class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              더보기
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 오늘의 음원 -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Flame class="w-6 h-6 text-red-600" />
          오늘의 음원
        </h2>
        <div v-if="loading">
          <p class="text-gray-500">로딩중...</p>
        </div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in newArrivalSongs"
              :key="item.id"
              class="bg-gray-50 shadow rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img
                :src="item.previewUrl"
                :alt="item.title"
                class="w-full h-40 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ item.creator }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <router-link
              to="/"
              class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              더보기
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 오늘의 악보 -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Flame class="w-6 h-6 text-red-600" />
          오늘의 악보
        </h2>
        <div v-if="loading">
          <p class="text-gray-500">로딩중...</p>
        </div>
        <div v-else>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in newArrivalSheets"
              :key="item.id"
              class="bg-gray-50 shadow rounded-lg overflow-hidden hover:shadow-md transition"
            >
              <img
                :src="item.previewUrl"
                :alt="item.title"
                class="w-full h-40 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-900">
                  {{ item.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ item.creator }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-6">
            <router-link
              to="/"
              class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              더보기
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
