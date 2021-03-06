export const GET_SINHVIENS_FRAGMENT = `
sinhVienId
maSinhVien
maHoSo
hoTenDem
ten
gioiTinh
ngaySinh
bacDaoTao
trangThai
loaiHinhDaoTao
ngayVaoTruong
ngayVaoDoan
soDienThoai
diaChi
noiSinh
hoKhauThuongTru
danToc
ngayVaoDang
email
tonGiao
`;

export const FIND_SINH_VIEN_FRAGMENT = `
id
maSinhVien
maHoSo
hoTenDem
ten
avatar
gioiTinh
ngayVaoDang
ngayVaoTruong
ngayVaoDoan
ngaySinh
soDienThoai
diaChi
noiSinh
email
soCMND
bacDaoTao
bacDaoTaoString
trangThai
trangThaiString
danToc
danTocString
loaiHinhDaoTao
loaiHinhDaoTaoString
lop {
  id
  ten
}
`;

export const THEM_SINH_VIEN_FRAGMENT = `
id
maSinhVien
hoTenDem
ten
gioiTinh
bacDaoTaoString
soDienThoai
email
`;

export const FIND_KHOA_VIEN = `
id
ten
chuyenNganhs {
  id
  ten
  khoas {
    id
    khoa
    lops {
      id
      ten
    }
  }
}
`;
