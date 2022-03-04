import ClientCache from "./clientCache";

export const clientCache = new ClientCache();

export const isTokenExpired = () => {
  // eslint-disable-next-line no-undef
  const expired_time = clientCache.getExpiredTimeTokenWithCookie();
  if (!expired_time) return false;

  if (!!expired_time && JSON.parse(expired_time) < Date.now()) return true;

  return false;
};

export default {};
