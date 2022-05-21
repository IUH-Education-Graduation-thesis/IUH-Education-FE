export default {};

export const FIND_HOC_PHAN_FRAGMENT = `
  id
  maHocPhan
  moTa
  monHoc {
    ten
    soTinChiLyThuyet
    soTinChiThucHanh
  }
`;

export const FIND_KHOA_VIEN_FRAGMENT = `
id
ten
monHocs {
  id
  ten
}
`;

export const FIND_NAM_HOC_FRAGMENT = `
id
ngayBatDau
ngayKetThuc
hocKys {
  id
  thuTu
}
`;
