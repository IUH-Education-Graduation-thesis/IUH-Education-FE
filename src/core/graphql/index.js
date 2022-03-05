import Login from "./login";
import GetProfile from "./getProfile";
import findDayNha from "./findDayNha";
import deleteDayNha from "./xoaDayNha";
import createDayNha from "./createDayNha";
import suaDayNha from "./suaDayNha";


const query = {
  ...GetProfile.query,
  ...findDayNha.query,
};

const mutation = {
  ...Login.mutation,
  ...deleteDayNha.mutation,
  ...createDayNha.mutation,
  ...suaDayNha.mutation
};

export default {
  query,
  mutation,
};
