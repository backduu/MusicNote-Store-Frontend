<script setup lang="ts">
import type {Items} from "@/types/Product.ts";
import {DiscAlbum, Disc2, Disc3, Music4} from "lucide-vue-next";
import {ProductType} from "@/types/ProductType.ts";
import {computed} from "vue";

const props = withDefaults(defineProps<{
  title: string
  type: ProductType
  items: Items[]
  loading?: boolean
  emptyMessage?: string
  moreLink?: string
  error?: string
}>(), {
  loading: true,
  emptyMessage: '새로운 상품이 없습니다.',
  moreLink: '/',
  error: ''
})

const typeName = computed(() => {
  if (props.type === ProductType.ALBUM) {
    return '앨범';
  } else if (props.type === ProductType.SONG) {
    return '곡';
  } else if (props.type === ProductType.SHEET) {
    return '악보';
  } else {
    return '';
  }
})
</script>

<template>
  <section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 섹션 헤더: 아이콘과 제목 -->
      <div class="flex items-center justify-between mb-10">
        <h2 class="flex items-center gap-5">
          <!-- 앨범 아이콘 -->
          <span v-if="ProductType.ALBUM === type"
                class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100/50">
            <DiscAlbum class="w-8 h-8" />
          </span>

          <!-- 곡 아이콘 -->
          <span v-else-if="ProductType.SONG === type"
                class="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100/50">
            <Disc2 class="w-8 h-8" />
          </span>

          <!-- 악보 아이콘 -->
          <span v-else-if="ProductType.SHEET === type"
                class="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm border border-amber-100/50">
            <Music4 class="w-8 h-8" />
          </span>

          <span class="text-3xl font-extrabold text-gray-900 tracking-tight">
            {{ title }}
          </span>
        </h2>

        <router-link
            :to="moreLink"
            class="hidden sm:flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors group"
        >
          전체보기
          <span class="transition-transform group-hover:translate-x-1">→</span>
        </router-link>
      </div>
      <div v-if="loading">
        <p class="text-gray-500">로딩중...</p>
      </div>
      <div v-else-if="items.length !== 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
              v-for="item in items"
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
        <div class="flex justify-center mt-12 sm:hidden">
          <router-link
              :to="moreLink"
              class="px-8 py-3 bg-indigo-50 text-indigo-600 font-bold rounded-full hover:bg-indigo-100 transition"
          >
            전체보기
          </router-link>
        </div>
      </div>
      <div v-else class="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <div class="bg-white p-4 rounded-full shadow-sm mb-4">
          <Disc3 class="w-10 h-10 text-gray-300" />
        </div>
        <p class="text-gray-500 font-medium">{{ emptyMessage }}</p>
        <p class="text-gray-400 text-sm mt-1">곧 멋진 {{ typeName }}들로 채워질 예정입니다!</p>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>