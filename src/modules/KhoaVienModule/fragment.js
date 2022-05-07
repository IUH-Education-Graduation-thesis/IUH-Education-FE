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
  khoaVien {
    id
  }
  giangViens {
    id
    hoTenDem
    ten
    email
    soDienThoai
  }
}
`;

export const FIND_GIANG_VIEN_FRAGMENT = `
  id
  hoTenDem
  ten
`;
