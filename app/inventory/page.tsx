'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Archive } from 'lucide-react'

export default function InventoryPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)
  }, [])

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Tồn Kho</h1>
            <p className="text-gray-600">Theo dõi số lượng tồn kho của các sản phẩm</p>
          </div>

          {/* Empty State */}
          <Card className="border-l-4 border-l-purple-600">
            <CardContent className="p-12">
              <div className="text-center">
                <Archive className="w-24 h-24 mx-auto mb-6 text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-600 mb-2">Chức năng đang phát triển</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Chức năng Tồn Kho sẽ được triển khai trong các phiên bản tiếp theo. 
                  Tính năng này sẽ giúp bạn theo dõi chi tiết số lượng tồn kho của từng sản phẩm theo thời gian thực.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
