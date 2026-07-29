<script setup lang="ts">
import type {Items} from "@/types/Product.ts";
import {DiscAlbum, Disc2, Disc3, Music4} from "lucide-vue-next";
import {ProductType} from "@/types/ProductType.ts";

withDefaults(defineProps<{
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
</script>

<template>
  <section class="bg-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="ProductType.ALBUM === type" class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <DiscAlbum class="w-6 h-6 text-red-600" />
          {{ title }}
        </h2>
      </div>
      <div v-else-if="ProductType.SONG === type" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Disc2 class="w-6 h-6 text-red-600" />
          {{ title }}
        </h2>
      </div>
      <div v-else-if="ProductType.SHEET === type" class="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Music4 class="w-6 h-6 text-red-600" />
          {{ title }}
        </h2>
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
        <div class="flex justify-end mt-6">
          <router-link
              :to="moreLink"
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
</template>

<style scoped>

</style>