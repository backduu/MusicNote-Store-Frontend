import plugin from 'tailwindcss/plugin'; 

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          fontFamily: {
            'inter': ['Inter', 'sans-serif'],
          },
          colors: {
            // 기본 UI
            "note-bg": "#f9fafb",       // 배경
            "note-surface": "#ffffff",  // 카드/컨테이너
            "note-border": "#e5e7eb",   // 테두리
            "note-text": "#ff0077",     // 기본 텍스트
            "note-muted": "#6b7280",    // 보조 텍스트
    
    
            // 브랜드 포인트 컬러
            "note-primary": "#4f46e5",  // 메인 버튼/링크
            "note-secondary": "#10b981",// 보조 강조
            "note-accent": "#f59e0b",   // 하이라이트  
            "note-secondary-light": "#059669", // hover 시 밝은 초록색
            "note-accent-light": "#fbbf24",  // hover 시 밝은 주황색


            // 깃헙 색상
            "github-accent": "#24292f",   // 다크 그레이
            "github-border": "#d0d7de",   // 라이트 그레이
            "github-text": "#1f2328",     // 기본 텍스트          
          },
          boxShadow: {
            card: "0 2px 8px rgba(0,0,0,0.05)",
          },    
          animation:{
            'float': 'float 3s ease-in-out infinite',
            'float-delayed': 'floatDelayed 3s ease-in-out infinite 0.5s',
            'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'fadeIn' : 'fadeIn 0.5s ease-in-out',
          },
          keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            },
            floatDelayed: {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-15px)' },
            },
            fadeIn: {
                "0%": { opacity: 0 },
                "100%": { opacity: 1 },
              },      
          },
        },
      },
      plugins: [
        // // 버튼 컴포넌트를 직접 정의
        // plugin(function({ addComponents }) {
        //     addComponents({
        //       '.btn-primary': {
        //         '@apply px-6 py-3 bg-github-accent text-white font-medium rounded-lg hover:bg-github-accent/90 transition-all duration-200 flex items-center justify-center': {},
        //       },
        //       '.btn-secondary': {
        //         '@apply px-6 py-3 border-2 border-github-border text-github-text font-medium rounded-lg hover:border-github-accent hover:text-github-accent transition-all duration-200 flex items-center justify-center': {},
        //       },
        //     })
        //   })
        ],
  }