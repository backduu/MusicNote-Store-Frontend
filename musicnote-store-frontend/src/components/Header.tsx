import { Music, ShoppingCart, User, UserPlus, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    return (
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
          <div className="flex items-center justify-between h-16">
            {/* 상단 로고/네비게이션 */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Music className="w-8 h-8 text-[#4f46e5]" />
              <span className="text-xl font-bold text-gray-900">음표상점</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/products" className="text-gray-700 hover:text-[#4f46e5] transition-colors">
                핫트랙스
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-[#4f46e5] transition-colors">
                음원마켓
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-[#4f46e5] transition-colors">
                악보 아카이브
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-[#4f46e5] transition-colors">
                문의하기
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 bg-[#4f46e5] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>로그인</span>
              </Link> 
              <Link
                  to="/signup"
                  className="flex items-center space-x-1 px-4 py-2 bg-[#5b5b66] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>회원가입</span>
              </Link>              
            </div>
          </div>
        </div>


        {/* 아랫줄 메뉴바
        <div className="bg-note-bg border-t border-note-border px-6 py-2">
            <nav className="flex space-x-6 text-note-text font-medium">
            <a href="/hottracks" className="text-note-text hover:text-green-500 transition-colors duration-200">핫트랙스</a>
            <a href="/soundshop" className="text-note-text hover:text-green-500 transition-colors duration-200">음원 마켓</a>
            <a href="/sheet-archive" className="text-note-text hover:text-green-500 transition-colors duration-200">악보 아카이브</a>
            <a href="/about" className="text-note-text hover:text-green-500 transition-colors duration-200">소개</a>
            <a href="/support" className="text-note-text hover:text-green-500 transition-colors duration-200">문의하기</a>
            </nav>
        </div> */}

      </header>
    );
  }