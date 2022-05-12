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

const CATEGORY_TAGS: { [k: string]: string } = {
  'Physiology or Medicine': 'medicine',
  Physics: 'physics',
  Chemistry: 'chemistry',
  Peace: 'peace',
  Literature: 'literature',
  'Economic Sciences': 'economics',
};
export const categoryTag = (category: string) => CATEGORY_TAGS[category];

const TAG_CATEGORIES: { [k: string]: string } = {
  medicine: 'Physiology or Medicine',
  physics: 'Physics',
  chemistry: 'Chemistry',
  peace: 'Peace',
  literature: 'Literature',
  economics: 'Economic Sciences',
};
export const tagCategory = (tag: string) => TAG_CATEGORIES[tag];
