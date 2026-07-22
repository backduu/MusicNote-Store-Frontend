import { ref, watch, onMounted } from 'vue';
import { fetchGenres } from '../api/genre';
import { fetchSongMarket } from '../api/songMarket';
import type { MetricType } from '../types/MetricType';
import type { Items } from '../types/Product';

export function useSongMarket() {
  const filter = ref<'SONG' | 'ALBUM'>('SONG');
  const period = ref<'TODAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH');
  const region = ref<'FOREIGN' | 'KOR'>('KOR');
  const sort = ref<MetricType | 'RELEASED'>('RELEASED');
  const page = ref(0);
  const size = ref(15);
  const genre = ref<string | null>(null);
  const searchTerm = ref('');
  
  const products = ref<Items[]>([]);
  const genres = ref<string[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const loadGenres = async () => {
    try {
      genres.value = await fetchGenres();
    } catch (err) {
      console.error('장르 불러오기 실패', err);
    }
  };

  const loadTracks = async (isNewSearch = false) => {
    try {
      isLoading.value = true;
      const fetchedProducts = await fetchSongMarket(
        filter.value,
        region.value,
        period.value,
        sort.value as any,
        genre.value,
        page.value,
        size.value,
        searchTerm.value
      );

      if (page.value === 0 || isNewSearch) {
        products.value = fetchedProducts;
      } else {
        products.value = [...products.value, ...fetchedProducts];
      }
      error.value = null;
    } catch (err) {
      error.value = '데이터를 불러오는 데 실패했습니다.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const resetAndLoad = () => {
    page.value = 0;
    loadTracks(true);
  };

  watch([filter, region, period, sort, genre, searchTerm], resetAndLoad);
  watch(page, (newPage) => {
    if (newPage > 0) loadTracks();
  });

  onMounted(() => {
    loadGenres();
    loadTracks();
  });

  return {
    filter,
    period,
    region,
    sort,
    page,
    size,
    genre,
    searchTerm,
    products,
    genres,
    isLoading,
    error,
    loadTracks,
    resetAndLoad
  };
}
