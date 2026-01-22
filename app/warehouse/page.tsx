'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Plus, Edit2, Trash2, TrendingDown, AlertCircle } from 'lucide-react'

const MOCK_WAREHOUSE_DATA = [
  { id: 1, name: 'Ống PVC 50mm', category: 'Ống nước', quantity: 250, minStock: 100, unit: 'cái', lastUpdate: '2024-01-15' },
  { id: 2, name: 'Van cầu đôi', category: 'Van', quantity: 45, minStock: 50, unit: 'cái', lastUpdate: '2024-01-14' },
  { id: 3, name: 'Bộ lọc nước', category: 'Thiết bị lọc', quantity: 120, minStock: 50, unit: 'bộ', lastUpdate: '2024-01-13' },
  { id: 4, name: 'Bơm nước 5KW', category: 'Bơm', quantity: 8, minStock: 10, unit: 'cái', lastUpdate: '2024-01-12' },
  { id: 5, name: 'Thiết bị đo áp suất', category: 'Thiết bị đo', quantity: 30, minStock: 15, unit: 'cái', lastUpdate: '2024-01-11' },
  { id: 6, name: 'Ê cu sắt 2"', category: 'Ê cu', quantity: 85, minStock: 50, unit: 'cái', lastUpdate: '2024-01-10' },
  { id: 7, name: 'Đầu nối nylon', category: 'Phụ kiện', quantity: 500, minStock: 200, unit: 'cái', lastUpdate: '2024-01-09' },
  { id: 8, name: 'Dây bọc ống', category: 'Phụ kiện', quantity: 150, minStock: 100, unit: 'm', lastUpdate: '2024-01-08' },
]

const MOCK_TRANSACTIONS = [
  { id: 1, type: 'Nhập', item: 'Ống PVC 50mm', quantity: 100, date: '2024-01-15 10:30', user: 'Nguyễn Văn A' },
  { id: 2, type: 'Xuất', item: 'Van cầu đôi', quantity: 20, date: '2024-01-15 09:15', user: 'Trần Thị B' },
  { id: 3, type: 'Kiểm kê', item: 'Bộ lọc nước', quantity: 120, date: '2024-01-14 14:00', user: 'Lê Văn C' },
  { id: 4, type: 'Nhập', item: 'Bơm nước 5KW', quantity: 5, date: '2024-01-14 11:20', user: 'Phạm Thị D' },
  { id: 5, type: 'Xuất', item: 'Ê cu sắt 2"', quantity: 15, date: '2024-01-13 16:45', user: 'Đặng Văn E' },
]

export default function WarehousePage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [items, setItems] = useState(MOCK_WAREHOUSE_DATA)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)
  }, [])

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const lowStockItems = items.filter((item) => item.quantity <= item.minStock)

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 bg-background min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Quản Lý Kho</h1>
            <p className="text-muted-foreground">Quản lý vật tư, nhập xuất, và kiểm kê kho hàng</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng Vật Tư</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{items.length}</div>
                <p className="text-xs text-muted-foreground">Loại hàng</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng Số Lượng</CardTitle>
                <Package className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{items.reduce((sum, item) => sum + item.quantity, 0)}</div>
                <p className="text-xs text-muted-foreground">Đơn vị</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hàng Tồn Thấp</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{lowStockItems.length}</div>
                <p className="text-xs text-muted-foreground">Cần cấp kết</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Giao Dịch Hôm Nay</CardTitle>
                <TrendingDown className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Xuất/Nhập/Kiểm</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inventory Table */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Danh Sách Vật Tư</CardTitle>
                    <CardDescription>Quản lý kho hàng</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Vật Tư
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Tìm kiếm vật tư..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-medium text-foreground">Tên Vật Tư</th>
                        <th className="text-left py-2 px-2 font-medium text-foreground">Phân Loại</th>
                        <th className="text-right py-2 px-2 font-medium text-foreground">Số Lượng</th>
                        <th className="text-right py-2 px-2 font-medium text-foreground">Tồn Tối Thiểu</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map((item) => {
                        const isLowStock = item.quantity <= item.minStock
                        return (
                          <tr key={item.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-2">
                              <div>
                                <p className="font-medium text-foreground">{item.name}</p>
                                <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-muted-foreground">{item.category}</td>
                            <td className="py-3 px-2 text-right">
                              <span
                                className={`font-medium ${isLowStock ? 'text-orange-600 dark:text-orange-400' : 'text-emerald-600 dark:text-emerald-400'}`}
                              >
                                {item.quantity} {item.unit}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right text-muted-foreground">{item.minStock}</td>
                            <td className="py-3 px-2 text-center">
                              <div className="flex items-center justify-center gap-1">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Low Stock Items */}
              <Card className="border-orange-200 dark:border-orange-900">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    Hàng Tồn Thấp
                  </CardTitle>
                  <CardDescription>{lowStockItems.length} mục</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lowStockItems.map((item) => (
                      <div key={item.id} className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded border border-orange-200 dark:border-orange-800">
                        <p className="font-medium text-sm text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} / {item.minStock} {item.unit}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Giao Dịch Gần Đây</CardTitle>
                  <CardDescription>10 giao dịch mới nhất</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="pb-3 border-b last:border-0">
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              tx.type === 'Nhập'
                                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                : tx.type === 'Xuất'
                                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            }`}
                          >
                            {tx.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{tx.quantity}</span>
                        </div>
                        <p className="text-sm font-medium text-foreground line-clamp-1">{tx.item}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
