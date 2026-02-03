'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserCog, Plus, Edit2, Trash2, Search, X, Save, Shield, Eye, Pencil, Check, AlertCircle } from 'lucide-react'

// Các role mặc định
const ROLES = [
  { id: 'giamdoc', name: 'Giám đốc', description: 'Toàn quyền hệ thống' },
  { id: 'truongphong', name: 'Trưởng phòng', description: 'Quản lý phòng ban' },
  { id: 'ketoan', name: 'Kế toán', description: 'Xem và sửa số liệu tài chính' },
  { id: 'hr', name: 'Nhân viên nhân sự', description: 'Quản lý nhân sự' },
  { id: 'kho', name: 'Nhân viên kho', description: 'Quản lý kho hàng' },
]

// Các quyền truy cập
const PERMISSIONS = [
  { id: 'dashboard', name: 'Thông Tin Nhân Viên', icon: '👤' },
  { id: 'warehouse', name: 'Quản Lý Kho', icon: '📦' },
  { id: 'inventory', name: 'Tồn Kho', icon: '🗃️' },
  { id: 'history', name: 'Lịch Sử Kho', icon: '📜' },
  { id: 'hr', name: 'Quản Lý Nhân Sự', icon: '👥' },
  { id: 'account', name: 'Tài Khoản', icon: '⚙️' },
]

// Quyền mặc định theo role
const DEFAULT_ROLE_PERMISSIONS: Record<string, Record<string, { view: boolean; edit: boolean }>> = {
  giamdoc: {
    dashboard: { view: true, edit: true },
    warehouse: { view: true, edit: true },
    inventory: { view: true, edit: true },
    history: { view: true, edit: true },
    hr: { view: true, edit: true },
    account: { view: true, edit: true },
  },
  truongphong: {
    dashboard: { view: true, edit: true },
    warehouse: { view: true, edit: true },
    inventory: { view: true, edit: false },
    history: { view: true, edit: false },
    hr: { view: true, edit: true },
    account: { view: true, edit: false },
  },
  ketoan: {
    dashboard: { view: true, edit: false },
    warehouse: { view: true, edit: false },
    inventory: { view: true, edit: true },
    history: { view: true, edit: true },
    hr: { view: false, edit: false },
    account: { view: false, edit: false },
  },
  hr: {
    dashboard: { view: true, edit: false },
    warehouse: { view: false, edit: false },
    inventory: { view: false, edit: false },
    history: { view: false, edit: false },
    hr: { view: true, edit: true },
    account: { view: false, edit: false },
  },
  kho: {
    dashboard: { view: true, edit: false },
    warehouse: { view: true, edit: true },
    inventory: { view: true, edit: false },
    history: { view: true, edit: false },
    hr: { view: false, edit: false },
    account: { view: false, edit: false },
  },
}

interface Account {
  id: number
  username: string
  password: string
  name: string
  role: string
  permissions: Record<string, { view: boolean; edit: boolean }>
  status: 'active' | 'inactive'
  createdAt: string
}

