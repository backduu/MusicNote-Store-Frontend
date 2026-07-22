import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AxiosError } from 'axios';
import { login as loginApi } from '../api/auth';
import { signup as signupApi, type SignupRequest } from '../api/user';
import { useUserStore } from '../stores/UserStore';
import type { LoginRequest } from '../api/auth';

export function useAuth() {
  const router = useRouter();
  const userStore = useUserStore();
  
  const loading = ref(false);
  const toast = ref<{ message: string; type: 'success' | 'fail' | 'error' } | null>(null);

  const login = async (data: LoginRequest) => {
    loading.value = true;
    try {
      const res = await loginApi(data);
      userStore.login(res);
      toast.value = { message: '로그인 성공!', type: 'success' };
      setTimeout(() => router.push('/'), 1000);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.value = { message: '입력값이 올바르지 않습니다.', type: 'fail' };
        } else {
          toast.value = { message: '로그인에 실패했습니다.', type: 'error' };
        }
      } else {
        toast.value = { message: '알 수 없는 오류가 발생했습니다.', type: 'error' };
      }
    } finally {
      loading.value = false;
    }
  };

  const signup = async (data: SignupRequest) => {
    loading.value = true;
    try {
      await signupApi(data);
      toast.value = { message: '회원가입 성공!', type: 'success' };
      setTimeout(() => router.push('/login'), 1000);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.value = { message: '입력값이 올바르지 않습니다.', type: 'fail' };
        } else {
          toast.value = { message: '회원가입에 실패했습니다.', type: 'error' };
        }
      } else {
        toast.value = { message: '알 수 없는 오류가 발생했습니다.', type: 'error' };
      }
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    userStore.logout();
    router.push('/login');
  };

  return {
    loading,
    toast,
    login,
    signup,
    logout
  };
}
