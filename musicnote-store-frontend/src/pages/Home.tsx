import { useEffect, useState } from "react";
import { Music, Headphones, Disc3 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchCarouselItems } from "../api/carousel";
import type { CarouselItem } from "../types/Carousel"

export const Home = () => {
  const [items, setItems] = useState<CarouselItem[]>([]); // 캐루셀 아이템 set 함수
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchCarouselItems()
      .then((data) => setItems(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);
  
  return (
    <div>
      <section className="from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
           <Disc3 className="w-6 h-6 text-indigo-600" />
            금주의 추천 음악
          </h2>

          {loading ? (
            <p className="text-center text-gray-500">로딩중...</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={3}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="rounded-lg"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white shadow rounded-lg overflow-hidden">
                    <img
                      src={item.previewUrl}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.creator} · ₩{item.price}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};
