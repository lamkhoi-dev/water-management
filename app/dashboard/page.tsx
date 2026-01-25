'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Phone, Mail, MapPin, Calendar, Briefcase, Clock, Award, Users, Activity } from 'lucide-react'

// Data nhân viên fix cứng theo account đăng nhập
const EMPLOYEE_DATA: Record<string, any> = {
  'kho': {
    fullName: 'Nguyễn Văn An',
    avatar: '/avatars/employee1.jpg',
    position: 'Nhân viên kho',
    department: 'Phòng Kho vận',
    employeeId: 'NV-2021-001',
    birthday: '15/03/1990',
    gender: 'Nam',
    phone: '0901 234 567',
    email: 'nguyenvanan@biwase.vn',
    address: 'Số 45, Đường Nguyễn Huệ, TP. Tân An, Long An',
    idCard: '079090012345',
    startDate: '01/03/2021',
    contractType: 'Không xác định thời hạn',
    relatives: [
      { name: 'Nguyễn Thị Hoa', relationship: 'Vợ', phone: '0909 876 543' },
      { name: 'Nguyễn Văn Bình', relationship: 'Con trai', phone: '' },
    ],
    workHistory: [
      { period: '03/2021 - Hiện tại', position: 'Nhân viên kho', department: 'Phòng Kho vận' },
      { period: '01/2019 - 02/2021', position: 'Nhân viên kho', department: 'Công ty ABC' },
    ],
    recentActivities: [
      { date: '25/01/2026', action: 'Kiểm kê kho vật tư nhà máy', status: 'Hoàn thành' },
      { date: '24/01/2026', action: 'Nhập 50 ống PVC 50mm', status: 'Hoàn thành' },
      { date: '23/01/2026', action: 'Xuất 20 van cầu đôi', status: 'Hoàn thành' },
      { date: '22/01/2026', action: 'Báo cáo tồn kho tuần', status: 'Hoàn thành' },
      { date: '20/01/2026', action: 'Nhập bơm nước 5KW', status: 'Hoàn thành' },
    ],
  },
  'hr': {
    fullName: 'Trần Thị Bích',
    avatar: '/avatars/employee2.jpg',
    position: 'Nhân viên nhân sự',
    department: 'Phòng Nhân sự',
    employeeId: 'NV-2020-015',
    birthday: '22/07/1992',
    gender: 'Nữ',
    phone: '0912 345 678',
    email: 'tranthibich@biwase.vn',
    address: 'Số 123, Đường Hùng Vương, TP. Tân An, Long An',
    idCard: '079092067890',
    startDate: '15/06/2020',
    contractType: 'Không xác định thời hạn',
    relatives: [
      { name: 'Lê Văn Cường', relationship: 'Chồng', phone: '0918 765 432' },
      { name: 'Trần Thị Mai', relationship: 'Mẹ', phone: '0901 111 222' },
    ],
    workHistory: [
      { period: '06/2020 - Hiện tại', position: 'Nhân viên nhân sự', department: 'Phòng Nhân sự' },
      { period: '03/2018 - 05/2020', position: 'Nhân viên hành chính', department: 'Công ty XYZ' },
    ],
    recentActivities: [
      { date: '25/01/2026', action: 'Cập nhật hồ sơ nhân viên mới', status: 'Hoàn thành' },
      { date: '24/01/2026', action: 'Xử lý đơn nghỉ phép', status: 'Đang xử lý' },
      { date: '23/01/2026', action: 'Tuyển dụng vị trí kỹ thuật', status: 'Đang xử lý' },
      { date: '22/01/2026', action: 'Chấm công tháng 01', status: 'Hoàn thành' },
      { date: '20/01/2026', action: 'Báo cáo nhân sự tuần', status: 'Hoàn thành' },
    ],
  },
  'ketoan': {
    fullName: 'Lê Văn Cường',
    avatar: '/avatars/employee3.jpg',
    position: 'Kế toán',
    department: 'Phòng Kế toán',
    employeeId: 'NV-2019-008',
    birthday: '10/11/1988',
    gender: 'Nam',
    phone: '0923 456 789',
    email: 'levancuong@biwase.vn',
    address: 'Số 78, Đường Trần Hưng Đạo, TP. Tân An, Long An',
    idCard: '079088034567',
    startDate: '01/09/2019',
    contractType: 'Không xác định thời hạn',
    relatives: [
      { name: 'Nguyễn Thị Lan', relationship: 'Vợ', phone: '0919 234 567' },
      { name: 'Lê Thị Hồng', relationship: 'Mẹ', phone: '0901 333 444' },
    ],
    workHistory: [
      { period: '09/2019 - Hiện tại', position: 'Kế toán', department: 'Phòng Kế toán' },
      { period: '05/2015 - 08/2019', position: 'Kế toán viên', department: 'Công ty DEF' },
    ],
    recentActivities: [
      { date: '25/01/2026', action: 'Đối chiếu công nợ tháng 01', status: 'Hoàn thành' },
      { date: '24/01/2026', action: 'Lập báo cáo tài chính', status: 'Đang xử lý' },
      { date: '23/01/2026', action: 'Thanh toán lương nhân viên', status: 'Hoàn thành' },
      { date: '22/01/2026', action: 'Xử lý hóa đơn nhập kho', status: 'Hoàn thành' },
      { date: '20/01/2026', action: 'Kiểm tra sổ quỹ', status: 'Hoàn thành' },
    ],
  },
  'truongphong': {
    fullName: 'Phạm Thị Dung',
    avatar: '/avatars/employee4.jpg',
    position: 'Trưởng phòng',
    department: 'Phòng Kỹ thuật',
    employeeId: 'NV-2018-003',
    birthday: '05/05/1985',
    gender: 'Nữ',
    phone: '0934 567 890',
    email: 'phamthidung@biwase.vn',
    address: 'Số 200, Đường Quốc lộ 1A, TP. Tân An, Long An',
    idCard: '079085056789',
    startDate: '01/04/2018',
    contractType: 'Không xác định thời hạn',
    relatives: [
      { name: 'Trần Văn Minh', relationship: 'Chồng', phone: '0920 876 543' },
      { name: 'Phạm Văn Hùng', relationship: 'Bố', phone: '0901 555 666' },
    ],
    workHistory: [
      { period: '01/2022 - Hiện tại', position: 'Trưởng phòng', department: 'Phòng Kỹ thuật' },
      { period: '04/2018 - 12/2021', position: 'Phó phòng', department: 'Phòng Kỹ thuật' },
      { period: '06/2012 - 03/2018', position: 'Kỹ sư', department: 'Công ty GHI' },
    ],
    recentActivities: [
      { date: '25/01/2026', action: 'Họp ban giám đốc', status: 'Hoàn thành' },
      { date: '24/01/2026', action: 'Duyệt kế hoạch sản xuất Q1', status: 'Hoàn thành' },
      { date: '23/01/2026', action: 'Kiểm tra chất lượng nước', status: 'Hoàn thành' },
      { date: '22/01/2026', action: 'Phê duyệt mua vật tư', status: 'Hoàn thành' },
      { date: '20/01/2026', action: 'Đánh giá nhân viên tháng', status: 'Đang xử lý' },
    ],
  },
  'giamdoc': {
    fullName: 'Đặng Văn Em',
    avatar: '/avatars/employee5.jpg',
    position: 'Giám đốc',
    department: 'Ban Giám đốc',
    employeeId: 'NV-2015-001',
    birthday: '20/12/1975',
    gender: 'Nam',
    phone: '0945 678 901',
    email: 'dangvanem@biwase.vn',
    address: 'Số 500, Đường Nguyễn Trung Trực, TP. Tân An, Long An',
    idCard: '079075078901',
    startDate: '15/01/2015',
    contractType: 'Không xác định thời hạn',
    relatives: [
      { name: 'Nguyễn Thị Hương', relationship: 'Vợ', phone: '0930 123 456' },
      { name: 'Đặng Văn Phúc', relationship: 'Con trai', phone: '0911 222 333' },
      { name: 'Đặng Thị Mai', relationship: 'Con gái', phone: '' },
    ],
    workHistory: [
      { period: '01/2020 - Hiện tại', position: 'Giám đốc', department: 'Ban Giám đốc' },
      { period: '01/2015 - 12/2019', position: 'Phó Giám đốc', department: 'Ban Giám đốc' },
      { period: '03/2005 - 12/2014', position: 'Trưởng phòng Kỹ thuật', department: 'Công ty JKL' },
    ],
    recentActivities: [
      { date: '25/01/2026', action: 'Họp HĐQT công ty', status: 'Hoàn thành' },
      { date: '24/01/2026', action: 'Ký hợp đồng đối tác', status: 'Hoàn thành' },
      { date: '23/01/2026', action: 'Duyệt ngân sách Q1/2026', status: 'Hoàn thành' },
      { date: '22/01/2026', action: 'Tiếp đoàn kiểm tra', status: 'Hoàn thành' },
      { date: '20/01/2026', action: 'Phê duyệt kế hoạch năm', status: 'Hoàn thành' },
    ],
  },
}

