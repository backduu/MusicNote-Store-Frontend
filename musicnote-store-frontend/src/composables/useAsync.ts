import { ref } from 'vue';

export function useAsync<T>(asyncFn: (...args: any[]) => Promise<T>) {
  const data = ref<T | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const execute = async (...args: any[]) => {
    isLoading.value = true;
    error.value = null;
    try {
      const result = await asyncFn(...args);
      data.value = result;
      return result;
    } catch (err: any) {
      error.value = err.message || '데이터를 불러오는 중 오류가 발생했습니다.';
      console.error(err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    data,
    isLoading,
    error,
    execute
  };
}
