<script setup lang="ts">
import { ref } from 'vue';
import { Search } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const router = useRouter();
const searchQuery = ref('');

const handleSearch = () => {
  const keyword = searchQuery.value.trim();

  if(!keyword) return;

  router.push({
    path: `/search`,
    query: { q: keyword }
  });
}
const recommendedKeywords = ['베토벤', '여름밤의 꿈', '재즈 피아노', 'K-POP 악보', '클래식 명곡'];

const handleKeywordClick = (keyword: string) => {
  searchQuery.value = keyword;
  handleSearch();
}
</script>

<template>
  <section class="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100 py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">찾으시는 음악이 있으신가요?</h2>
        <p class="text-gray-500 text-sm">수만 곡의 악보와 음원을 한 곳에서 검색해 보세요.</p>
      </div>

      <div class="relative group">
        <div class="absolute inset-0 bg-[#4f46e5]/5 blur-xl rounded-full transition-opacity opacity-0 group-focus-within:opacity-100"></div>
        <div class="relative">
          <input
              class="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-6 pr-16 text-lg text-gray-900 shadow-sm outline-none transition-all duration-300 focus:border-[#4f46e5] focus:ring-4 focus:ring-[#4f46e5]/10"
              v-model="searchQuery"
              id="global-search"
              type="search"
              placeholder="곡명, 아티스트, 작곡가, 악보를 검색하세요."
              @keyup.enter="handleSearch"
          />

          <button
              @click="handleSearch"
              type="submit"
              aria-label="검색"
              class="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-[#4f46e5] p-3 text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Search class="h-6 w-6" />
          </button>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2">추천 검색어</span>
        <button
            v-for="keyword in recommendedKeywords"
            :key="keyword"
            @click="handleKeywordClick(keyword)"
            class="px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-gray-600 hover:border-[#4f46e5] hover:text-[#4f46e5] hover:bg-indigo-50 transition-all duration-200"
        >
          # {{ keyword }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>