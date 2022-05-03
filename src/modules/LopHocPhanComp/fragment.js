export const GET_LOP_HOC_PHAN = `
id
maLopHocPhan
moTa
tenLopHocPhan
soLuongToiDa
soNhomThucHanh
trangThaiLopHocPhan
hocPhan {
  id
  soTinChiLyThuyet
  soTinChiThucHanh
  monHoc {
    id
    ten
    giangViens {
      id
      hoTenDem
      ten
    }
  }
}
lichHocs {
  id
  ghiChu
  ngayHocTrongTuan
  nhomThucHanh
  thoiGianBatDau
  thoiGianKetThuc
  tietHocBatDau
  tietHocKetThuc
  phongHoc {
    id
    tenPhongHoc
    dayNha {
      id
      tenDayNha
    }
  }
  isLyThuyet
  isLichThi
  giangVien {
    id
    hoTenDem
    ten
  }
}
soLuongHienTai
lopDuKien
hocKyNormal {
  id
  thuTuHocKy
  namHoc {
    id
    namBatDau
    namKetThuc
  }
}
sinhVienLopHocPhans {
  diemThuongKy
  diemThucHanh
  diemGiuaKy
  diemCuoiKy
  diemTrungBinh
  sinhVien {
    id
    maSinhVien
    hoTenDem
    ten
  }
}
`;

export const FIND_DAY_NHA_FRAGMENT = `
id
moTa
tenDayNha
phongHocs {
  id
  tenPhongHoc
  sucChua
  moTa
}
`