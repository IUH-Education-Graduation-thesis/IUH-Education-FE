import { isEmpty, isNumber } from 'lodash';

export const checkTrulyObject = (obj, exceptions = []) => {
  const _asArray = Object.entries(obj);

  const _filtered = _asArray?.filter(([key, value]) => {
    if (exceptions?.includes(key)) return true;

    if (isNumber(value)) {
      return true;
    }

    return !isEmpty(value);
  });

  const _res = Object?.fromEntries(_filtered);

  return _res;
};
