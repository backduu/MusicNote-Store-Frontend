import { useEffect, useState } from "react";
import type { ProductResponse } from "../dto/ProductResponse";
import { MusicalNoteIcon } from '@heroicons/react/24/solid';
import { fetchGenres } from "../api/genre";
import { fetchSongMarket } from "../api/songMarket";
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Play, Flame, Search } from "lucide-react";
import { useCartStore } from '../store/CartStore';
import type { Items } from '../types/Product';
import type { MetricType } from '../types/MetricType';

export const SongMarket = () => {
    const [filter, setFilter] = useState<'SONG' | 'ALBUM'>('SONG');
    const [period, setPeriod] = useState<'TODAY' | 'WEEK' | 'MONTH' | 'YEAR'>('MONTH');
    const [region, setRegion] = useState<'FOREIGN' | 'Korea'>('Korea'); 
    const [sort, setSort] = useState<'RELEASED' | 'LIKE' | 'VIEW'>('RELEASED');
    const [page, setPage] = useState(0); // 페이징 관련 함수
    const [size, setSize] = useState(15); // 페이징 관련 함수
    const [genres, setGenres] = useState<string[]>([]);
    const [genre, setGenre] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<Set<number>>(new Set()); 
    const [inputSearchTerm, setInputSearchTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // api 데이터, 로딩 및 에러 상태 관리용 함수
    const [products, setProducts] = useState<Items[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const toggleFavorite = (productId: number) => {
        setFavorites(prevFavorites => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(productId)) {
                newFavorites.delete(productId);
            } else {
                newFavorites.add(productId);
            }
            return newFavorites;
        });
    };

    // 검색 실행 
    const executeSearch = () => {
        setSearchTerm(inputSearchTerm);
        setPage(0); // 검색 시 페이지 초기화
    };

    // 입력 필드 변경 핸들러
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputSearchTerm(e.target.value);
    };

    // Enter 키 누르면 검색 실행
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    // 음악 장르 카테고리 추출 api 호출
    useEffect(() => {
        const loadGenres = async () => {
        try {
            const data = await fetchGenres(); 
            setGenres(data);
          } catch (err) {
            console.error("장르 불러오기 실패", err);
          }
        };
        loadGenres();
    }, []);

    // 필터 변경 시 상품 불러오기
    useEffect(() => {
        const loadTracks = async () => {
        try {
            setIsLoading(true);

            const fetchedProducts = await fetchSongMarket(
            filter,
            region,
            period,
            sort,
            genre,
            page,
            size,
            searchTerm
            );

            if (page === 0) {
            setProducts(fetchedProducts);
            } else {
            setProducts(prev => [...prev, ...fetchedProducts]);
            }

            setError(null);
        } catch (err) {
            setError("데이터를 불러오는 데 실패했습니다.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
        };

        loadTracks();
    }, [sort, period, page, size, region, filter, genre, searchTerm]);


    // 로딩 상태
    if (isLoading && page === 0) {
        return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-gray-600">로딩 중입니다...</p>
            </div>
        </section>
        );
    }

    // 에러 상태
    if (error) {
        return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-red-600">{error}</p>
            </div>
        </section>
        );
    }


    return (
    <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-3 mb-4">
                <MusicalNoteIcon className="w-8 h-8 text-teal-500 animate-bounce" />
                <h1 className="text-4xl font-bold text-gray-900">음악 아카이브</h1>
            </div>
            <p className="text-lg text-gray-600 mb-8 text-left">
                최신 음원부터 인기 트랙까지, 원하는 음악을 바로 만나보세요
            </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 장르(디폴트 국가 - 한국) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        장르
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((g) => (
                        <button
                            key={g}
                            onClick={() => setGenre(g)}
                            className={`px-3 py-1 rounded-lg text-sm ${
                                genre === g
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {g}                    
                        </button>
                        ))}
                    </div>
                </div>

                {/* 기간 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        기간
                    </label>
                    <div className="flex space-x-2">
                        {(['TODAY', 'WEEK', 'MONTH', 'YEAR'] as const).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            period === p
                                ? 'bg-[#4f46e5] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {p === 'TODAY' ? '오늘' : p === 'WEEK' ? '이번 주' : p === 'MONTH' ? '이번 달' : '올해'}
                        </button>
                        ))}
                    </div>
                </div>

                {/* 정렬 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        정렬
                    </label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as typeof sort)}
                        className="w-full border rounded-lg px-3 py-2 text-sm"
                    >
                        <option value="RELEASED">출시순</option>
                        <option value="LIKE">좋아요순</option>
                        <option value="VIEW">조회수순</option>
                    </select>
                </div>

                {/* 타입 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        음원/음반
                    </label>
                    <div className="flex space-x-2">
                    {(['SONG', 'ALBUM'] as const).map((type) => (
                        <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            filter === type
                            ? 'bg-[#4f46e5] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        >
                        {type === 'SONG' ? '음원' : '음반'}
                        </button>
                    ))}
                    </div>
                </div>

                {/* 국가 */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                        국내/국외
                    </label>
                    <div className="flex space-x-2">
                    {(['Korea', 'FOREIGN'] as const).map((p) => (
                    <button
                        key={p}
                        onClick={() => setRegion(p)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        region === p
                            ? 'bg-[#4f46e5] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {p === 'Korea' ? '국내음악' :  '해외음악'}
                    </button>
                    ))}
                    </div>
                </div>
            </div>
        </div>

        {/* 검색창 추가 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex space-x-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="제목, 아티스트, 작곡가 등으로 검색하세요..."
                        value={inputSearchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown} // Enter 키 처리
                        className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 text-base focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button
                    onClick={executeSearch} // 검색 버튼 클릭 시 검색 실행
                    className="px-6 py-3 bg-[#4f46e5] text-white rounded-lg font-medium hover:bg-[#6366f1] transition-colors flex items-center"
                >
                    검색
                </button>
            </div>
        </div>
        
        <div className="space-y-3">
            {products.map((product, index) => (
            <div key={product.id} className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-linear-to-br from-[#4f46e5] to-[#6366f1]">
                        <span className="text-lg font-bold text-white">
                        {index + 1}
                        </span>
                    </div>

                    </div>

                    <Link to={`/products/${product.id}`} className="flex-0 w-16 h-16 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <img
                        src={product.previewUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                    </Link>

                    <div className="flex-1 min-w-0">
                        <Link to={`/products/${product.id}`} className="block text-lg font-semibold text-gray-900 hover:text-[#4f46e5] truncate mb-1">
                            {product.title}
                        </Link>   
                        {product.creator && (
                            <p className="text-sm text-gray-600 truncate mb-2">{product.creator}</p>
                        )}     
                        <div className="flex items-center space-x-2 flex-wrap">
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {product.type === 'ALBUM' ? '음반' : product.type === 'SONG' ? '음원' : '악보'}
                            </span>
                            <span className="text-xs text-gray-600">{product.genre}</span>
                            {product.createdAt && (
                                <span className="text-xs text-gray-500">
                                    {new Date(product.createdAt).toLocaleDateString('ko-KR')}
                                </span>
                            )}
                        </div>                     
                    </div>

                    <div className="hidden md:flex md:flex-col md:items-end md:space-y-2">
                        <div className="text-right">
                            <p className="text-sm text-gray-600">조회</p>
                            <p className="text-lg font-bold text-gray-900">
                                {(product.view || 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600">좋아요</p>
                            <p className="text-lg font-bold text-red-500">
                                {(product.like || 0).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="flex-0">
                        <div className="text-2xl font-bold text-gray-900 mb-3 min-w-30">
                            {/*₩{product.price.toLocaleString()} */}
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button className="inline-flex items-center justify-center space-x-1 px-3 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#6366f1] transition-colors text-sm font-medium" title="미리 듣기">
                                <Play className="w-4 h-4" />
                                <span className="hidden sm:inline">듣기</span>
                            </button>
                            <button
                                onClick={() => toggleFavorite(product.id)}
                                className={`inline-flex items-center justify-center px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                                favorites.has(product.id)
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                title="좋아요"
                            >
                                <Heart className="w-4 h-4" fill={favorites.has(product.id) ? 'currentColor' : 'none'}/>
                                <span className="hidden sm:inline">
                                    {favorites.has(product.id) ? '찜됨' : '찜하기'}
                                </span>
                            </button>
                            <button
                                onClick={() => addToCart(product.id)}
                                className="inline-flex items-center justify-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#4f46e5] hover:text-[#4f46e5] transition-colors text-sm font-medium"
                                title="장바구니 담기"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span className="hidden sm:inline">담기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            ))}
            {products.length !== 0 && (
            <div className="flex justify-center mt-6">
                <button
                    disabled={isLoading || products.length % size !== 0} 
                    onClick={() => setPage(page + 1)}
                    className="px-6 py-2 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"                    
                >
                    {isLoading ? "불러오는 중..." : "더보기"}
                </button>
            </div>
        )}
        </div>
        {products.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <Flame className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">해당하는 곡이 없습니다</p>
        </div>
        )}
    </section>
    );
};