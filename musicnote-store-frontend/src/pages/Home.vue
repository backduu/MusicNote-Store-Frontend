<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Flame, FileMusic, Music, Disc3 } from 'lucide-vue-next'
import { ProductType } from '../types/ProductType'
import { useHomeData } from '../composables/useHomeData'
import heroImg from '../assets/hero/hero_section_pic.png'

const { 
  isLoading: loading, 
  loadHomeData, 
  getCarouselByCategory, 
  getNewArrivalsByCategory,
  error
} = useHomeData()

const category = ref<ProductType>(ProductType.SONG)

const albumCount = ref(15)
const songCount = ref(15)
const sheetCount = ref(15)

const modules = [Navigation, Pagination, Autoplay]

onMounted(loadHomeData)

const audioItems = getCarouselByCategory(ProductType.SONG)
const albumItems = getCarouselByCategory(ProductType.ALBUM)
const sheetItems = getCarouselByCategory(ProductType.SHEET)

const activeList = computed(() => {
  if (category.value === ProductType.SONG) return audioItems.value
  if (category.value === ProductType.ALBUM) return albumItems.value
  return sheetItems.value
})

const slidesPerView = 3
const shouldLoop = computed(() => activeList.value.length > slidesPerView)

const newArrivalAlbums = getNewArrivalsByCategory(ProductType.ALBUM, albumCount.value)
const newArrivalSongs = getNewArrivalsByCategory(ProductType.SONG, songCount.value)
const newArrivalSheets = getNewArrivalsByCategory(ProductType.SHEET, sheetCount.value)
</script>

<template>
  <div>
    <!-- 히어로 섹션 -->
    <section class="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
          class="absolute inset-0 w-full h-full object-cover"
          :src="heroImg"
          alt="침착한 분위기를 유지하고 싶을 때 듣는 노래"
      />

      <div class="absolute inset-0 bg-black/30"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      <!-- 히어로 콘텐츠 -->
      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div class="backdrop-blur-md bg-white/5 rounded-3xl p-10 border border-white/20 shadow-2xl">
          <h1 class="text-3xl sm:text-4xl lg:text-4xl font-bold tracking-tighter drop-shadow-2xl mb-4">
            고요함을 찾아야 하는 시간
          </h1>
          <div class="w-16 h-1 bg-indigo-500 mx-auto mb-8 rounded-full"></div>
          <p class="max-w-2xl mx-auto text-lg sm:text-2xl text-white font-light leading-relaxed drop-shadow-lg">
            당신의 마음에 스며들 이 음악 속에서
            <br />
            새로운 영감을 발견하고, 당신의 음악을 세상과 공유하세요.
          </p>
        </div>

        <div class="mt-12">
          <router-link
              to="/hot-tracks"
              class="group relative inline-flex items-center gap-2 px-10 py-4 bg-white text-gray-900 font-bold rounded-full text-xl hover:bg-indigo-600 hover:text-white transition-all duration-500 ease-in-out transform hover:scale-105 shadow-xl"
          >
            지금 탐색하기
            <Music class="w-5 h-5 transition-transform group-hover:rotate-12" />
          </router-link>
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
        <div v-else-if="newArrivalAlbums.length !== 0">
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
        <div v-else class="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div class="bg-white p-4 rounded-full shadow-sm mb-4">
            <Disc3 class="w-10 h-10 text-gray-300" />
          </div>
          <p class="text-gray-500 font-medium">새로운 앨범이 없습니다.</p>
          <p class="text-gray-400 text-sm mt-1">곧 멋진 앨범들로 채워질 예정입니다!</p>
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
        <div v-else-if="newArrivalSongs.length !== 0">
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
        <div v-else-if="newArrivalSongs.length === 0" class="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div class="bg-white p-4 rounded-full shadow-sm mb-4">
            <Music class="w-10 h-10 text-gray-300" />
          </div>
          <p class="text-gray-500 font-medium">새로운 음악이 없습니다.</p>
          <p class="text-gray-400 text-sm mt-1">최신 트렌드의 음악을 준비 중입니다.</p>
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
        <div v-else-if="newArrivalSheets.length !== 0">
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
        <div v-else class="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <div class="bg-white p-4 rounded-full shadow-sm mb-4">
            <FileMusic class="w-10 h-10 text-gray-300" />
          </div>
          <p class="text-gray-500 font-medium">새로운 악보가 없습니다.</p>
          <p class="text-gray-400 text-sm mt-1">연주하고 싶은 곡의 악보를 조금만 기다려주세요.</p>
        </div>
      </div>
    </section>
  </div>
</template>
