import { ref, watch, onMounted } from 'vue';
import { fetchHotTracks } from '../api/hottracks';
import type { MetricType } from '../types/MetricType';
import type { Items } from '../types/Product';

export function useHotTracks() {
  const filter = ref<'ALL' | 'SONG' | 'ALBUM' | 'SHEET'>('ALL');
  const period = ref<'TODAY' | 'WEEK' | 'MONTH'>('TODAY');
  const sort = ref<MetricType>('VIEW');
  const page = ref(0);
  const size = ref(15);
  
  const products = ref<Items[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const loadTracks = async (isNewSearch = false) => {
    try {
      isLoading.value = true;
      const fetchedProducts = await fetchHotTracks(sort.value, period.value, page.value, size.value);
      
      if (page.value === 0 || isNewSearch) {
        products.value = fetchedProducts;
      } else {
        products.value = [...products.value, ...fetchedProducts];
      }
      error.value = null;
    } catch (err: any) {
      error.value = "데이터를 불러오는 데 실패했습니다.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const resetAndLoad = () => {
    page.value = 0;
    loadTracks(true);
  };

  watch([sort, period], resetAndLoad);
  watch(page, (newPage) => {
    if (newPage > 0) loadTracks();
  });

  onMounted(() => {
    loadTracks();
  });

  return {
    filter,
    period,
    sort,
    page,
    size,
    products,
    isLoading,
    error,
    loadTracks,
    resetAndLoad
  };
}