const DEFAULT_ACCOUNTS: Account[] = [
  { id: 1, username: 'kho', password: 'password123', name: 'Nguyễn Văn A', role: 'kho', permissions: DEFAULT_ROLE_PERMISSIONS.kho, status: 'active', createdAt: '2024-01-15' },
  { id: 2, username: 'hr', password: 'password123', name: 'Trần Thị B', role: 'hr', permissions: DEFAULT_ROLE_PERMISSIONS.hr, status: 'active', createdAt: '2024-01-15' },
  { id: 3, username: 'ketoan', password: 'password123', name: 'Lê Văn C', role: 'ketoan', permissions: DEFAULT_ROLE_PERMISSIONS.ketoan, status: 'active', createdAt: '2024-01-15' },
  { id: 4, username: 'truongphong', password: 'password123', name: 'Phạm Thị D', role: 'truongphong', permissions: DEFAULT_ROLE_PERMISSIONS.truongphong, status: 'active', createdAt: '2024-01-15' },
  { id: 5, username: 'giamdoc', password: 'password123', name: 'Đặng Văn E', role: 'giamdoc', permissions: DEFAULT_ROLE_PERMISSIONS.giamdoc, status: 'active', createdAt: '2024-01-15' },
]

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [accounts, setAccounts] = useState<Account[]>(DEFAULT_ACCOUNTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    role: 'kho',
    status: 'active' as 'active' | 'inactive',
  })
  const [tempPermissions, setTempPermissions] = useState<Record<string, { view: boolean; edit: boolean }>>({})

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

  const filteredAccounts = accounts.filter(
    (acc) =>
      acc.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = () => {
    setEditingAccount(null)
    setFormData({ username: '', password: '', name: '', role: 'kho', status: 'active' })
    setIsModalOpen(true)
  }

  const handleEdit = (account: Account) => {
    setEditingAccount(account)
    setFormData({
      username: account.username,
      password: account.password,
      name: account.name,
      role: account.role,
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
        permissions: DEFAULT_ROLE_PERMISSIONS[formData.role] || DEFAULT_ROLE_PERMISSIONS.kho,
        createdAt: new Date().toISOString().split('T')[0],
      }
      setAccounts(prev => [...prev, newAccount])
    }
    setIsModalOpen(false)
  }

  const handleOpenPermissions = (account: Account) => {
    setSelectedAccount(account)
    setTempPermissions({ ...account.permissions })
    setIsPermissionModalOpen(true)
  }

  const handleSavePermissions = () => {
    if (selectedAccount) {
      setAccounts(prev => prev.map(a =>
        a.id === selectedAccount.id
          ? { ...a, permissions: tempPermissions }
          : a
      ))
    }
    setIsPermissionModalOpen(false)
  }

  const togglePermission = (permId: string, type: 'view' | 'edit') => {
    setTempPermissions(prev => ({
      ...prev,
      [permId]: {
        ...prev[permId],
        [type]: !prev[permId]?.[type],
        // Nếu bỏ view thì cũng bỏ edit
        ...(type === 'view' && prev[permId]?.[type] ? { edit: false } : {}),
        // Nếu bật edit thì cũng bật view
        ...(type === 'edit' && !prev[permId]?.[type] ? { view: true } : {}),
      }
    }))
  }

  const getRoleName = (roleId: string) => {
    return ROLES.find(r => r.id === roleId)?.name || roleId
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
            <p className="text-gray-600">Quản lý tài khoản người dùng, phân quyền truy cập hệ thống</p>
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
                    <p className="text-sm text-gray-500">Số role</p>
                    <p className="text-2xl font-bold text-purple-600">{ROLES.length}</p>
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
                  placeholder="Tìm kiếm theo tên đăng nhập hoặc họ tên..."
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
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Tên đăng nhập</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Họ tên</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Vai trò</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Trạng thái</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Ngày tạo</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-gray-500">
                          Không có tài khoản nào
                        </td>
                      </tr>
                    ) : (
                      filteredAccounts.map((account) => (
                        <tr key={account.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <span className="font-mono font-medium text-blue-600">{account.username}</span>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-gray-800">{account.name}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                              {getRoleName(account.role)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              account.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {account.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{account.createdAt}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleOpenPermissions(account)}
                                className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600"
                                title="Phân quyền"
                              >
                                <Shield className="h-4 w-4" />
                              </Button>
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

          {/* Role Reference */}
          <Card className="mt-6 border-l-4 border-l-purple-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Shield className="w-5 h-5" />
                Danh Sách Vai Trò
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROLES.map((role) => (
                  <div key={role.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="font-semibold text-gray-800">{role.name}</p>
                    <p className="text-sm text-gray-500 mt-1">{role.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modal Add/Edit Account */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
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
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="border-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full p-2 border-2 rounded-lg"
                    >
                      {ROLES.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
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

          {/* Modal Permissions */}
          {isPermissionModalOpen && selectedAccount && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Phân Quyền Truy Cập</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Tài khoản: <span className="font-medium text-blue-600">{selectedAccount.username}</span> - {selectedAccount.name}
                    </p>
                  </div>
                  <button onClick={() => setIsPermissionModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-4 p-3 bg-gray-100 rounded-lg font-semibold text-sm text-gray-700">
                    <div>Chức năng</div>
                    <div className="text-center flex items-center justify-center gap-1">
                      <Eye className="w-4 h-4" /> Xem
                    </div>
                    <div className="text-center flex items-center justify-center gap-1">
                      <Pencil className="w-4 h-4" /> Sửa
                    </div>
                  </div>
                  
                  {PERMISSIONS.map((perm) => (
                    <div key={perm.id} className="grid grid-cols-3 gap-4 p-3 border-b items-center">
                      <div className="flex items-center gap-2">
                        <span>{perm.icon}</span>
                        <span className="text-gray-700">{perm.name}</span>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => togglePermission(perm.id, 'view')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            tempPermissions[perm.id]?.view 
                              ? 'bg-green-500 text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-center">
                        <button
                          onClick={() => togglePermission(perm.id, 'edit')}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            tempPermissions[perm.id]?.edit 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-700">
                    <strong>Lưu ý:</strong> Quyền "Sửa" bao gồm cả quyền "Xem". Khi bật quyền sửa, quyền xem sẽ tự động được bật.
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button variant="outline" onClick={() => setIsPermissionModalOpen(false)} className="flex-1">
                    Hủy
                  </Button>
                  <Button onClick={handleSavePermissions} className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Lưu Phân Quyền
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
