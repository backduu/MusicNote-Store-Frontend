<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterView } from 'vue-router';

import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

const route = useRoute();

const isHiddenHeaderFooter = computed(() => {
  const hiddenPaths = ['/login', '/signup'];
  return hiddenPaths.includes(route.path);
});
</script>

<template>
  <!-- 전체 레이아웃 컨테이너 -->
  <div class="min-h-screen flex flex-col bg-white text-gray-900 font-sans antialiased">

    <!-- 상단 헤더 -->
    <Header v-if="!isHiddenHeaderFooter" />

    <!-- 본문 영역. -->
    <main class="flex-grow w-full">
      <RouterView />
    </main>

    <!-- 하단 푸터 -->
    <Footer v-if="!isHiddenHeaderFooter" />

  </div>
</template>

<style scoped>
</style>
