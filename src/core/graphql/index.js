import Login from "./login";
import GetProfile from "./getProfile";

const query = {
  ...GetProfile.query,
};

const mutation = {
  ...Login.mutation,
};

export default {
  query,
  mutation,
};
