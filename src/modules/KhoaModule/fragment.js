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
  hocPhans {
    id
    maHocPhan
    moTa
    batBuoc
    monHoc {
      id
      ten
    }
    soTinChiLyThuyet
    soTinChiThucHanh
  }
}
chuyenNganh {
  id
  ten
  khoaVien {
    id
    ten
  }
}
`;

export const FIND_KHOA_VIEN_FRAGMENT = `
id
        ten
        monHocs {
          id
          ten
          hocPhans {
            id
            maHocPhan
            batBuoc
            soTinChiLyThuyet
            soTinChiThucHanh
            monHoc {
              id
              ten
            }
          }
        }
`;
