import Login from "./login";
import GetProfile from "./getProfile";
// import GetSinhViens from "./getSinhViens";

const query = {
  // ...GetProfile.query,
  // ...GetSinhViens.query,
};

const mutation = {
  ...Login.mutation,
};

export default {
  query,
  mutation,
};
