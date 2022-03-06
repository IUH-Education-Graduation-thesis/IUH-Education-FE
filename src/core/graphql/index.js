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


const query = {
  ...GetProfile.query,
  ...findDayNha.query,
  ...findPhongHoc.query,
  ...findNamHoc.query,
  ...findKhoaHocs.query,
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
};

export default {
  query,
  mutation,
};
