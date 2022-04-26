export const FIND_KHOA_KHOA_VIEN = `
id
ten
moTa
link
chuyenNganhs {
  id
  moTa
  ten
}
monHocs {
  id
  moTa
  ten
  giangViens {
    id
    hoTenDem
    ten
    email
    soDienThoai
  }
}
`;
