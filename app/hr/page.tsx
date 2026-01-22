'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Plus, Edit2, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const MOCK_EMPLOYEES = [
  { id: 1, name: 'Nguyễn Văn A', position: 'Nhân viên kho', department: 'Kho', status: 'present', joinDate: '2022-01-15' },
  { id: 2, name: 'Trần Thị B', position: 'Nhân viên nhân sự', department: 'Hành chính', status: 'present', joinDate: '2021-06-10' },
  { id: 3, name: 'Lê Văn C', position: 'Kế toán', department: 'Tài chính', status: 'leave', joinDate: '2020-03-20' },
  { id: 4, name: 'Phạm Thị D', position: 'Trưởng phòng', department: 'Kỹ thuật', status: 'present', joinDate: '2019-12-01' },
  { id: 5, name: 'Đặng Văn E', position: 'Giám đốc', department: 'Lãnh đạo', status: 'present', joinDate: '2018-01-10' },
  { id: 6, name: 'Hoàng Thị F', position: 'Nhân viên bán hàng', department: 'Kinh doanh', status: 'absent', joinDate: '2023-02-14' },
  { id: 7, name: 'Võ Văn G', position: 'Kỹ sư', department: 'Kỹ thuật', status: 'present', joinDate: '2021-09-05' },
  { id: 8, name: 'Bùi Thị H', position: 'Tư vấn khách hàng', department: 'Kinh doanh', status: 'present', joinDate: '2022-05-18' },
]

const MOCK_ATTENDANCE = [
  { id: 1, date: '2024-01-15', present: 82, absent: 3, leave: 2 },
  { id: 2, date: '2024-01-14', present: 85, absent: 1, leave: 1 },
  { id: 3, date: '2024-01-13', present: 80, absent: 4, leave: 3 },
  { id: 4, date: '2024-01-12', present: 84, absent: 2, leave: 1 },
]

const MOCK_EVALUATION = [
  { id: 1, employeeName: 'Nguyễn Văn A', score: 8.5, period: 'Q4 2023', status: 'Hoàn thành' },
  { id: 2, employeeName: 'Trần Thị B', score: 9.2, period: 'Q4 2023', status: 'Hoàn thành' },
  { id: 3, employeeName: 'Lê Văn C', score: 7.8, period: 'Q4 2023', status: 'Chờ xét duyệt' },
  { id: 4, employeeName: 'Phạm Thị D', score: 9.5, period: 'Q4 2023', status: 'Hoàn thành' },
]

