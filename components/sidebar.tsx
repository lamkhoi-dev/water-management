'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Users, Package, LogOut as LogOut2, Droplets } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
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
    <div className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
        <Image src="/logo.png" alt="BIWASE LONG AN" width={120} height={120} className="object-contain" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.id} href={item.href}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
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
      <div className="p-4 border-t border-sidebar-border space-y-3">
        <div className="px-2 py-2 bg-sidebar-accent/20 rounded-lg">
          <p className="text-xs text-sidebar-foreground/60">Đăng nhập như</p>
          <p className="text-sm font-medium text-sidebar-foreground truncate" id="user-name">
            User
          </p>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut2 className="w-4 h-4 mr-2" />
          <span className="text-sm">Đăng Xuất</span>
        </Button>
      </div>
    </div>
  )
}
