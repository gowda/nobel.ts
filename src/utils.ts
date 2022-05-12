/* eslint-disable import/prefer-default-export */

const isObject = (o: any) => o && !Array.isArray(o) && typeof o === 'object';
const isI18nString = (o: any) => isObject(o) && !!o.en;

export const transform = (o: any): any =>
  Object.getOwnPropertyNames(o).reduce((acc: any, key: string) => {
    if (isI18nString(o[key])) {
      return { ...acc, [key]: o[key].en };
    }

    if (isObject(o[key])) {
      return { ...acc, [key]: transform(o[key]) };
    }

    if (Array.isArray(o[key])) {
      return { ...acc, [key]: o[key].map(transform) };
    }
    return { ...acc, [key]: o[key] };
  }, {});
