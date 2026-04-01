// ==========================================
// CONSTANTS - Hằng số dùng chung toàn hệ thống
// ==========================================
// File này chứa các giá trị cố định được sử dụng
// xuyên suốt ứng dụng: danh sách tài khoản mặc định,
// danh sách chức năng (quyền), và các helper functions.
// ==========================================

// ------------------------------------------
// DANH SÁCH CHỨC NĂNG (QUYỀN) TRONG HỆ THỐNG
// Mỗi tài khoản có thể có 1 hoặc nhiều chức năng
// ------------------------------------------
export const CHUC_NANG_LIST = [
  { id: 'xem-co-ban', name: 'Xem thông tin cơ bản', description: 'Xem tất cả thông tin, không thao tác' },
  { id: 'nhap-kho', name: 'Nhập kho', description: 'Có thể nhập hàng vào kho' },
  { id: 'xuat-kho', name: 'Xuất kho', description: 'Có thể xuất hàng ra khỏi kho' },
  { id: 'ton-kho', name: 'Tồn kho', description: 'Có thể chỉnh sửa thông tin sản phẩm tồn kho' },
  { id: 'them-tai-khoan', name: 'Thêm tài khoản', description: 'Có thể thêm/sửa/xóa tài khoản' },
  { id: 'quan-ly-nhan-su', name: 'Quản lý nhân sự', description: 'Có thể thêm/sửa thông tin nhân viên' },
]

// ------------------------------------------
// INTERFACE TÀI KHOẢN
// ------------------------------------------
export interface Account {
  id: number
  username: string
  password: string
  name: string
  chucVu: string
  chucNang: string[]    // Mảng các quyền (cho phép multi-select checkbox)
  status: 'active' | 'inactive'
  createdAt: string
  isAdmin?: boolean     // Đánh dấu tài khoản admin (không thể xóa)
}

// ------------------------------------------
// INTERFACE SẢN PHẨM TRONG KHO
// ------------------------------------------
export interface Product {
  id: number
  code: string
  name: string
  unit: string
  quantity: number
  priceIn: number
  priceOut: number
  weight: number
  location: string
  locationImage: string   // Ảnh vị trí lưu kho (base64)
  productImage: string    // Ảnh sản phẩm (base64)
  importDate: string
}

// ------------------------------------------
// INTERFACE LỊCH SỬ KHO
// ------------------------------------------
export interface HistoryEntry {
  date: string
  time: string
  warehouse: string
  productCode: string
  productName: string
  userName: string
  action: string            // 'Nhập kho' | 'Xuất kho' | 'Tồn kho'
  quantity: number
  details: string           // Chi tiết thao tác (VD: "Trọng lượng: 2.5kg → 3.0kg")
}

// ------------------------------------------
// TÀI KHOẢN MẶC ĐỊNH KHI KHỞI TẠO HỆ THỐNG
// Tài khoản admin có tất cả quyền và KHÔNG THỂ bị xóa
// ------------------------------------------
export const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: 0,
    username: 'admin',
    password: 'admin123',
    name: 'Quản Trị Viên',
    chucVu: 'Quản trị hệ thống',
    chucNang: ['xem-co-ban', 'nhap-kho', 'xuat-kho', 'ton-kho', 'them-tai-khoan', 'quan-ly-nhan-su'],
    status: 'active',
    createdAt: '2024-01-01',
    isAdmin: true,
  },
  {
    id: 1,
    username: 'kho',
    password: 'password123',
    name: 'Nguyễn Văn A',
    chucVu: 'Nhân viên kho',
    chucNang: ['xem-co-ban', 'nhap-kho'],
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    username: 'hr',
    password: 'password123',
    name: 'Trần Thị B',
    chucVu: 'Nhân viên nhân sự',
    chucNang: ['xem-co-ban', 'quan-ly-nhan-su'],
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 3,
    username: 'ketoan',
    password: 'password123',
    name: 'Lê Văn C',
    chucVu: 'Kế toán',
    chucNang: ['xem-co-ban', 'ton-kho'],
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 4,
    username: 'truongphong',
    password: 'password123',
    name: 'Phạm Thị D',
    chucVu: 'Trưởng phòng',
    chucNang: ['xem-co-ban', 'xuat-kho'],
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: 5,
    username: 'giamdoc',
    password: 'password123',
    name: 'Đặng Văn E',
    chucVu: 'Giám đốc',
    chucNang: ['xem-co-ban', 'nhap-kho', 'xuat-kho', 'ton-kho', 'them-tai-khoan', 'quan-ly-nhan-su'],
    status: 'active',
    createdAt: '2024-01-15',
  },
]

// ------------------------------------------
// HELPER: Lấy danh sách tài khoản từ localStorage
// Nếu chưa có, tự động khởi tạo với danh sách mặc định
// Hỗ trợ migration từ chucNang string → string[]
// ------------------------------------------
export function getAccounts(): Account[] {
  if (typeof window === 'undefined') return DEFAULT_ACCOUNTS
  const saved = localStorage.getItem('accounts')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      // Migration: nếu chucNang là string (dữ liệu cũ), chuyển sang array
      return parsed.map((acc: any) => ({
        ...acc,
        chucNang: Array.isArray(acc.chucNang) ? acc.chucNang : [acc.chucNang || 'xem-co-ban'],
      }))
    } catch {
      return DEFAULT_ACCOUNTS
    }
  }
  // Lần đầu khởi tạo: lưu danh sách mặc định vào localStorage
  localStorage.setItem('accounts', JSON.stringify(DEFAULT_ACCOUNTS))
  return DEFAULT_ACCOUNTS
}

// ------------------------------------------
// HELPER: Kiểm tra user có quyền cụ thể không
// ------------------------------------------
export function hasPermission(username: string, permission: string): boolean {
  const accounts = getAccounts()
  const account = accounts.find(a => a.username === username)
  if (!account) return false
  return account.chucNang.includes(permission)
}

// ------------------------------------------
// HELPER: Lấy tên chức năng từ ID
// ------------------------------------------
export function getChucNangName(id: string): string {
  return CHUC_NANG_LIST.find(c => c.id === id)?.name || id
}
