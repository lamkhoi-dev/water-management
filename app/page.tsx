'use client'

import { useState } from 'react'
import Image from 'next/image'

const DEMO_ACCOUNTS = [
  { email: 'kho@company.com', password: 'password123', role: 'Nhân viên kho', name: 'Nguyễn Văn A' },
  { email: 'hr@company.com', password: 'password123', role: 'Nhân viên nhân sự', name: 'Trần Thị B' },
  { email: 'accounting@company.com', password: 'password123', role: 'Kế toán', name: 'Lê Văn C' },
  { email: 'manager@company.com', password: 'password123', role: 'Trưởng phòng', name: 'Phạm Thị D' },
  { email: 'director@company.com', password: 'password123', role: 'Giám đốc', name: 'Đặng Văn E' },
]

export default function LoginPage() {
  const [isActive, setIsActive] = useState(false)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signUpName, setSignUpName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const account = DEMO_ACCOUNTS.find(
      acc => acc.email === signInEmail && acc.password === signInPassword
    )
    
    if (account) {
      localStorage.setItem('user', JSON.stringify(account))
      window.location.href = '/dashboard'
    } else {
      setError('Email hoặc mật khẩu không đúng!')
    }
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo: chuyển sang form đăng nhập sau khi đăng ký
    setIsActive(false)
    setSignInEmail(signUpEmail)
    setSignInPassword('')
  }

  const handleDemoLogin = (account: typeof DEMO_ACCOUNTS[0]) => {
    localStorage.setItem('user', JSON.stringify(account))
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] flex items-center justify-center p-4">
      {/* Main Container */}
      <div 
        className={`relative bg-white rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden w-[1200px] max-w-[95vw] min-h-[700px] transition-all duration-600 ${isActive ? 'active' : ''}`}
        id="container"
      >
        {/* Wave Background - nằm sau phần xanh bên phải */}
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[2]">
          {/* Wave 1 - xanh đậm nhất - dưới cùng */}
          <svg className="absolute bottom-0 -left-[10%] w-[95%] h-[35%] wave-animation wave-1" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#1e40af" d="M0,32L40,58.7C80,85,160,139,240,154.7C320,171,400,149,480,122.7C560,96,640,64,720,74.7C800,85,880,139,960,154.7C1040,171,1120,149,1200,128C1280,107,1360,85,1400,74.7L1440,64L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
          {/* Wave 2 - xanh vừa */}
          <svg className="absolute bottom-0 -left-[10%] w-[90%] h-[30%] wave-animation wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#2563eb" d="M0,64L40,96C80,128,160,192,240,197.3C320,203,400,149,480,128C560,107,640,117,720,138.7C800,160,880,192,960,186.7C1040,181,1120,139,1200,122.7C1280,107,1360,117,1400,122.7L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
          {/* Wave 3 - xanh nhạt */}
          <svg className="absolute bottom-0 -left-[10%] w-[85%] h-[25%] wave-animation wave-3" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#3b82f6" d="M0,96L40,117.3C80,139,160,181,240,186.7C320,192,400,160,480,144C560,128,640,128,720,149.3C800,171,880,213,960,213.3C1040,213,1120,171,1200,149.3C1280,128,1360,128,1400,128L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
          {/* Wave 4 - xanh sky */}
          <svg className="absolute bottom-0 -left-[10%] w-[80%] h-[18%] wave-animation wave-4" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#60a5fa" d="M0,128L40,149.3C80,171,160,213,240,218.7C320,224,400,192,480,176C560,160,640,160,720,176C800,192,880,224,960,224C1040,224,1120,192,1200,170.7C1280,149,1360,139,1400,133.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
          {/* Wave 5 - xanh nhạt nhất - trên cùng */}
          <svg className="absolute bottom-0 -left-[10%] w-[75%] h-[12%] wave-animation wave-5" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path fill="#93c5fd" d="M0,160L40,176C80,192,160,224,240,229.3C320,235,400,213,480,192C560,171,640,149,720,160C800,171,880,213,960,218.7C1040,224,1120,192,1200,176C1280,160,1360,160,1400,160L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
          </svg>
        </div>

        {/* Sign Up Form */}
        <div 
          className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center transition-all duration-600 ease-in-out z-[1] opacity-0 ${
            isActive ? 'translate-x-full opacity-100 z-[5] animate-move' : ''
          }`}
        >
          <form onSubmit={handleSignUp} className="bg-transparent flex flex-col items-center justify-center px-12 h-full w-full relative z-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Tạo Tài Khoản</h1>
            <div className="flex gap-4 my-6">
              <a href="#" className="border border-gray-300 rounded-[20%] w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              </a>
              <a href="#" className="border border-gray-300 rounded-[20%] w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="border border-gray-300 rounded-[20%] w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
            <span className="text-sm text-gray-500 mb-4">hoặc sử dụng email để đăng ký</span>
            <div className="relative w-full my-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input
                type="text"
                placeholder="Họ và tên"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
                className="bg-gray-100 border-none py-3.5 pl-12 pr-5 text-base rounded-lg w-full outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div className="relative w-full my-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="bg-gray-100 border-none py-3.5 pl-12 pr-5 text-base rounded-lg w-full outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div className="relative w-full my-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="bg-gray-100 border-none py-3.5 pl-12 pr-5 text-base rounded-lg w-full outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0284c7] text-white text-sm py-3.5 px-14 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-5 cursor-pointer hover:bg-[#0369a1] transition-colors"
            >
              Đăng Ký
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div 
          className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center transition-all duration-600 ease-in-out z-[2] ${
            isActive ? 'translate-x-full' : ''
          }`}
        >
          <form onSubmit={handleSignIn} className="bg-transparent flex flex-col items-center justify-center px-12 h-full w-full relative z-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Đăng Nhập</h1>
            
            {error && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm mb-3">
                {error}
              </div>
            )}

            <div className="relative w-full my-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="bg-gray-100 border-none py-3.5 pl-12 pr-5 text-base rounded-lg w-full outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div className="relative w-full my-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </span>
              <input
                type="password"
                placeholder="Mật khẩu"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="bg-gray-100 border-none py-3.5 pl-12 pr-5 text-base rounded-lg w-full outline-none focus:ring-2 focus:ring-[#0ea5e9]"
              />
            </div>
            <div className="flex items-center justify-between w-full my-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-[#0284c7] cursor-pointer" />
                <span className="text-sm text-gray-700 font-medium">Nhớ mật khẩu</span>
              </label>
              <a href="#" className="text-sm font-semibold text-[#0284c7] hover:text-[#0369a1] hover:underline transition-colors">Quên mật khẩu?</a>
            </div>
            <button
              type="submit"
              className="bg-[#0284c7] text-white text-sm py-3.5 px-14 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-3 cursor-pointer hover:bg-[#0369a1] transition-colors"
            >
              Đăng Nhập
            </button>
          </form>
        </div>

        {/* Toggle Container */}
        <div 
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-l-[150px] rounded-bl-[100px] z-[1000] ${
            isActive ? '-translate-x-full rounded-l-none rounded-r-[150px] rounded-br-[100px]' : ''
          }`}
        >
          <div 
            className={`bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white relative -left-full h-full w-[200%] transition-all duration-600 ease-in-out ${
              isActive ? 'translate-x-1/2' : 'translate-x-0'
            }`}
          >
            {/* Toggle Left Panel */}
            <div 
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 transition-all duration-600 ease-in-out ${
                isActive ? 'translate-x-0' : '-translate-x-[200%]'
              }`}
            >
              <div className="mb-8">
                <Image 
                  src="/logo.png" 
                  alt="BIWASE Long An" 
                  width={150} 
                  height={150} 
                  className="object-contain brightness-0 invert"
                />
              </div>
              <h1 className="text-3xl font-bold mb-5">Chào Mừng Trở Lại!</h1>
              <p className="text-base leading-6 tracking-wide mb-6 opacity-90">
                Đăng nhập để sử dụng đầy đủ tính năng của hệ thống quản lý BIWASE Long An
              </p>
              <button
                onClick={() => setIsActive(false)}
                className="bg-transparent border-2 border-white text-white text-sm py-3.5 px-14 rounded-lg font-semibold tracking-wider uppercase cursor-pointer hover:bg-white/10 transition-colors"
              >
                Đăng Nhập
              </button>
            </div>

            {/* Toggle Right Panel */}
            <div 
              className={`absolute w-1/2 h-full flex flex-col items-center justify-center px-8 text-center top-0 right-0 transition-all duration-600 ease-in-out ${
                isActive ? 'translate-x-[200%]' : 'translate-x-0'
              }`}
            >
              <div className="mb-8">
                <Image 
                  src="/logo.png" 
                  alt="BIWASE Long An" 
                  width={150} 
                  height={150} 
                  className="object-contain brightness-0 invert"
                />
              </div>
              <h1 className="text-3xl font-bold mb-5">Welcome!</h1>
              <p className="text-base leading-6 tracking-wide mb-6 opacity-90">
                Hệ thống quản lý nội bộ BIWASE Long An
              </p>
              <button
                onClick={() => setIsActive(true)}
                className="bg-transparent border-2 border-white text-white text-sm py-3.5 px-14 rounded-lg font-semibold tracking-wider uppercase cursor-pointer hover:bg-white/10 transition-colors"
              >
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes move {
          0%, 49.99% {
            opacity: 0;
            z-index: 1;
          }
          50%, 100% {
            opacity: 1;
            z-index: 5;
          }
        }
        .animate-move {
          animation: move 0.6s;
        }
        .duration-600 {
          transition-duration: 0.6s;
        }
        
        /* Wave animation - chạy qua phải liên tục */
        @keyframes waveFlow {
          0% {
            transform: translateX(-10%);
          }
          100% {
            transform: translateX(10%);
          }
        }
        
        .wave-animation {
          animation: waveFlow linear infinite alternate;
        }
        
        .wave-1 {
          animation-duration: 4s;
        }
        
        .wave-2 {
          animation-duration: 3s;
          animation-delay: 0.5s;
        }
        
        .wave-3 {
          animation-duration: 3.5s;
          animation-delay: 0.2s;
        }
        
        .wave-4 {
          animation-duration: 2.5s;
          animation-delay: 0.7s;
        }
        
        .wave-5 {
          animation-duration: 3.2s;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  )
}
