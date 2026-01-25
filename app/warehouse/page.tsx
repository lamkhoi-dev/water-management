'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Plus, Edit2, Trash2, Search, X, Save, Warehouse, Factory, ShoppingBag, Building } from 'lucide-react'

// Dữ liệu mặc định cho 3 kho
const DEFAULT_WAREHOUSE_DATA: Record<string, any[]> = {
  'kho-vat-tu': [
    { id: 1, name: 'Ống PVC 50mm', category: 'Ống nước', quantity: 250, unit: 'cái', price: 45000 },
    { id: 2, name: 'Van cầu đôi', category: 'Van', quantity: 45, unit: 'cái', price: 120000 },
    { id: 3, name: 'Bộ lọc nước', category: 'Thiết bị lọc', quantity: 120, unit: 'bộ', price: 850000 },
    { id: 4, name: 'Bơm nước 5KW', category: 'Bơm', quantity: 8, unit: 'cái', price: 3500000 },
    { id: 5, name: 'Thiết bị đo áp suất', category: 'Thiết bị đo', quantity: 30, unit: 'cái', price: 450000 },
    { id: 6, name: 'Ê cu sắt 2"', category: 'Phụ kiện', quantity: 85, unit: 'cái', price: 15000 },
    { id: 7, name: 'Đầu nối nylon', category: 'Phụ kiện', quantity: 500, unit: 'cái', price: 8000 },
  ],
  'kho-xay-dung': [
    { id: 1, name: 'Xi măng PCB40', category: 'Vật liệu xây dựng', quantity: 500, unit: 'bao', price: 95000 },
    { id: 2, name: 'Thép phi 10', category: 'Thép', quantity: 200, unit: 'cây', price: 180000 },
    { id: 3, name: 'Gạch ống', category: 'Gạch', quantity: 10000, unit: 'viên', price: 1500 },
    { id: 4, name: 'Cát xây dựng', category: 'Cát đá', quantity: 50, unit: 'm³', price: 350000 },
    { id: 5, name: 'Đá 1x2', category: 'Cát đá', quantity: 30, unit: 'm³', price: 420000 },
    { id: 6, name: 'Ván coffa', category: 'Cốp pha', quantity: 100, unit: 'tấm', price: 85000 },
  ],
  'kho-thuong-mai': [
    { id: 1, name: 'Đồng hồ nước DN15', category: 'Đồng hồ đo', quantity: 150, unit: 'cái', price: 250000 },
    { id: 2, name: 'Đồng hồ nước DN20', category: 'Đồng hồ đo', quantity: 100, unit: 'cái', price: 350000 },
    { id: 3, name: 'Bình lọc nước gia đình', category: 'Thiết bị lọc', quantity: 50, unit: 'bộ', price: 1200000 },
    { id: 4, name: 'Máy bơm mini', category: 'Bơm', quantity: 25, unit: 'cái', price: 850000 },
    { id: 5, name: 'Vòi nước inox', category: 'Phụ kiện', quantity: 200, unit: 'cái', price: 180000 },
    { id: 6, name: 'Bồn chứa nước 1000L', category: 'Bồn chứa', quantity: 15, unit: 'cái', price: 2500000 },
  ],
}

const WAREHOUSES = [
  { id: 'kho-vat-tu', name: 'Kho Vật Tư Nhà Máy', icon: Factory, color: 'blue' },
  { id: 'kho-xay-dung', name: 'Kho Xây Dựng Cơ Bản', icon: Building, color: 'orange' },
  { id: 'kho-thuong-mai', name: 'Kho Thương Mại', icon: ShoppingBag, color: 'green' },
]

interface Product {
  id: number
  name: string
  category: string
  quantity: number
  unit: string
  price: number
}

