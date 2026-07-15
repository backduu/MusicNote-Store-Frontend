<script setup lang="ts">
import { ShieldCheck, FileText, HelpCircle, Music } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-note-surface border-t border-note-border py-8 text-note-muted transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-4">

      <!-- 로고와 브랜드명 -->
      <div class="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
        <Music class="w-5 h-5 text-note-primary" />
        <span class="font-bold text-gray-800 dark:text-gray-200">음표상점</span>
      </div>

      <!-- 링크 네비게이션  -->
      <nav class="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
        <!-- 이용약관 -->
        <router-link
            to="/terms"
            class="flex items-center gap-1.5 hover:text-note-primary transition-colors duration-200"
        >
          <FileText class="w-4 h-4" />
          <span>이용약관</span>
        </router-link>

        <!-- 구분선 -->
        <span class="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>

        <!-- 개인정보처리방침  -->
        <router-link
            to="/privacy"
            class="flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-300 hover:text-note-primary transition-colors duration-200"
        >
          <ShieldCheck class="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>개인정보처리방침</span>
        </router-link>

        <span class="hidden sm:inline text-gray-300 dark:text-gray-600">|</span>

        <!-- 고객센터/문의하기 -->
        <router-link
            to="/qna"
            class="flex items-center gap-1.5 hover:text-note-primary transition-colors duration-200"
        >
          <HelpCircle class="w-4 h-4" />
          <span>고객센터</span>
        </router-link>
      </nav>

      <!-- 저작권 카피라이트 -->
      <p class="text-xs text-gray-500 dark:text-gray-400 text-center tracking-tight mt-2">
        © 2026 음표상점. 저작권은 없지만 아무튼 나한테 있는 거임. 🎵
      </p>

    </div>
  </footer>
</template>

<style scoped>
</style>