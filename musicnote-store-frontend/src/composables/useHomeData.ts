import { ref, computed } from 'vue';
import { fetchCarouselItems } from '../api/carousel';
import { fetchNewArrivals } from '../api/items';
import { ProductType } from '../types/ProductType';
import type { CarouselItem } from '../types/Carousel';
import type { Items } from '../types/Product';

export function useHomeData() {
  const carouselItems = ref<CarouselItem[]>([]);
  const newArrivals = ref<Items[]>([]);
  const isLoading = ref(true);
  const error = ref<string | null>(null);

  const loadHomeData = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const [carouselData, newArrivalData] = await Promise.all([
        fetchCarouselItems(),
        fetchNewArrivals()
      ]);
      carouselItems.value = carouselData;
      newArrivals.value = newArrivalData;
    } catch (err: any) {
      error.value = '데이터를 불러오지 못했습니다.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const getCarouselByCategory = (type: ProductType) => {
    return computed(() => carouselItems.value.filter((i) => i.type === type));
  };

  const getNewArrivalsByCategory = (type: ProductType, count: number) => {
    return computed(() => 
      newArrivals.value.filter((item) => item.type === type).slice(0, count)
    );
  };

  return {
    carouselItems,
    newArrivals,
    isLoading,
    error,
    loadHomeData,
    getCarouselByCategory,
    getNewArrivalsByCategory
  };
}
