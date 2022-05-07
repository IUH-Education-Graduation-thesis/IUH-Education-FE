export const checkTrulyObject = (obj, exceptions = []) => {
  const _asArray = Object.entries(obj);

  const _filtered = _asArray?.filter(([key, value]) =>
    exceptions?.includes(key) ? true : Boolean(value),
  );

  const _res = Object?.fromEntries(_filtered);

  return _res;
};
