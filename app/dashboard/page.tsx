'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Package, Users, TrendingUp, AlertCircle } from 'lucide-react'

const dashboardData = {
  warehouseStats: {
    totalItems: 1250,
    lowStock: 45,
    recentTransactions: 128,
  },
  hrStats: {
    totalEmployees: 87,
    presentToday: 82,
    onLeave: 5,
  },
  monthlyData: [
    { month: 'Tháng 1', kho: 4000, nhân_sự: 2400 },
    { month: 'Tháng 2', kho: 3000, nhân_sự: 1398 },
    { month: 'Tháng 3', kho: 2000, nhân_sự: 9800 },
    { month: 'Tháng 4', kho: 2780, nhân_sự: 3908 },
    { month: 'Tháng 5', kho: 1890, nhân_sự: 4800 },
    { month: 'Tháng 6', kho: 2390, nhân_sự: 3800 },
  ],
  departmentDistribution: [
    { name: 'Kỹ thuật', value: 35 },
    { name: 'Hành chính', value: 25 },
    { name: 'Bán hàng', value: 20 },
    { name: 'Khác', value: 7 },
  ],
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b']

export default function DashboardPage() {
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
        <div className="p-8 bg-background min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Chào mừng, <span className="font-medium">{user.name}</span> ({user.role})
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng Vật Tư</CardTitle>
                <Package className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.warehouseStats.totalItems}</div>
                <p className="text-xs text-muted-foreground">+150 so với tháng trước</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hàng Tồn Kho Thấp</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.warehouseStats.lowStock}</div>
                <p className="text-xs text-muted-foreground">Cần tập kết</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng Nhân Viên</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.hrStats.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">{dashboardData.hrStats.presentToday} có mặt hôm nay</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Giao Dịch Hôm Nay</CardTitle>
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.warehouseStats.recentTransactions}</div>
                <p className="text-xs text-muted-foreground">Xuất/Nhập kho</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Line Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Xu Hướng Hàng Tháng</CardTitle>
                <CardDescription>Giao dịch kho và số lượng nhân sự</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dashboardData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="kho" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="nhân_sự" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Phân Bố Phòng Ban</CardTitle>
                <CardDescription>Số lượng nhân viên</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData.departmentDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dashboardData.departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Hoạt Động Gần Đây</CardTitle>
              <CardDescription>10 giao dịch gần nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 1, type: 'Nhập kho', item: 'Ống PVC 50mm', qty: 100, date: '10:30 hôm nay' },
                  { id: 2, type: 'Xuất kho', item: 'Van cầu đôi', qty: 25, date: '09:15 hôm nay' },
                  { id: 3, type: 'Kiểm kê', item: 'Bộ lọc nước', qty: 50, date: 'Hôm qua' },
                  { id: 4, type: 'Nhập kho', item: 'Thiết bị đo áp suất', qty: 15, date: 'Hôm qua' },
                  { id: 5, type: 'Xuất kho', item: 'Bơm nước', qty: 8, date: '2 ngày trước' },
                ].map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.item}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{activity.qty}</p>
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
