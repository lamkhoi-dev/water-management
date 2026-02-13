'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Plus, Edit2, Trash2, Search, X, Save, Warehouse, Factory, ShoppingBag, Building, Upload, LogIn, LogOut } from 'lucide-react'

// Dữ liệu mặc định cho 3 kho
const DEFAULT_WAREHOUSE_DATA: Record<string, Product[]> = {
  'kho-vat-tu': [
    { id: 1, code: 'VT001', name: 'Ống PVC 50mm', unit: 'cái', quantity: 250, priceIn: 40000, priceOut: 45000, weight: 2.5, location: 'Kệ A1', locationImage: '', importDate: '2024-01-15' },
    { id: 2, code: 'VT002', name: 'Van cầu đôi', unit: 'cái', quantity: 45, priceIn: 100000, priceOut: 120000, weight: 1.2, location: 'Kệ A2', locationImage: '', importDate: '2024-01-20' },
    { id: 3, code: 'VT003', name: 'Bộ lọc nước', unit: 'bộ', quantity: 120, priceIn: 750000, priceOut: 850000, weight: 5, location: 'Kệ B1', locationImage: '', importDate: '2024-02-01' },
    { id: 4, code: 'VT004', name: 'Bơm nước 5KW', unit: 'cái', quantity: 8, priceIn: 3000000, priceOut: 3500000, weight: 25, location: 'Khu C', locationImage: '', importDate: '2024-02-05' },
    { id: 5, code: 'VT005', name: 'Thiết bị đo áp suất', unit: 'cái', quantity: 30, priceIn: 400000, priceOut: 450000, weight: 0.5, location: 'Kệ A3', locationImage: '', importDate: '2024-02-10' },
  ],
  'kho-xay-dung': [
    { id: 1, code: 'XD001', name: 'Xi măng PCB40', unit: 'bao', quantity: 500, priceIn: 85000, priceOut: 95000, weight: 50, location: 'Khu D', locationImage: '', importDate: '2024-01-10' },
    { id: 2, code: 'XD002', name: 'Thép phi 10', unit: 'cây', quantity: 200, priceIn: 160000, priceOut: 180000, weight: 8, location: 'Khu E', locationImage: '', importDate: '2024-01-18' },
    { id: 3, code: 'XD003', name: 'Gạch ống', unit: 'viên', quantity: 10000, priceIn: 1200, priceOut: 1500, weight: 2, location: 'Khu F', locationImage: '', importDate: '2024-01-25' },
    { id: 4, code: 'XD004', name: 'Cát xây dựng', unit: 'm³', quantity: 50, priceIn: 300000, priceOut: 350000, weight: 1500, location: 'Bãi G', locationImage: '', importDate: '2024-02-03' },
  ],
  'kho-thuong-mai': [
    { id: 1, code: 'TM001', name: 'Đồng hồ nước DN15', unit: 'cái', quantity: 150, priceIn: 200000, priceOut: 250000, weight: 0.8, location: 'Kệ TM1', locationImage: '', importDate: '2024-01-12' },
    { id: 2, code: 'TM002', name: 'Đồng hồ nước DN20', unit: 'cái', quantity: 100, priceIn: 300000, priceOut: 350000, weight: 1, location: 'Kệ TM1', locationImage: '', importDate: '2024-01-22' },
    { id: 3, code: 'TM003', name: 'Bình lọc nước gia đình', unit: 'bộ', quantity: 50, priceIn: 1000000, priceOut: 1200000, weight: 3, location: 'Kệ TM2', locationImage: '', importDate: '2024-01-28' },
    { id: 4, code: 'TM004', name: 'Máy bơm mini', unit: 'cái', quantity: 25, priceIn: 750000, priceOut: 850000, weight: 5, location: 'Kệ TM3', locationImage: '', importDate: '2024-02-06' },
  ],
}

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

