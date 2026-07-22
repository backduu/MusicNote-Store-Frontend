<script setup lang="ts">
import { ref } from 'vue';
import { Music } from 'lucide-vue-next';
import Toast from '../components/Toast.vue';
import { useAuth } from '../composables/useAuth';

const username = ref('');
const password = ref('');
const { login, loading, toast } = useAuth();

const handleSubmit = () => {
  login({ username: username.value, password: password.value });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <Music class="w-12 h-12 text-[#4f46e5]" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
        음표상점 로그인
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        계정이 없으신가요?
        <router-link to="/signup" class="text-[#4f46e5] hover:text-[#6366f1] font-medium">
          회원가입
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              아이디
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4f46e5] hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? '로그인 중...' : '로그인' }}
          </button>
        </form>
      </div>
    </div>

    <Toast
      v-if="toast"
      :message="toast.message"
      :type="toast.type"
      @close="toast = null"
    />
  </div>
</template>
