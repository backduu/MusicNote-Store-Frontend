import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Music } from 'lucide-react';
import { Toast } from '../components/Toast';
import { AxiosError } from 'axios';
import {UserRole} from '../types/UserRole'
import { signup } from "../api/user";
import { UserStatus } from '../types/UserStatus';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<UserRole>('USER');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'fail' | 'error' } | null>(null);
    const navigate = useNavigate();
    
    // 회원가입 폼 전송 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            setToast({ message: "올바른 이메일 형식이 아닙니다.", type: "fail" });
            return;
        }

        const phoneRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
        if (!phoneRegex.test(phone)) {
          setToast({ message: "올바른 휴대폰 번호 형식이 아닙니다.", type: "fail" });
          return;
        }
            
        if (password !== confirmPassword) {
            setToast({ message: '비밀번호가 일치하지 않습니다.', type: 'fail' });
            return;
        }
      
        if (password.length < 6) {
            setToast({ message: '비밀번호는 최소 6자 이상이어야 합니다.', type: 'fail' });
            return;
         }
          
         setLoading(true);

         try {
            const normalizedPhone = phone.replace(/-/g, "");

            // signup API 호출
            await signup({username, nickname, name, email, address, phone: normalizedPhone, password, role, status: UserStatus.ACTIVE});

            setToast({ message: '회원가입 성공!', type: 'success' });
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

    // 휴대폰 번호 포매팅 함수
    const formatPhoneNumber = (value: string) => {
        // 숫자만 추출
        const onlyNums = value.replace(/\D/g, "");
    
        if (onlyNums.length < 4) return onlyNums;
        if (onlyNums.length < 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
        }
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
    };
  
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                <Music className="w-12 h-12 text-[#4f46e5]" />
                </div>     
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    회원가입
                </h2>  
                <p className="mt-2 text-center text-sm text-gray-600">
                    이미 계정이 있으신가요?{' '}
                    <Link to="/login" className="text-[#4f46e5] hover:text-[#6366f1] font-medium">
                        로그인
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
                                placeholder="hong123"
                            />
                        </div>                        

                        <div>
                            <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                                닉네임
                            </label>
                            <input
                                id="nickname"
                                type="text"
                                required
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                                placeholder="홍이"
                            />
                        </div>   

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                이름
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                                placeholder="홍길동"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                이메일
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            주소
                            </label>
                            <input
                            id="address"
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                                        focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                            placeholder="서울특별시 ..."
                            />
                        </div>


                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            휴대폰번호
                            </label>
                            <input
                            id="phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                                        focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                            placeholder="010-1234-5678"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            권한(Role)
                            </label>
                            <select
                            id="role"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value as UserRole)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm 
                                        focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                            >
                                <option value="USER">사용자</option>
                                <option value="SELLER">판매자</option>
                            </select>
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
                                placeholder="최소 8자 이상"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                비밀번호 확인
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent"
                                placeholder="비밀번호를 다시 입력하세요"
                            />
                        </div>      

                        <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#4f46e5] hover:bg-[#6366f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4f46e5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                        {loading ? '가입 중...' : '회원가입'}
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