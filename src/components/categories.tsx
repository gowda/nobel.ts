import React from 'react';

import CategoriesOnTop from './categories-on-top';
import CategoriesOnLeft from './categories-on-left';

interface Props {
  value?: string;
  onChange: (v?: string) => void;
}

export default ({ value, onChange }: Props) => (
  <>
    <CategoriesOnLeft value={value} onChange={onChange} />
    <CategoriesOnTop value={value} onChange={onChange} />
  </>
);