export default function WarehousePage() {
  const [user, setUser] = useState<any>(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState('kho-vat-tu')
  const [searchTerm, setSearchTerm] = useState('')
  const [warehouseData, setWarehouseData] = useState<Record<string, Product[]>>(DEFAULT_WAREHOUSE_DATA)
  const [deletedProducts, setDeletedProducts] = useState<Record<string, Product[]>>({ 'kho-vat-tu': [], 'kho-xay-dung': [], 'kho-thuong-mai': [] })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'import' | 'export'>('import')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [exportCodeInput, setExportCodeInput] = useState('')
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)
  const [exportQuantity, setExportQuantity] = useState(0)
  const [exportPrice, setExportPrice] = useState(0)
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    unit: '',
    quantity: 0,
    priceIn: 0,
    priceOut: 0,
    weight: 0,
    location: '',
    locationImage: '',
    importDate: new Date().toISOString().split('T')[0],
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

    // Load deleted products
    const savedDeleted = localStorage.getItem('deletedProducts')
    if (savedDeleted) {
      setDeletedProducts(JSON.parse(savedDeleted))
    }
  }, [])

  // Lưu data vào localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem('warehouseData', JSON.stringify(warehouseData))
  }, [warehouseData])

  // Lưu deleted products vào localStorage
  useEffect(() => {
    localStorage.setItem('deletedProducts', JSON.stringify(deletedProducts))
  }, [deletedProducts])

  const currentItems = warehouseData[selectedWarehouse] || []
  const filteredItems = currentItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentWarehouse = WAREHOUSES.find(w => w.id === selectedWarehouse)

  // Nhập kho
  const handleImport = () => {
    setEditingProduct(null)
    setModalType('import')
    setFormData({ code: '', name: '', unit: '', quantity: 0, priceIn: 0, priceOut: 0, weight: 0, location: '', locationImage: '', importDate: new Date().toISOString().split('T')[0] })
    setIsModalOpen(true)
  }

  // Xuất kho
  const handleExport = () => {
    setModalType('export')
    setExportCodeInput('')
    setFoundProduct(null)
    setExportQuantity(0)
    setExportPrice(0)
    setIsModalOpen(true)
  }

  // Tìm sản phẩm khi nhập mã
  const handleSearchExportCode = (code: string) => {
    const upperCode = code.toUpperCase()
    setExportCodeInput(upperCode)
    
    const product = currentItems.find(p => p.code === upperCode)
    if (product) {
      setFoundProduct(product)
      setExportQuantity(0)
      setExportPrice(product.priceOut)
    } else {
      setFoundProduct(null)
      setExportQuantity(0)
      setExportPrice(0)
    }
  }

  // Xác nhận xuất kho
  const handleConfirmExport = () => {
    if (!foundProduct) {
      alert('Không tìm thấy sản phẩm!')
      return
    }
    if (exportQuantity <= 0) {
      alert('Số lượng xuất phải lớn hơn 0!')
      return
    }
    if (exportQuantity > foundProduct.quantity) {
      alert(`Số lượng tồn kho không đủ! Hiện có: ${foundProduct.quantity} ${foundProduct.unit}`)
      return
    }

    // Cập nhật số lượng trong kho
    setWarehouseData(prev => ({
      ...prev,
      [selectedWarehouse]: prev[selectedWarehouse].map(p =>
        p.id === foundProduct.id 
          ? { ...p, quantity: p.quantity - exportQuantity }
          : p
      )
    }))

    alert(`Đã xuất ${exportQuantity} ${foundProduct.unit} ${foundProduct.name}`)
    setIsModalOpen(false)
  }

  // Sửa sản phẩm
  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setModalType('import')
    setFormData({
      code: product.code,
      name: product.name,
      unit: product.unit,
      quantity: product.quantity,
      priceIn: product.priceIn,
      priceOut: product.priceOut,
      weight: product.weight,
      location: product.location,
      locationImage: product.locationImage,
      importDate: product.importDate,
    })
    setIsModalOpen(true)
  }

  // Xóa sản phẩm (chuyển sang deletedProducts)
  const handleDelete = (productId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      const productToDelete = currentItems.find(p => p.id === productId)
      if (productToDelete) {
        // Chuyển sang deletedProducts
        setDeletedProducts(prev => ({
          ...prev,
          [selectedWarehouse]: [...prev[selectedWarehouse], productToDelete]
        }))
        // Xóa khỏi warehouseData
        setWarehouseData(prev => ({
          ...prev,
          [selectedWarehouse]: prev[selectedWarehouse].filter(p => p.id !== productId)
        }))
      }
    }
  }

  // Lưu sản phẩm (thêm mới hoặc cập nhật)
  const handleSave = () => {
    if (!formData.code || !formData.name || !formData.unit) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
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

  // Xử lý upload ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, locationImage: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
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
                <div className="flex gap-2">
                  <Button onClick={handleImport} className="bg-green-600 text-white hover:bg-green-700">
                    <LogIn className="h-4 w-4 mr-2" />
                    Nhập Kho
                  </Button>
                  <Button onClick={handleExport} className="bg-orange-500 text-white hover:bg-orange-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Xuất Kho
                  </Button>
                </div>
              </div>
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Mã Hàng</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên Hàng</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">ĐVT</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Số Lượng</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Giá Nhập</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Giá Xuất</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Trọng Lượng</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Vị Trí</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-center py-8 text-gray-500">
                          Không có sản phẩm nào
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium text-blue-600">{item.code}</span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{item.name}</p>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{item.unit}</td>
                          <td className="py-3 px-4 text-right font-medium text-gray-800">
                            {item.quantity.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {item.priceIn.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-3 px-4 text-right text-green-600 font-medium">
                            {item.priceOut.toLocaleString('vi-VN')} đ
                          </td>
                          <td className="py-3 px-4 text-right text-gray-600">
                            {item.weight} kg
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">{item.location}</span>
                              {item.locationImage && (
                                <img src={item.locationImage} alt="Vị trí" className="w-8 h-8 object-cover rounded" />
                              )}
                            </div>
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
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className={`bg-white rounded-xl p-6 w-full shadow-2xl max-h-[90vh] overflow-y-auto ${modalType === 'export' ? 'max-w-5xl' : 'max-w-4xl'}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {modalType === 'export' ? 'Xuất Kho' : (editingProduct ? 'Sửa Sản Phẩm' : 'Nhập Kho')}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {modalType === 'export' ? (
                  <div className="space-y-4">
                    {/* Input mã hàng */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nhập mã hàng cần xuất</label>
                      <Input
                        value={exportCodeInput}
                        onChange={(e) => handleSearchExportCode(e.target.value)}
                        placeholder="Nhập mã hàng (VD: VT001)"
                        className="border-2 text-xl font-bold tracking-wider"
                        style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
                        autoFocus
                      />
                    </div>

                    {/* Nếu không tìm thấy */}
                    {exportCodeInput && !foundProduct && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                        <p className="text-red-600 font-medium">❌ Không tìm thấy sản phẩm có mã "{exportCodeInput}"</p>
                      </div>
                    )}

                    {/* Nếu tìm thấy - Hiển thị 2 cột */}
                    {foundProduct && (
                      <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
                        <p className="text-green-600 font-medium mb-4">✓ Tìm thấy sản phẩm</p>
                        
                        {/* 2 cột: TTSP và Xuất */}
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Cột 1: TTSP */}
                          <div className="bg-white rounded-lg p-4 border-2">
                            <h3 className="font-bold text-blue-600 mb-3 text-lg border-b pb-2">THÔNG TIN SẢN PHẨM</h3>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Mã hàng:</span>
                                <span className="font-mono font-bold text-blue-600">{foundProduct.code}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tên hàng:</span>
                                <span className="font-medium">{foundProduct.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Đơn vị tính:</span>
                                <span>{foundProduct.unit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Tồn kho:</span>
                                <span className="font-bold text-green-600">{foundProduct.quantity.toLocaleString()} {foundProduct.unit}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Giá nhập:</span>
                                <span>{foundProduct.priceIn.toLocaleString('vi-VN')} đ</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Giá xuất:</span>
                                <span className="font-medium">{foundProduct.priceOut.toLocaleString('vi-VN')} đ</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Trọng lượng:</span>
                                <span>{foundProduct.weight} kg</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Vị trí:</span>
                                <span>{foundProduct.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Ngày nhập:</span>
                                <span>{foundProduct.importDate}</span>
                              </div>
                            </div>
                          </div>

                          {/* Cột 2: Xuất */}
                          <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                            <h3 className="font-bold text-orange-600 mb-3 text-lg border-b pb-2">THÔNG TIN XUẤT KHO</h3>
                            
                            {/* Ảnh sản phẩm */}
                            {foundProduct.locationImage && (
                              <div className="mb-4">
                                <img 
                                  src={foundProduct.locationImage} 
                                  alt={foundProduct.name}
                                  className="w-full h-48 object-cover rounded-lg border-2"
                                />
                              </div>
                            )}

                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Số lượng xuất * (Tồn: {foundProduct.quantity} {foundProduct.unit})
                                </label>
                                <Input
                                  type="number"
                                  value={exportQuantity}
                                  onChange={(e) => setExportQuantity(Number(e.target.value))}
                                  placeholder="0"
                                  className="border-2 text-lg"
                                  max={foundProduct.quantity}
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Giá xuất (VNĐ)</label>
                                <Input
                                  type="number"
                                  value={exportPrice}
                                  onChange={(e) => setExportPrice(Number(e.target.value))}
                                  placeholder="0"
                                  className="border-2 text-lg"
                                />
                              </div>

                              {/* Tổng giá trị */}
                              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-gray-700">Tổng giá trị:</span>
                                  <span className="text-xl font-bold text-orange-600">
                                    {(exportQuantity * exportPrice).toLocaleString('vi-VN')} đ
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Button xuất */}
                        <div className="mt-4 flex gap-3">
                          <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                            Hủy
                          </Button>
                          <Button onClick={handleConfirmExport} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                            <LogOut className="w-4 h-4 mr-2" />
                            Xác Nhận Xuất Kho
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mã hàng *</label>
                      <Input
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="VD: VT001"
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên hàng *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nhập tên hàng"
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị tính *</label>
                      <Input
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        placeholder="cái, bộ, kg, m³..."
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                      <Input
                        type="number"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                        placeholder="0"
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giá nhập (VNĐ)</label>
                      <Input
                        type="number"
                        value={formData.priceIn}
                        onChange={(e) => setFormData({ ...formData, priceIn: Number(e.target.value) })}
                        placeholder="0"
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Giá xuất (VNĐ)</label>
                      <Input
                        type="number"
                        value={formData.priceOut}
                        onChange={(e) => setFormData({ ...formData, priceOut: Number(e.target.value) })}
                        placeholder="0"
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Trọng lượng (kg)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                        placeholder="0"
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vị trí</label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="VD: Kệ A1, Khu B..."
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ngày nhập kho</label>
                      <Input
                        type="date"
                        value={formData.importDate}
                        onChange={(e) => setFormData({ ...formData, importDate: e.target.value })}
                        className="border-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ảnh vị trí</label>
                      <div className="flex gap-4 items-start">
                        <div className="flex-1">
                          <label className="flex items-center gap-2 px-4 py-3 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                            <Upload className="w-5 h-5 text-gray-500" />
                            <span className="text-sm text-gray-600">Upload ảnh</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {formData.locationImage && (
                          <div className="relative">
                            <img
                              src={formData.locationImage}
                              alt="Preview"
                              className="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <button
                              onClick={() => setFormData({ ...formData, locationImage: '' })}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                        Hủy
                      </Button>
                      <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        {editingProduct ? 'Cập Nhật' : 'Nhập Kho'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
