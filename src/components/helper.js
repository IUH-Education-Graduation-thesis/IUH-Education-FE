export default {};

export const checkTrulyObject = (obj) => {
  const _asArray = Object.entries(obj);

  const _filtered = _asArray?.filter(([key, value]) => Boolean(value));

  const _res = Object?.fromEntries(_filtered);

  return _res;
};
