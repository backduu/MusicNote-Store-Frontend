<script setup lang="ts">
import { ref } from 'vue';
import { Music } from 'lucide-vue-next';
import Toast from '../components/Toast.vue';
import { useAuth } from '../composables/useAuth';
import { UserRole } from '../types/UserRole';
import { UserStatus } from '../types/UserStatus';

const name = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');
const address = ref('');
const username = ref('');
const nickname = ref('');
const confirmPassword = ref('');
const role = ref<UserRole>(UserRole.USER);

const { signup, loading, toast } = useAuth();

const formatPhoneNumber = (value: string) => {
  const onlyNums = value.replace(/\D/g, '');
  if (onlyNums.length < 4) return onlyNums;
  if (onlyNums.length < 7) {
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  }
  return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
};

const handlePhoneInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  phone.value = formatPhoneNumber(target.value);
};

const handleSubmit = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    toast.value = { message: '올바른 이메일 형식이 아닙니다.', type: 'fail' };
    return;
  }

  const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
  if (!phoneRegex.test(phone.value)) {
    toast.value = { message: '올바른 휴대폰 번호 형식이 아닙니다.', type: 'fail' };
    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.value = { message: '비밀번호가 일치하지 않습니다.', type: 'fail' };
    return;
  }

  if (password.value.length < 6) {
    toast.value = { message: '비밀번호는 최소 6자 이상이어야 합니다.', type: 'fail' };
    return;
  }

  const normalizedPhone = phone.value.replace(/-/g, '');

  signup({
    username: username.value,
    nickname: nickname.value,
    name: name.value,
    email: email.value,
    address: address.value,
    phone: normalizedPhone,
    password: password.value,
    role: role.value,
    status: UserStatus.ACTIVE
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <Music class="w-12 h-12 text-[#4f46e5]" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">회원가입</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        이미 계정이 있으신가요?
        <router-link to="/login" class="text-[#4f46e5] hover:text-[#6366f1] font-medium">
          로그인
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">아이디</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="hong123"
            />
          </div>

          <div>
            <label for="nickname" class="block text-sm font-medium text-gray-700">닉네임</label>
            <input
              id="nickname"
              v-model="nickname"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="홍이"
            />
          </div>

          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">이름</label>
            <input
              id="name"
              v-model="name"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="홍길동"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700">주소</label>
            <input
              id="address"
              v-model="address"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="서울특별시 ..."
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">휴대폰번호</label>
            <input
              id="phone"
              :value="phone"
              @input="handlePhoneInput"
              type="tel"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="010-1234-5678"
            />
          </div>

          <div>
            <label for="role" class="block text-sm font-medium text-gray-700">권한(Role)</label>
            <select
              id="role"
              v-model="role"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
            >
              <option :value="UserRole.USER">사용자</option>
              <option :value="UserRole.SELLER">판매자</option>
            </select>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="최소 6자 이상"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4f46e5] hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ loading ? '가입 중...' : '회원가입' }}
          </button>
        </form>
      </div>
    </div>

    <Toast v-if="toast" :message="toast.message" :type="toast.type" @close="toast = null" />
  </div>
</template>
