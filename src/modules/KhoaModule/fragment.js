export const FIND_KHOA_HOC_FRAGMENT = `
id
khoa
moTa
thoiGianBatDau
thoiGianKetThuc
hocKies {
  id
  thuTu
  moTa
}
chuyenNganh {
  id
  ten
  khoaVien {
    id
    ten
  }
}
`