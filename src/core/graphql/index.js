import Login from "./login";
import GetProfile from "./getProfile";
import findDayNha from "./findDayNha";
import deleteDayNha from "./xoaDayNha";
import createDayNha from "./createDayNha";
import suaDayNha from "./suaDayNha";
import themPhongHoc from "./themPhongHoc";
import findPhongHoc from "./findPhongHoc";
import xoaPhongHoc from "./xoaPhongHoc";
import xoaNamHoc from "./xoaNamHoc";
import findNamHoc from "./findNamHoc";
import themNamHoc from "./themNamHoc";
import findKhoaHocs from "./findKhoaHocs";
import xoaKhoaHoc from "./xoaKhoaHoc";
import xoaDayNha from "./xoaDayNha";
import themKhoaHoc from "./themKhoaHoc";
import findHocPhan from "./findHocPhan";
import findKhoaVien from "./findKhoaVien";
import findSinhVien from "./findSinhVien";
import xoaSinhViens from "./xoaSinhViens";
import themSinhVien from "./themSinhVien";
import suaSinhVien from "./suaSinhVien";
import themKhoaVien from "./themKhoaVien";
import suaKhoaVien from "./suaKhoaVien";
import xoaKhoaViens from "./xoaKhoaViens";
import themChuyenNganh from "./themChuyenNganh";
import suaChuyenNganh from "./suaChuyenNganh";
import xoaChuyenNganh from "./xoaChuyenNganh";
import themMonHoc from "./themMonHoc";
import suaMonHoc from "./suaMonHoc";

const query = {
  ...GetProfile.query,
  ...findDayNha.query,
  ...findPhongHoc.query,
  ...findNamHoc.query,
  ...findKhoaHocs.query,
  ...findHocPhan.query,
  ...findKhoaVien.query,
  ...findSinhVien.query,
};

const mutation = {
  ...Login.mutation,
  ...deleteDayNha.mutation,
  ...createDayNha.mutation,
  ...suaDayNha.mutation,
  ...themPhongHoc.mutation,
  ...xoaPhongHoc.mutation,
  ...themNamHoc.mutation,
  ...xoaNamHoc.mutation,
  ...themKhoaHoc.mutation,
  ...xoaKhoaHoc.mutation,
  ...xoaSinhViens.mutation,
  ...themSinhVien.mutation,
  ...suaSinhVien.mutation,
  ...themKhoaVien.mutation,
  ...suaKhoaVien.mutation,
  ...xoaKhoaViens.mutation,
  ...themChuyenNganh.mutation,
  ...suaChuyenNganh.mutation,
  ...xoaChuyenNganh.mutation,
  ...themMonHoc.mutation,
  ...suaMonHoc.mutation,
};

export default {
  query,
  mutation,
};
