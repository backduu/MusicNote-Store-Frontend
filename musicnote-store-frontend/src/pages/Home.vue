<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Flame, FileMusic, Music, Disc3 } from 'lucide-vue-next'
import { ProductType } from '../types/ProductType'
import { useHomeData } from '../composables/useHomeData'
import heroImg from '../assets/hero/hero_section_pic.png'
import ProductSection from "@/components/ProductSection.vue";

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
          <p class="max-w-2xl mx-auto text-lg sm:text-2xl text-white font-medium leading-relaxed drop-shadow-2xl">
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
    <!-- 아이템 섹션 -->
    <div v-if="error" class="text-center py-16">
      <p class="text-red-500">{{ error }}</p>
    </div>

    <div v-else>
      <!-- 오늘의 음반 -->
      <ProductSection
        title="오늘의 음반"
        :items="newArrivalAlbums"
        :loading="loading"
        :type="'ALBUM'"
        empty-message="새로운 음반이 없습니다."
        more-link="/albums"
      />

      <!-- 오늘의 음원 -->
      <ProductSection
        title="오늘의 음원"
        :items="newArrivalSongs"
        :loading="loading"
        :type="'SONG'"
        empty-message="새로운 음원이 없습니다."
        more-link="/songs"
      />

      <!-- 오늘의 악보 -->
      <ProductSection
        title="오늘의 악보"
        :items="newArrivalSheets"
        :loading="loading"
        :type="'SHEET'"
        empty-message="새로운 악보가 없습니다."
        more-link="/scores"
      />
    </div>
  </div>
</template>
