import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { NobelPrizeCategory } from '../types/api-request';

export default () => {
  const { category: value } = useParams();

  return (
    <ul className='nav flex-column sticky-top nav-pills visible-md'>
      {Object.getOwnPropertyNames(NobelPrizeCategory).map((category) => (
        <li key={category} className='nav-item mt-2'>
          <Link
            to={`/${category.toLowerCase()}`}
            className={`nav-link btn btn-link w-100 justify-content-start text-left ${
              value === category.toLowerCase() ? 'active' : ''
            }`}
          >
            {category}
          </Link>
        </li>
      ))}
      {value && (
        <li className='nav-item mt-2'>
          <Link
            to='/'
            className='nav-link btn btn-link text-secondary justify-content-start text-left'
          >
            <span className='mr-2 font-weight-bold' aria-hidden='true'>
              &times;
            </span>
            Clear filters
          </Link>
        </li>
      )}
    </ul>
  );
};
