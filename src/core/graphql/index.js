import Login from "./login";
import GetProfile from "./getProfile";
// import GetSinhViens from "./getSinhViens";
import findDayNha from "./findDayNha";
const query = {
  ...GetProfile.query,
  ...findDayNha.query,
  // ...GetSinhViens.query,
};

const mutation = {
  ...Login.mutation,
};

export default {
  query,
  mutation,
};
