export const FIND_HOC_PHAN = `
id
maHocPhan
moTa
batBuoc
monHoc {
  id
  ten
}
monHocTienQuyets {
  id
  ten
  moTa
}
monHocSongHanhs {
  id
  ten
  moTa
}
monHocTruocs {
  id
  moTa
  ten
}
soTinChiLyThuyet
soTinChiThucHanh
`;

export const GET_NAM_HOC_FRAGMENT = `
id
namBatDau
namKetThuc
ghiChu
hocKyNormals {
  id
  thuTuHocKy
  ghiChu

}
`;
