import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music } from 'lucide-react';
import { Toast } from '../components/Toast';
import { AxiosError } from 'axios';
import { login } from "../api/auth";
import { useUserStore } from "../store/userStore";

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'fail' | 'error' } | null>(null);
    const navigate = useNavigate();
    const { login: setUserLogin } = useUserStore(); 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const loginRes = await login({username, password});
            setUserLogin(loginRes);

            setToast({ message: '로그인 성공!', type: 'success' });
            setTimeout(() => navigate('/'), 1000);
        } catch (error : unknown) {
            console.error(error);
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                  setToast({ message: '입력값이 올바르지 않습니다.', type: 'fail' });
                } else if (error.response?.status === 500) {
                  setToast({ message: '서버 오류가 발생했습니다.', type: 'error' });
                }
              } else if (error instanceof Error) {
                setToast({ message: error.message, type: 'error' });
              } else {
                setToast({ message: '알 수 없는 오류가 발생했습니다.', type: 'error' });
              }                     
        } finally {
            setLoading(false);
        }  
    };
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-start py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Music className="w-12 h-12 text-[#4f46e5]" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    음표상점 로그인
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    계정이 없으신가요?{' '}
                    <Link to="/signup" className="text-[#4f46e5] hover:text-[#6366f1] font-medium">
                        회원가입
                    </Link>
                </p>                
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm rounded-lg sm:px-10 border border-gray-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                아이디
                            </label>        
                            <input
                                id="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                                placeholder="example@email.com"
                            />                  
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                                placeholder="비밀번호를 입력하세요"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4f46e5] hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                        {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>
                </div>
            </div>

            {toast && (
                <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};