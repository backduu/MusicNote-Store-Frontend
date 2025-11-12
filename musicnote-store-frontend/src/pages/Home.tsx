import { useEffect, useState, ReactNode } from "react";
import { Flame , FileMusic, Music, Headphones, Disc3 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchCarouselItems } from "../api/carousel";
import { fetchNewArrivals  } from "../api/items";
import type { CarouselItem } from "../types/Carousel"
import type { Items } from "../types/Product";
import { ProductType } from "../types/ProductType";
import { Link } from "react-router-dom";


// type 별 캐러셀 소제목 노출 아이콘
const typeIconMap: Record<ProductType, ReactNode> = {
  [ProductType.SONG]: <Music className="w-6 h-6 text-indigo-600" />,
  [ProductType.ALBUM]: <Disc3 className="w-6 h-6 text-indigo-600" />,
  [ProductType.SHEET]: <FileMusic className="w-6 h-6 text-indigo-600" />,
};

export const Home = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]); // 캐루셀 아이템 set 함수
  const [loading, setLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState<Items[]>([]); // 오늘의 상품 set 함수
  const [category, setCategory] = useState<ProductType>(ProductType.SONG);
  // 오늘의 상품 전시 갯수 
  const [albumCount, setAlbumCount] = useState(15);
  const [songCount, setSongCount] = useState(15);
  const [sheetCount, setSheetCount] = useState(15);

  useEffect(() => {
    Promise.all([fetchCarouselItems(), fetchNewArrivals()])
           .then(([carouselData, newArrivalData]) => {
              setCarouselItems(carouselData);
              setNewArrivals(newArrivalData);
           })
           .catch((err) => console.error(err))
           .finally(() => setLoading(false));
          }, []);
        
  // 상품 분류 별 캐러셀 아이템 저장 함수
  const audioItems = carouselItems.filter((i) => i.type === ProductType.SONG);
  const albumItems = carouselItems.filter((i) => i.type === ProductType.ALBUM);
  const sheetItems = carouselItems.filter((i) => i.type === ProductType.SHEET);
  


  const activeList =
  category === ProductType.SONG
    ? audioItems
    : category === ProductType.ALBUM
    ? albumItems
    : sheetItems;

  const slidesPerView = 3;
  const shouldLoop = activeList.length > slidesPerView;
  
  return (
    <div>
      {/* 캐러셀 전시 상품 세션 */}
      <section className="from-gray-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* 카테고리 버튼 */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => setCategory(ProductType.SONG)}
              className={`px-4 py-2 rounded-md border ${
                category === ProductType.SONG
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
            <Music className="w-4 h-4 inline mr-1" /> 음원
            </button>
            <button
              onClick={() => setCategory(ProductType.ALBUM)}
              className={`px-4 py-2 rounded-md border ${
                category === ProductType.ALBUM
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
            <Disc3 className="w-4 h-4 inline mr-1" /> 음반
            </button>
            <button
              onClick={() => setCategory(ProductType.SHEET)}
              className={`px-4 py-2 rounded-md border ${
                category === ProductType.SHEET
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              <FileMusic className="w-4 h-4 inline mr-1" /> 악보
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-2">
            {typeIconMap[category]}
            금주의 추천{" "}
            {category === ProductType.SONG
              ? "음원"
              : category === ProductType.ALBUM
              ? "음반"
              : "악보"}
          </h2>

          {/* Swiper에서 activeList 돌려서 슬라이드 렌더링 */}
          {loading ? (
            <p className="text-center text-gray-500">로딩중...</p>
          ) : activeList.length === 0 ? (
            <p className="text-center text-gray-400">해당 카테고리에 상품이 없습니다.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={slidesPerView}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop={shouldLoop}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {activeList.map((item) => (
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
                        {item.creator}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* 신규 상품 세션 */}
      <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600" />
              오늘의 음반
            </h2>
            {loading ? (
              <p className="text-gray-500">로딩중...</p>
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals
                  .filter((item) => item.type === ProductType.ALBUM)
                  .slice(0, albumCount)
                  .map((item) => (
                <div
                key={item.id}
                className="bg-gray-50 shadow rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.creator}
                    </p>
                  </div>
                </div>
                ))}
              </div>
                <div className="flex justify-end mt-6">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    더보기
                  </Link>
                </div>
              </>
            )}
          </div>
      </section>
      <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600" />
              오늘의 음원
            </h2>
            {loading ? (
              <p className="text-gray-500">로딩중...</p>
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals
                  .filter((item) => item.type === ProductType.SONG)
                  .slice(0, songCount)
                  .map((item) => (
                <div
                key={item.id}
                className="bg-gray-50 shadow rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.creator}
                    </p>
                  </div>
                </div>
                ))}
              </div>
                <div className="flex justify-end mt-6">
                  <Link
                    to="/"
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    더보기
                  </Link>
                </div>
              </>
            )}
          </div>
      </section>
      <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-600" />
              오늘의 악보
            </h2>
            {loading ? (
              <p className="text-gray-500">로딩중...</p>
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals
                  .filter((item) => item.type === ProductType.SHEET)
                  .slice(0, sheetCount)
                  .map((item) => (
                <div
                key={item.id}
                className="bg-gray-50 shadow rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <img
                    src={item.previewUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.creator}
                    </p>
                  </div>
                </div>
               
                ))}
              </div>
                <div className="flex justify-end mt-6">
                <Link
                  to="/"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  더보기
                </Link>
                </div>
              </>
            )}
          </div>
      </section>
    </div>
  );
};
