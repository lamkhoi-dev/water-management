'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Package, Users, LogOut as LogOut2, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Thông Tin Nhân Viên', icon: User, href: '/dashboard' },
  { id: 'warehouse', label: 'Quản Lý Kho', icon: Package, href: '/warehouse' },
  { id: 'hr', label: 'Quản Lý Nhân Sự', icon: Users, href: '/hr' },
]

export function Sidebar() {
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
  }

  return (
    <div className="h-screen w-64 bg-sidebar border-r-2 border-sidebar-border flex flex-col fixed left-0 top-0 shadow-lg">
      {/* Logo */}
      <div className="p-4 border-b-2 border-sidebar-border flex flex-col items-center justify-center">
        <Image src="/logo.png" alt="BIWASE LONG AN" width={100} height={100} className="object-contain" />
        <p className="text-sm font-semibold text-gray-700 mt-2 text-center">Công ty cổ phần Biwase-Long An</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 flex flex-col gap-5">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.id} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all border-2 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                    : 'text-sidebar-foreground border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </Link>
          )
        })}
      </nav>

      {/* User Info and Logout */}
      <div className="p-4 border-t-2 border-sidebar-border space-y-3">
        <div className="px-3 py-3 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">Đăng nhập như</p>
          <p className="text-sm font-medium text-gray-800 truncate" id="user-name">
            User
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200"
        >
          <LogOut2 className="w-4 h-4 mr-2" />
          <span className="text-sm">Đăng Xuất</span>
        </Button>
      </div>
    </div>
  )
}