export default function WarehousePage() {
  const [user, setUser] = useState<any>(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState('kho-vat-tu')
  const [searchTerm, setSearchTerm] = useState('')
  const [warehouseData, setWarehouseData] = useState<Record<string, Product[]>>(DEFAULT_WAREHOUSE_DATA)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    price: 0,
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)

    // Load data từ localStorage nếu có
    const savedData = localStorage.getItem('warehouseData')
    if (savedData) {
      setWarehouseData(JSON.parse(savedData))
    }
  }, [])

  // Lưu data vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('warehouseData', JSON.stringify(warehouseData))
  }, [warehouseData])

  const currentItems = warehouseData[selectedWarehouse] || []
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentWarehouse = WAREHOUSES.find(w => w.id === selectedWarehouse)

  // Thêm sản phẩm
  const handleAdd = () => {
    setEditingProduct(null)
    setFormData({ name: '', category: '', quantity: 0, unit: '', price: 0 })
    setIsModalOpen(true)
  }

  // Sửa sản phẩm
  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
      price: product.price,
    })
    setIsModalOpen(true)
  }

  // Xóa sản phẩm
  const handleDelete = (productId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setWarehouseData(prev => ({
        ...prev,
        [selectedWarehouse]: prev[selectedWarehouse].filter(p => p.id !== productId)
      }))
    }
  }

  // Lưu sản phẩm (thêm mới hoặc cập nhật)
  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.unit) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }

    if (editingProduct) {
      // Cập nhật sản phẩm
      setWarehouseData(prev => ({
        ...prev,
        [selectedWarehouse]: prev[selectedWarehouse].map(p =>
          p.id === editingProduct.id ? { ...p, ...formData } : p
        )
      }))
    } else {
      // Thêm sản phẩm mới
      const newId = Math.max(...currentItems.map(p => p.id), 0) + 1
      setWarehouseData(prev => ({
        ...prev,
        [selectedWarehouse]: [...prev[selectedWarehouse], { id: newId, ...formData }]
      }))
    }
    setIsModalOpen(false)
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const totalValue = currentItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const totalItems = currentItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Kho</h1>
            <p className="text-gray-600">Quản lý vật tư, nhập xuất, và kiểm kê kho hàng</p>
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
                      {warehouseData[warehouse.id]?.length || 0} sản phẩm
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tổng loại SP</p>
                    <p className="text-2xl font-bold text-gray-800">{currentItems.length}</p>
                  </div>
                  <Package className="w-10 h-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tổng số lượng</p>
                    <p className="text-2xl font-bold text-gray-800">{totalItems.toLocaleString()}</p>
                  </div>
                  <Warehouse className="w-10 h-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tổng giá trị kho</p>
                    <p className="text-2xl font-bold text-green-600">
                      {totalValue.toLocaleString('vi-VN')} VNĐ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Table */}
          <Card className={`border-l-4 ${
              currentWarehouse?.color === 'blue' ? 'border-l-blue-600' :
              currentWarehouse?.color === 'orange' ? 'border-l-orange-500' : 'border-l-green-600'
            }`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={`flex items-center gap-2 ${
                  currentWarehouse?.color === 'blue' ? 'text-blue-600' :
                  currentWarehouse?.color === 'orange' ? 'text-orange-500' : 'text-green-600'
                }`}>
                  {currentWarehouse && <currentWarehouse.icon className="w-5 h-5" />}
                  {currentWarehouse?.name}
                </CardTitle>
                <Button onClick={handleAdd} className="bg-blue-600 text-white hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Sản Phẩm
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">STT</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên Sản Phẩm</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Phân Loại</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Số Lượng</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Đơn Giá</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Thành Tiền</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          Không có sản phẩm nào
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item, index) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-gray-600">{index + 1}</td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{item.name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-gray-100 rounded text-gray-600 text-xs">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-gray-800">
                            {item.quantity.toLocaleString()} {item.unit}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {item.price.toLocaleString('vi-VN')} VNĐ
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-green-600">
                            {(item.quantity * item.price).toLocaleString('vi-VN')} VNĐ
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(item)}
                                className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(item.id)}
                                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Modal Form */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nhập tên sản phẩm"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phân loại *</label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Nhập phân loại"
                      className="border-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng *</label>
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        placeholder="0"
                        className="border-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị *</label>
                      <Input
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="cái, bộ, m..."
                        className="border-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá (VNĐ)</label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      placeholder="0"
                      className="border-2"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Hủy
                  </Button>
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingProduct ? 'Cập Nhật' : 'Thêm Mới'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
