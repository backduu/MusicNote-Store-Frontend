<script setup lang="ts">
import { Music, User, UserPlus, LogOut } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore'; // 경로가 stores인지 store인지 확인 필요
import { storeToRefs } from 'pinia';

// store 및 router init
const userStore = useUserStore();
const { isLoggedIn, user } = storeToRefs(userStore);
const { logout } = userStore;
const router = useRouter();

const handleLogout = async () => {
  logout();
  router.push('/login');
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- 상단 로고/네비게이션 -->
        <router-link to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Music class="w-8 h-8 text-[#4f46e5]" />
          <span class="text-xl font-bold text-gray-900">음표상점</span>
        </router-link>

        <nav class="hidden md:flex items-center space-x-8">
          <router-link to="/hot-tracks" class="text-gray-700 hover:text-[#4f46e5] transition-colors">
            핫트랙스
          </router-link>
          <router-link to="/song-market" class="text-gray-700 hover:text-[#4f46e5] transition-colors">
            음악 아카이브
          </router-link>
          <router-link to="/scores" class="text-gray-700 hover:text-[#4f46e5] transition-colors">
            악보 아카이브
          </router-link>
          <router-link to="/qna" class="text-gray-700 hover:text-[#4f46e5] transition-colors">
            문의하기
          </router-link>
        </nav>

        <div class="flex items-center space-x-4">
          <!-- 비로그인 상태 -->
          <template v-if="!isLoggedIn">
            <router-link
                to="/login"
                class="flex items-center space-x-1 px-4 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
            >
              <User class="w-5 h-5" />
              <span>로그인</span>
            </router-link>
            <router-link
                to="/signup"
                class="flex items-center space-x-1 px-4 py-2 bg-[#5b5b66] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
            >
              <UserPlus class="w-5 h-5" />
              <span>회원가입</span>
            </router-link>
          </template>

          <!-- 로그인 상태 -->
          <template v-else>
            <span class="text-gray-700 font-medium">
              {{ user?.username }} 님
            </span>
            <button
                @click="handleLogout"
                class="flex items-center space-x-1 px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut class="w-5 h-5" />
              <span>로그아웃</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>