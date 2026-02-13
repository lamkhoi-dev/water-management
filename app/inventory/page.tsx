'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Archive, Factory, Building, ShoppingBag, Search, Eye, X } from 'lucide-react'

const WAREHOUSES = [
  { id: 'kho-vat-tu', name: 'Kho Vật Tư Nhà Máy', icon: Factory, color: 'blue' },
  { id: 'kho-xay-dung', name: 'Kho Xây Dựng Cơ Bản', icon: Building, color: 'orange' },
  { id: 'kho-thuong-mai', name: 'Kho Thương Mại', icon: ShoppingBag, color: 'green' },
]

interface Product {
  id: number
  code: string
  name: string
  unit: string
  quantity: number
  priceIn: number
  priceOut: number
  weight: number
  location: string
  locationImage: string
  importDate: string
}

export default function InventoryPage() {
  const [user, setUser] = useState<any>(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState('kho-vat-tu')
  const [searchTerm, setSearchTerm] = useState('')
  const [deletedProducts, setDeletedProducts] = useState<Record<string, Product[]>>({ 'kho-vat-tu': [], 'kho-xay-dung': [], 'kho-thuong-mai': [] })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)

    // Load deleted products from localStorage
    const savedDeleted = localStorage.getItem('deletedProducts')
    if (savedDeleted) {
      setDeletedProducts(JSON.parse(savedDeleted))
    }
  }, [])

  const currentItems = deletedProducts[selectedWarehouse] || []
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentWarehouse = WAREHOUSES.find(w => w.id === selectedWarehouse)

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product)
    setIsDetailModalOpen(true)
  }

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
            <p className="text-gray-600">Danh sách các sản phẩm đã xóa khỏi kho</p>
          </div>

          {/* Warehouse Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {WAREHOUSES.map((warehouse) => {
              const Icon = warehouse.icon
              const isSelected = selectedWarehouse === warehouse.id
              const colorClasses = {
                blue: isSelected ? 'bg-blue-600 text-white border-blue-700' : 'bg-white text-blue-600 border-blue-200 hover:border-blue-400',
                orange: isSelected ? 'bg-orange-500 text-white border-orange-600' : 'bg-white text-orange-500 border-orange-200 hover:border-orange-400',
                green: isSelected ? 'bg-green-600 text-white border-green-700' : 'bg-white text-green-600 border-green-200 hover:border-green-400',
              }
              return (
                <button
                  key={warehouse.id}
                  onClick={() => setSelectedWarehouse(warehouse.id)}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${colorClasses[warehouse.color as keyof typeof colorClasses]}`}
                >
                  <Icon className="w-8 h-8" />
                  <div className="text-left">
                    <p className="font-semibold">{warehouse.name}</p>
                    <p className={`text-sm ${isSelected ? 'opacity-80' : 'opacity-60'}`}>
                      {deletedProducts[warehouse.id]?.length || 0} sản phẩm
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Product Table */}
          <Card className={`border-l-4 ${
              currentWarehouse?.color === 'blue' ? 'border-l-blue-600' :
              currentWarehouse?.color === 'orange' ? 'border-l-orange-500' : 'border-l-green-600'
            }`}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${
                currentWarehouse?.color === 'blue' ? 'text-blue-600' :
                currentWarehouse?.color === 'orange' ? 'text-orange-500' : 'text-green-600'
              }`}>
                {currentWarehouse && <currentWarehouse.icon className="w-5 h-5" />}
                {currentWarehouse?.name} - Sản phẩm đã xóa
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo mã hàng hoặc tên hàng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200"
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-center py-3 px-4 font-semibold text-gray-700 w-16">STT</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Mã Hàng</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên Hàng</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Số Lượng</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-gray-500">
                          <Archive className="w-16 h-16 mx-auto mb-2 text-gray-300" />
                          <p>Không có sản phẩm nào</p>
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, index) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-center text-gray-600">{index + 1}</td>
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium text-blue-600">{item.code}</span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{item.name}</p>
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-gray-800">
                            {item.quantity.toLocaleString()} {item.unit}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewDetail(item)}
                              className="hover:bg-blue-100 text-blue-600"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Xem
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Detail Modal */}
          {isDetailModalOpen && selectedProduct && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Chi Tiết Sản Phẩm</h2>
                  <button onClick={() => setIsDetailModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedProduct.locationImage && (
                    <div className="mb-4">
                      <img 
                        src={selectedProduct.locationImage} 
                        alt={selectedProduct.name}
                        className="w-full h-64 object-cover rounded-lg border-2"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Mã hàng</p>
                      <p className="font-mono font-bold text-blue-600">{selectedProduct.code}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Tên hàng</p>
                      <p className="font-medium">{selectedProduct.name}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Đơn vị tính</p>
                      <p className="font-medium">{selectedProduct.unit}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Số lượng</p>
                      <p className="font-bold text-green-600">{selectedProduct.quantity.toLocaleString()} {selectedProduct.unit}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Giá nhập</p>
                      <p className="font-medium">{selectedProduct.priceIn.toLocaleString('vi-VN')} đ</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Giá xuất</p>
                      <p className="font-medium">{selectedProduct.priceOut.toLocaleString('vi-VN')} đ</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Trọng lượng</p>
                      <p className="font-medium">{selectedProduct.weight} kg</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Vị trí</p>
                      <p className="font-medium">{selectedProduct.location}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Ngày nhập kho</p>
                      <p className="font-medium">{selectedProduct.importDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setIsDetailModalOpen(false)} className="flex-1">
                      Đóng
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
