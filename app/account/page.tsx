'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserCog, Plus, Edit2, Trash2, Search, X, Save, Shield, Check, AlertCircle } from 'lucide-react'

// Danh sách chức năng mới
const CHUC_NANG_LIST = [
  { id: 'xem-co-ban', name: 'Xem thông tin cơ bản', description: 'Xem tất cả thông tin, không thao tác' },
  { id: 'nhap-kho', name: 'Nhập kho', description: 'Có thể nhập kho' },
  { id: 'xuat-kho', name: 'Xuất kho', description: 'Có thể xuất kho' },
  { id: 'ton-kho', name: 'Tồn kho', description: 'Có thể chỉnh sửa tồn kho' },
  { id: 'them-tai-khoan', name: 'Thêm tài khoản', description: 'Có thể thêm/sửa tài khoản' },
]

interface Account {
  id: number
  username: string
  password: string
  name: string
  chucVu: string
  chucNang: string
  status: 'active' | 'inactive'
  createdAt: string
}

const DEFAULT_ACCOUNTS: Account[] = [
  { id: 1, username: 'kho', password: 'password123', name: 'Nguyễn Văn A', chucVu: 'Nhân viên kho', chucNang: 'nhap-kho', status: 'active', createdAt: '2024-01-15' },
  { id: 2, username: 'hr', password: 'password123', name: 'Trần Thị B', chucVu: 'Nhân viên nhân sự', chucNang: 'xem-co-ban', status: 'active', createdAt: '2024-01-15' },
  { id: 3, username: 'ketoan', password: 'password123', name: 'Lê Văn C', chucVu: 'Kế toán', chucNang: 'ton-kho', status: 'active', createdAt: '2024-01-15' },
  { id: 4, username: 'truongphong', password: 'password123', name: 'Phạm Thị D', chucVu: 'Trưởng phòng', chucNang: 'xuat-kho', status: 'active', createdAt: '2024-01-15' },
  { id: 5, username: 'giamdoc', password: 'password123', name: 'Đặng Văn E', chucVu: 'Giám đốc', chucNang: 'them-tai-khoan', status: 'active', createdAt: '2024-01-15' },
]

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    chucVu: '',
    chucNang: 'xem-co-ban',
    status: 'active' as 'active' | 'inactive',
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)

    // Load accounts từ localStorage
    const savedAccounts = localStorage.getItem('accounts')
    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts))
    }
  }, [])

  // Lưu accounts vào localStorage
  useEffect(() => {
    localStorage.setItem('accounts', JSON.stringify(accounts))
  }, [accounts])

  // Tìm kiếm theo Họ và tên
  const filteredAccounts = accounts.filter(
    (acc) => acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingAccount(null)
    setFormData({ username: '', password: '', name: '', chucVu: '', chucNang: 'xem-co-ban', status: 'active' })
    setIsModalOpen(true)
  }

  const handleEdit = (account: Account) => {
    setEditingAccount(account)
    setFormData({
      username: account.username,
      password: account.password,
      name: account.name,
      chucVu: account.chucVu,
      chucNang: account.chucNang,
      status: account.status,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (accountId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
      setAccounts(prev => prev.filter(a => a.id !== accountId))
    }
  }

  const handleSave = () => {
    if (!formData.username || !formData.password || !formData.name) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }

    if (editingAccount) {
      setAccounts(prev => prev.map(a =>
        a.id === editingAccount.id
          ? { ...a, ...formData }
          : a
      ))
    } else {
      // Check username unique
      if (accounts.some(a => a.username === formData.username)) {
        alert('Tên đăng nhập đã tồn tại!')
        return
      }
      const newId = Math.max(...accounts.map(a => a.id), 0) + 1
      const newAccount: Account = {
        id: newId,
        ...formData,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setAccounts(prev => [...prev, newAccount])
    }
    setIsModalOpen(false)
  }

  const getChucNangName = (id: string) => {
    return CHUC_NANG_LIST.find(c => c.id === id)?.name || id
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
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản Lý Tài Khoản</h1>
            <p className="text-gray-600">Quản lý tài khoản người dùng, phân quyền chức năng hệ thống</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tổng tài khoản</p>
                    <p className="text-2xl font-bold text-gray-800">{accounts.length}</p>
                  </div>
                  <UserCog className="w-10 h-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Đang hoạt động</p>
                    <p className="text-2xl font-bold text-green-600">{accounts.filter(a => a.status === 'active').length}</p>
                  </div>
                  <Check className="w-10 h-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tạm khóa</p>
                    <p className="text-2xl font-bold text-red-600">{accounts.filter(a => a.status === 'inactive').length}</p>
                  </div>
                  <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Số chức năng</p>
                    <p className="text-2xl font-bold text-purple-600">{CHUC_NANG_LIST.length}</p>
                  </div>
                  <Shield className="w-10 h-10 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Table */}
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <UserCog className="w-5 h-5" />
                  Danh Sách Tài Khoản
                </CardTitle>
                <Button onClick={handleAdd} className="bg-blue-600 text-white hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Tài Khoản
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo họ và tên..."
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Họ và tên</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên đăng nhập</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Chức vụ</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Chức năng</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ngày</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Trạng thái</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          Không có tài khoản nào
                        </td>
                      </tr>
                    ) : (
                      filteredAccounts.map((account) => (
                        <tr key={account.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{account.name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium text-blue-600">{account.username}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {account.chucVu}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                              {getChucNangName(account.chucNang)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{account.createdAt}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              account.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {account.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit(account)}
                                className="h-8 w-8 p-0 hover:bg-blue-100 text-blue-600"
                                title="Sửa"
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete(account.id)}
                                className="h-8 w-8 p-0 hover:bg-red-100 text-red-600"
                                title="Xóa"
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

          {/* Danh sách chức năng */}
          <Card className="mt-6 border-l-4 border-l-purple-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Shield className="w-5 h-5" />
                Danh Sách Chức Năng
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CHUC_NANG_LIST.map((cn) => (
                  <div key={cn.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{cn.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{cn.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modal Add/Edit Account */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {editingAccount ? 'Sửa Tài Khoản' : 'Thêm Tài Khoản'}
                  </h2>
                  <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập *</label>
                    <Input
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      placeholder="username"
                      className="border-2"
                      disabled={!!editingAccount}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu *</label>
                    <Input
                      type={editingAccount ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={editingAccount ? '' : '••••••••'}
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chức vụ</label>
                    <Input
                      value={formData.chucVu}
                      onChange={(e) => setFormData({ ...formData, chucVu: e.target.value })}
                      placeholder="Nhập chức vụ (VD: Nhân viên kho, Kế toán...)"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chức năng</label>
                    <select
                      value={formData.chucNang}
                      onChange={(e) => setFormData({ ...formData, chucNang: e.target.value })}
                      className="w-full p-2 border-2 rounded-lg"
                    >
                      {CHUC_NANG_LIST.map((cn) => (
                        <option key={cn.id} value={cn.id}>{cn.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                      className="w-full p-2 border-2 rounded-lg"
                    >
                      <option value="active">Hoạt động</option>
                      <option value="inactive">Tạm khóa</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1">
                    Hủy
                  </Button>
                  <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingAccount ? 'Cập Nhật' : 'Tạo Mới'}
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
