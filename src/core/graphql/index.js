import Login from './login';
import GetProfile from './getProfile';
import findDayNha from './findDayNha';
import deleteDayNha from './xoaDayNha';
import createDayNha from './createDayNha';
import suaDayNha from './suaDayNha';
import themPhongHoc from './themPhongHoc';
import findPhongHoc from './findPhongHoc';
import xoaPhongHoc from './xoaPhongHoc';
import xoaNamHocs from './xoaNamHoc';
import findNamHoc from './filterNamHoc';
import themNamHoc from './themNamHoc';
import findKhoaHocs from './findKhoaHocs';
import xoaKhoaHoc from './xoaKhoaHoc';
import themKhoaHoc from './themKhoaHoc';
import findHocPhan from './findHocPhan';
import findKhoaVien from './findKhoaVien';
import findSinhVien from './findSinhVien';
import xoaSinhViens from './xoaSinhViens';
import themSinhVien from './themSinhVien';
import suaSinhVien from './suaSinhVien';
import themKhoaVien from './themKhoaVien';
import suaKhoaVien from './suaKhoaVien';
import xoaKhoaViens from './xoaKhoaViens';
import themChuyenNganh from './themChuyenNganh';
import suaChuyenNganh from './suaChuyenNganh';
import xoaChuyenNganh from './xoaChuyenNganh';
import themMonHoc from './themMonHoc';
import suaMonHoc from './suaMonHoc';
import xoaMonHocs from './xoaMonHoc';
import findChuyenNganh from './findChuyenNganh';
import themGiangVIen from './themGiangVIen';
import suaGiangVien from './suaGiangVien';
import xoaGiangViens from './xoaGiangViens';
import suaKhoaHoc from './suaKhoaHoc';
import themLop from './themLop';
import suaLop from './suaLop';
import xoaLops from './xoaLops';
import themHocKy from './themHocKy';
import suaHocKy from './suaHocKy';
import xoaHocKys from './xoaHocKys';
import themHocPhan from './themHocPhan';
import suaHocPhan from './suaHocPhan';
import xoaHocPhans from './xoaHocPhans';
import getNamHocs from './getNamHocs';
import themLopHocPhan from './themLopHocPhan';
import getLopHocPhan from './getLopHocPhan';
import themLichHoc from './themLichHoc';
import findGiangVien from './findGiangVien';
import suaLopHocPhan from './suaLopHocPhan';
import themSinnhVienVaoLopHocPhan from './themSinnhVienVaoLopHocPhan';
import suaDiemSinhVien from './suaDiemSinhVien';
import filterNamHoc from './filterNamHoc';
import xoaGiangViensOfMonHoc from './xoaGiangViensOfMonHoc';
import themHocPhanVaoHocKy from './themHocPhanVaoHocKy';
import xoaLichHocs from './xoaLichHocs';
import suaLichHoc from './suaLichHoc';
import suaNamHoc from './suaNamHoc';
import themHocKyNormal from './themHocKyNormal';
import xoaHocKyNormals from './xoaHocKyNormals';
import themSinhViens from './themSinhViens';
import xoaSinhVienOfLopHocPhan from './xoaSinhVienOfLopHocPhan';

const query = {
  ...GetProfile.query,
  ...findDayNha.query,
  ...findPhongHoc.query,
  ...findNamHoc.query,
  ...findKhoaHocs.query,
  ...findHocPhan.query,
  ...findKhoaVien.query,
  ...findSinhVien.query,
  ...findChuyenNganh.query,
  ...getNamHocs.query,
  ...getLopHocPhan.query,
  ...findGiangVien.query,
  ...filterNamHoc.query,
};

const mutation = {
  ...Login.mutation,
  ...deleteDayNha.mutation,
  ...createDayNha.mutation,
  ...suaDayNha.mutation,
  ...themPhongHoc.mutation,
  ...xoaPhongHoc.mutation,
  ...themNamHoc.mutation,
  ...xoaNamHocs.mutation,
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
  ...xoaMonHocs.mutation,
  ...themGiangVIen.mutation,
  ...suaGiangVien.mutation,
  ...xoaGiangViens.mutation,
  ...suaKhoaHoc.mutation,
  ...themLop.mutation,
  ...suaLop.mutation,
  ...xoaLops.mutation,
  ...themHocKy.mutation,
  ...suaHocKy.mutation,
  ...xoaHocKys.mutation,
  ...themHocPhan.mutation,
  ...suaHocPhan.mutation,
  ...xoaHocPhans.mutation,
  ...themLopHocPhan.mutation,
  ...suaLopHocPhan.mutation,
  ...themLichHoc.mutation,
  ...themSinnhVienVaoLopHocPhan.mutation,
  ...suaDiemSinhVien.mutation,
  ...xoaGiangViensOfMonHoc.mutation,
  ...themHocPhanVaoHocKy.mutation,
  ...xoaLichHocs.mutation,
  ...suaLichHoc.mutation,
  ...suaNamHoc.mutation,
  ...themHocKyNormal.mutation,
  ...xoaHocKyNormals.mutation,
  ...themSinhViens.mutation,
  ...xoaSinhVienOfLopHocPhan.mutation,
};

export default {
  query,
  mutation,
};
