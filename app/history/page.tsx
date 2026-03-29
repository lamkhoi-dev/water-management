'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { History, Calendar } from 'lucide-react'
import { type HistoryEntry } from '@/lib/constants'

export default function HistoryPage() {
  const [user, setUser] = useState<any>(null)
  const [historyLog, setHistoryLog] = useState<HistoryEntry[]>([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) { window.location.href = '/'; return }
    setUser(JSON.parse(userData))
    const savedHistory = localStorage.getItem('historyLog')
    if (savedHistory) setHistoryLog(JSON.parse(savedHistory))
  }, [])

  const filteredHistory = historyLog.filter((entry) => {
    if (!dateFrom && !dateTo) return true
    const parts = entry.date.includes('/') ? entry.date.split('/') : entry.date.split('-')
    let entryDate: Date
    if (entry.date.includes('/')) {
      entryDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]))
    } else {
      entryDate = new Date(entry.date)
    }
    if (dateFrom && entryDate < new Date(dateFrom)) return false
    if (dateTo) { const to = new Date(dateTo); to.setHours(23, 59, 59); if (entryDate > to) return false }
    return true
  })

  const getActionColor = (action: string) => {
    switch (action) {
      case 'Nhập kho': return 'bg-green-100 text-green-700'
      case 'Xuất kho': return 'bg-orange-100 text-orange-700'
      case 'Tồn kho': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
          <div className="mb-8"><h1 className="text-3xl font-bold text-gray-800">Lịch Sử Kho</h1></div>

          {/* Date Filter */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-gray-500" /><span className="text-sm font-medium text-gray-700">Lọc theo ngày:</span></div>
                <div className="flex items-center gap-2"><label className="text-sm text-gray-600">Từ:</label><Input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="border-2 w-44" /></div>
                <div className="flex items-center gap-2"><label className="text-sm text-gray-600">Đến:</label><Input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="border-2 w-44" /></div>
                {(dateFrom || dateTo) && <Button variant="outline" size="sm" onClick={() => { setDateFrom(''); setDateTo('') }}>Xóa bộ lọc</Button>}
              </div>
            </CardContent>
          </Card>

          {/* History Table - Bảng với đầy đủ cột theo yêu cầu */}
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <History className="w-5 h-5" /> Lịch Sử Hoạt Động ({filteredHistory.length} bản ghi)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left py-3 px-3 font-semibold text-gray-700 whitespace-nowrap">Ngày/tháng/năm</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Thời gian</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700 min-w-[140px]">Họ và tên</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Kho lưu</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Mã SP</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700">Tên SP</th>
                      <th className="text-center py-3 px-3 font-semibold text-gray-700">Chức năng</th>
                      <th className="text-left py-3 px-3 font-semibold text-gray-700 min-w-[200px]">Thông tin chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHistory.length === 0 ? (
                      <tr><td colSpan={8} className="text-center py-12 text-gray-500"><History className="w-16 h-16 mx-auto mb-2 text-gray-300" /><p>Chưa có lịch sử hoạt động</p></td></tr>
                    ) : (
                      [...filteredHistory].reverse().map((entry, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-3 text-gray-700 whitespace-nowrap">{entry.date}</td>
                          <td className="py-3 px-3 text-gray-600">{entry.time}</td>
                          <td className="py-3 px-3 text-gray-700 font-medium">{entry.userName}</td>
                          <td className="py-3 px-3 text-gray-700">{entry.warehouse}</td>
                          <td className="py-3 px-3"><span className="font-mono font-medium text-blue-600">{entry.productCode}</span></td>
                          <td className="py-3 px-3 font-medium text-gray-800">{entry.productName}</td>
                          <td className="py-3 px-3 text-center">
                            <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getActionColor(entry.action)}`}>{entry.action}</span>
                          </td>
                          <td className="py-3 px-3 text-gray-600 text-sm">
                            {entry.details || `${entry.action} ${entry.quantity} sản phẩm`}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
