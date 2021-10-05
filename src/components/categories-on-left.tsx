import React from 'react';

import { NobelPrizeCategory } from '../types/api-request';

interface Props {
  value?: string;
  onChange: (v?: string) => void;
}

export default ({ value, onChange }: Props) => (
  <ul className='nav flex-column sticky-top nav-pills visible-md'>
    {Object.getOwnPropertyNames(NobelPrizeCategory).map((category) => (
      <li key={category} className='nav-item mt-2'>
        <button
          type='button'
          className={`nav-link btn btn-link w-100 justify-content-start text-left ${
            value === category ? 'active' : ''
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      </li>
    ))}
    {value && (
      <li className='nav-item mt-2'>
        <button
          type='button'
          className='nav-link btn btn-link text-secondary justify-content-start text-left'
          onClick={() => onChange(undefined)}
        >
          <span className='mr-2 font-weight-bold' aria-hidden='true'>
            &times;
          </span>
          Clear filters
        </button>
      </li>
    )}
  </ul>
);