export default function HRPage() {
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tab, setTab] = useState('employees')
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)
  }, [])

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statsData = {
    totalEmployees: employees.length,
    presentToday: employees.filter((e) => e.status === 'present').length,
    onLeave: employees.filter((e) => e.status === 'leave').length,
    absent: employees.filter((e) => e.status === 'absent').length,
  }

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Quản Lý Nhân Sự</h1>
            <p className="text-muted-foreground">Quản lý nhân viên, chấm công, và đánh giá năng lực</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng Nhân Viên</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">Người</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Có Mặt Hôm Nay</CardTitle>
                <CheckCircle className="h-4 w-4 text-emerald-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.presentToday}</div>
                <p className="text-xs text-muted-foreground">Người</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đang Nghỉ</CardTitle>
                <Clock className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.onLeave}</div>
                <p className="text-xs text-muted-foreground">Người</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vắng Mặt</CardTitle>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{statsData.absent}</div>
                <p className="text-xs text-muted-foreground">Người</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setTab('employees')}
              className={`px-4 py-2 font-medium ${tab === 'employees' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-muted-foreground'}`}
            >
              Danh Sách Nhân Viên
            </button>
            <button
              onClick={() => setTab('attendance')}
              className={`px-4 py-2 font-medium ${tab === 'attendance' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-muted-foreground'}`}
            >
              Chấm Công
            </button>
            <button
              onClick={() => setTab('evaluation')}
              className={`px-4 py-2 font-medium ${tab === 'evaluation' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-muted-foreground'}`}
            >
              Đánh Giá
            </button>
          </div>

          {/* Content */}
          {tab === 'employees' && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Danh Sách Nhân Viên</CardTitle>
                    <CardDescription>Quản lý thông tin nhân viên</CardDescription>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Thêm Nhân Viên
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input
                    placeholder="Tìm kiếm nhân viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-slate-300"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-medium text-foreground">Tên</th>
                        <th className="text-left py-2 px-2 font-medium text-foreground">Chức Vụ</th>
                        <th className="text-left py-2 px-2 font-medium text-foreground">Phòng Ban</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Trạng Thái</th>
                        <th className="text-left py-2 px-2 font-medium text-foreground">Ngày Vào</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((emp) => (
                        <tr key={emp.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2 font-medium text-foreground">{emp.name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{emp.position}</td>
                          <td className="py-3 px-2 text-muted-foreground">{emp.department}</td>
                          <td className="py-3 px-2 text-center">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded ${
                                emp.status === 'present'
                                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                  : emp.status === 'leave'
                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                              }`}
                            >
                              {emp.status === 'present' ? 'Có mặt' : emp.status === 'leave' ? 'Nghỉ' : 'Vắng'}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground text-sm">{emp.joinDate}</td>
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'attendance' && (
            <Card>
              <CardHeader>
                <CardTitle>Chấm Công</CardTitle>
                <CardDescription>Theo dõi và quản lý chấm công</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Attendance Chart */}
                  <div>
                    <h3 className="font-medium text-foreground mb-4">Thống Kê Hàng Ngày</h3>
                    <div className="space-y-3">
                      {MOCK_ATTENDANCE.map((record) => (
                        <div key={record.id} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-foreground">{record.date}</p>
                            <span className="text-sm text-muted-foreground">
                              Tổng: {record.present + record.absent + record.leave}
                            </span>
                          </div>
                          <div className="flex gap-2 text-sm">
                            <div className="flex-1 p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded">
                              <p className="text-xs text-muted-foreground">Có mặt</p>
                              <p className="font-bold text-emerald-600 dark:text-emerald-400">{record.present}</p>
                            </div>
                            <div className="flex-1 p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                              <p className="text-xs text-muted-foreground">Nghỉ</p>
                              <p className="font-bold text-orange-600 dark:text-orange-400">{record.leave}</p>
                            </div>
                            <div className="flex-1 p-2 bg-red-50 dark:bg-red-900/20 rounded">
                              <p className="text-xs text-muted-foreground">Vắng</p>
                              <p className="font-bold text-red-600 dark:text-red-400">{record.absent}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Attendance Rate */}
                  <div>
                    <h3 className="font-medium text-foreground mb-4">Tỷ Lệ Chấm Công</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-muted-foreground mb-1">Tỷ Lệ Có Mặt</p>
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">94.25%</p>
                        <p className="text-xs text-muted-foreground mt-1">Cao hơn 2% so với tháng trước</p>
                      </div>
                      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                        <p className="text-sm text-muted-foreground mb-1">Trung Bình Hôm Nay</p>
                        <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">82</p>
                        <p className="text-xs text-muted-foreground mt-1">Người có mặt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {tab === 'evaluation' && (
            <Card>
              <CardHeader>
                <CardTitle>Đánh Giá Năng Lực</CardTitle>
                <CardDescription>Quản lý đánh giá hiệu suất nhân viên</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-2 font-medium text-foreground">Nhân Viên</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Điểm</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Kỳ Đánh Giá</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Trạng Thái</th>
                        <th className="text-center py-2 px-2 font-medium text-foreground">Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_EVALUATION.map((evalItem) => (
                        <tr key={evalItem.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-2 font-medium text-foreground">{evalItem.employeeName}</td>
                          <td className="py-3 px-2 text-center">
                            <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                              <span className="font-bold text-blue-700 dark:text-blue-300">{evalItem.score}/10</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-muted-foreground">{evalItem.period}</td>
                          <td className="py-3 px-2 text-center">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded ${
                                evalItem.status === 'Hoàn thành'
                                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                                  : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                              }`}
                            >
                              {evalItem.status}
                            </span>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
