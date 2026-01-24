'use client'

import { useState } from 'react'
import Image from 'next/image'

const DEMO_ACCOUNTS = [
  { username: 'kho', password: 'password123', role: 'Nhân viên kho', name: 'Nguyễn Văn A' },
  { username: 'hr', password: 'password123', role: 'Nhân viên nhân sự', name: 'Trần Thị B' },
  { username: 'ketoan', password: 'password123', role: 'Kế toán', name: 'Lê Văn C' },
  { username: 'truongphong', password: 'password123', role: 'Trưởng phòng', name: 'Phạm Thị D' },
  { username: 'giamdoc', password: 'password123', role: 'Giám đốc', name: 'Đặng Văn E' },
]

export default function LoginPage() {
  const [signInUsername, setSignInUsername] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const account = DEMO_ACCOUNTS.find(
      acc => acc.username === signInUsername && acc.password === signInPassword
    )
    
    if (account) {
      localStorage.setItem('user', JSON.stringify(account))
      window.location.href = '/dashboard'
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!')
    }
  }

  return (
    <div className="min-h-screen w-full">
      {/* Main Container */}
      <div 
        className="relative bg-white overflow-hidden w-full h-screen"
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

        {/* Sign In Form */}
        <div 
          className="absolute top-0 left-0 h-full w-1/2 flex items-center justify-center z-[2]"
        >
          <form onSubmit={handleSignIn} className="bg-transparent flex flex-col items-center justify-center h-full w-full max-w-[400px] mx-auto relative z-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Đăng Nhập</h1>
            
            {error && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm mb-3">
                {error}
              </div>
            )}

            <div className="relative w-full my-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={signInUsername}
                onChange={(e) => setSignInUsername(e.target.value)}
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
          className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden rounded-l-[150px] rounded-bl-[100px] z-[1000]"
        >
          <div 
            className="bg-gradient-to-r from-[#0ea5e9] to-[#0284c7] text-white relative h-full w-full flex flex-col items-center justify-center px-8 text-center"
          >
            <div className="mb-10">
              <Image 
                src="/logo.png" 
                alt="BIWASE Long An" 
                width={220} 
                height={220} 
                className="object-contain"
              />
            </div>
            <h1 className="text-5xl font-bold mb-6">Chào mừng</h1>
            <p className="text-3xl leading-9 tracking-wide mb-3 font-semibold">
              Công ty cổ phần Biwase-Long An
            </p>
            <p className="text-xl leading-7 tracking-wide opacity-90 italic">
              Chất lượng tạo nên niềm tin
            </p>
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
