<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import {fetchGlobalSearch} from '@/api/items';
import type {Items} from '@/types/Product';
import {ProductType} from "@/types/ProductType.ts";
import ProductSection from "@/components/ProductSection.vue";

const route = useRoute();
const results = ref<Items[]>([]);
const isLoading = ref(false);

const searchQuery = computed(() => route.query.q as string);

const loadSearchResults = async () => {
  if (!searchQuery.value) return;

  isLoading.value = true;
  try {
    results.value = await fetchGlobalSearch(searchQuery.value);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// 카테고리별 필터링
const albums = computed(()=> results.value.filter(item => item.type === 'ALBUM'));
const songs = computed(()=> results.value.filter(item => item.type === 'SONG'));
const sheets = computed(()=> results.value.filter(item => item.type === 'SHEET'));

onMounted(loadSearchResults);

watch(() => route.query.q, loadSearchResults);
</script>

<template>
  <div class="min-h-screen bg-gray-50 pb-20">
    <!-- 헤더 영역 -->
    <div class="bg-white border-b border-gray-200 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          '<span class="text-indigo-600">{{ searchQuery }}</span>' 검색 결과
          <span class="text-lg font-normal text-gray-500 ml-2">({{ results.length }}건)</span>
        </h1>
      </div>
    </div>

    <!-- 로딩 상태 -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-32">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      <p class="mt-4 text-gray-500">결과를 불러오는 중입니다...</p>
    </div>

    <!-- 결과 없음 -->
    <div v-else-if="results.length === 0" class="max-w-7xl mx-auto px-4 py-24 text-center">
      <div class="bg-white rounded-3xl p-16 shadow-sm border border-gray-100">
        <AlertCircle class="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-gray-900 mb-2">검색 결과가 없습니다.</h3>
        <p class="text-gray-500">다른 키워드로 검색해 보세요.</p>
      </div>
    </div>

    <!-- 결과 리스트 (ProductSection 재사용) -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProductSection
          v-if="albums.length > 0"
          title="앨범"
          :type="ProductType.ALBUM"
          :items="albums"
          :loading="false"
      />

      <ProductSection
          v-if="songs.length > 0"
          title="음원"
          :type="ProductType.SONG"
          :items="songs"
          :loading="false"
      />

      <ProductSection
          v-if="sheets.length > 0"
          title="악보"
          :type="ProductType.SHEET"
          :items="sheets"
          :loading="false"
      />
    </div>
  </div>
</template>

<style scoped>

</style>