// Tính số ngày làm việc
function calculateWorkingDays(startDateStr: string): number {
  const [day, month, year] = startDateStr.split('/').map(Number)
  const startDate = new Date(year, month - 1, day)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [employee, setEmployee] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      window.location.href = '/'
      return
    }
    const parsed = JSON.parse(userData)
    setUser(parsed)
    
    // Lấy thông tin nhân viên dựa trên username
    const empData = EMPLOYEE_DATA[parsed.username] || EMPLOYEE_DATA['kho']
    setEmployee(empData)
  }, [])

  if (!user || !employee) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const workingDays = calculateWorkingDays(employee.startDate)

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-8 bg-gray-50 min-h-screen">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Thông Tin Nhân Viên</h1>
            <p className="text-gray-600">
              Xem thông tin cá nhân và quá trình làm việc
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cột trái - Thông tin chính */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card thông tin cá nhân */}
              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <User className="w-5 h-5" />
                    Thông Tin Cá Nhân
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                        {employee.fullName.split(' ').pop()?.charAt(0)}
                      </div>
                      <p className="mt-3 font-semibold text-lg text-gray-800">{employee.fullName}</p>
                      <p className="text-blue-600 font-medium">{employee.position}</p>
                      <span className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {employee.employeeId}
                      </span>
                    </div>
                    
                    {/* Thông tin chi tiết */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Ngày sinh</p>
                          <p className="font-medium">{employee.birthday}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <User className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Giới tính</p>
                          <p className="font-medium">{employee.gender}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Số điện thoại</p>
                          <p className="font-medium">{employee.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="font-medium text-sm">{employee.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg md:col-span-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Địa chỉ</p>
                          <p className="font-medium text-sm">{employee.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Briefcase className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Phòng ban</p>
                          <p className="font-medium">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">Loại hợp đồng</p>
                          <p className="font-medium text-sm">{employee.contractType}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card quá trình làm việc */}
              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Briefcase className="w-5 h-5" />
                    Quá Trình Làm Việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {employee.workHistory.map((history: any, index: number) => (
                      <div key={index} className={`flex gap-4 p-4 rounded-lg ${index === 0 ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'}`}>
                        <div className={`w-3 h-3 rounded-full mt-1.5 ${index === 0 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{history.position}</p>
                          <p className="text-gray-600">{history.department}</p>
                          <p className="text-sm text-gray-500 mt-1">{history.period}</p>
                          {index === 0 && (
                            <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                              Hiện tại
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Card người thân */}
              <Card className="border-l-4 border-l-purple-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-600">
                    <Users className="w-5 h-5" />
                    Thông Tin Người Thân
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {employee.relatives.map((relative: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold">
                          {relative.name.split(' ').pop()?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{relative.name}</p>
                          <p className="text-sm text-purple-600">{relative.relationship}</p>
                          {relative.phone && (
                            <p className="text-sm text-gray-500">{relative.phone}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cột phải - Stats và hoạt động */}
            <div className="space-y-6">
              {/* Stats */}
              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-500">
                    <Clock className="w-5 h-5" />
                    Thống Kê Làm Việc
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-4xl font-bold text-orange-600">{workingDays.toLocaleString()}</p>
                    <p className="text-gray-600 mt-1">Ngày làm việc</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {Math.floor(workingDays / 365)}
                      </p>
                      <p className="text-sm text-gray-600">Năm</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {Math.floor((workingDays % 365) / 30)}
                      </p>
                      <p className="text-sm text-gray-600">Tháng</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-sm text-gray-500">Ngày bắt đầu làm việc</p>
                    <p className="font-semibold text-gray-800">{employee.startDate}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Hoạt động gần đây */}
              <Card className="border-l-4 border-l-indigo-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-600">
                    <Activity className="w-5 h-5" />
                    Hoạt Động Gần Đây
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {employee.recentActivities.map((activity: any, index: number) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            activity.status === 'Hoàn thành' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {activity.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{activity.date}</p>
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
