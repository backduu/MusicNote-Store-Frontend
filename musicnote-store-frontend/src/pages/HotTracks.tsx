import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Play, Flame } from "lucide-react";
import { useCartStore } from '../store/CartStore';
import { fetchHotTracks } from '../api/hottracks';
import type { Items } from '../types/Product';
import type { MetricType } from '../types/MetricType';

export const HotTracks = () => {
    const { addToCart } = useCartStore();
    const [filter, setFilter] = useState<'ALL' | 'SONG' | 'ALBUM' | 'SHEET'>('ALL');
    const [period, setPeriod] = useState<'TODAY' | 'WEEK' | 'MONTH'>('TODAY');
    const [sort, setSort] = useState<'VIEW' | 'LIKE'>('VIEW');
    const [favorites, setFavorites] = useState<Set<number>>(new Set()); 
    const [page, setPage] = useState(0);   // 페이징 관리 함수
    const [size, setSize] = useState(15); // 페이징 관리 함수

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
    
    // period, metric 변경 시 api 호출
    useEffect(() => {
        const loadTracks = async () => {
            try {
                setIsLoading(true);

                let metric: MetricType = "VIEW";
                if(sort === "LIKE") {
                    metric = "LIKE" as MetricType;
                } 

                const fetchedProducts = await fetchHotTracks(metric, period, page, size);
                
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
    }, [sort, period, page, size]); 

    const filteredProducts = useMemo(() => {
        if (filter === 'ALL') {
            return products;
        }
        
        return products.filter(p => p.type === filter);
        
    }, [products, filter]); 

    // 로딩 상태 처리
    if (isLoading) {
        return (
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-lg text-gray-600">로딩 중입니다...</p>
                </div>
            </section>
        );
    }

    // 에러 상태 처리
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
                    <Flame className="w-8 h-8 text-red-500 animate-pulse" />
                    <h1 className="text-4xl font-bold text-gray-900">Hot Tracks</h1>
                </div>
                <p className="text-lg text-gray-600 mb-8 text-left">
                    지금 가장 뜨거운 음악들을 만나보세요
                </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* 타입 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                            카테고리
                        </label>
                        <div className="flex space-x-2">
                        {(['ALL', 'SONG', 'ALBUM', 'SHEET'] as const).map((type) => (
                            <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                filter === type
                                ? 'bg-[#4f46e5] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            >
                            {type === 'ALL' ? '전체' : type === 'ALBUM' ? '음반' : type === 'SONG' ? '음원' : '악보'}
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
                            {(['TODAY', 'WEEK', 'MONTH'] as const).map((p) => (
                            <button
                                key={p}
                                onClick={() => setPeriod(p)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                period === p
                                    ? 'bg-[#4f46e5] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {p === 'TODAY' ? '오늘' : p === 'WEEK' ? '이번 주' : '이번 달'}
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
                            <option value="VIEW">인기순</option>
                            <option value="LIKE">좋아요순</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {filteredProducts.map((product, index) => (
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
                {filteredProducts.length !== 0 && (
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
            {filteredProducts.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                <Flame className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">해당하는 곡이 없습니다</p>
                </div>
            )}
        </section>
    );
};