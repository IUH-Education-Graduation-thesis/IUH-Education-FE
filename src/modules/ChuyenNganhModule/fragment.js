export default {};

export const FIND_CHUYEN_NGANH = `
id
moTa
ten
khoaVien {
  id
  ten
}
khoas {
  id
  khoa
  thoiGianBatDau
  thoiGianKetThuc
  lops {
    id
    ten
    moTa
  }
}
giangViens {
  id
  hoTenDem
  ten
  email
  soDienThoai
}
`;
