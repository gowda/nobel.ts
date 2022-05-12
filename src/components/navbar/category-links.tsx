import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { NobelPrizeCategory } from '../../types/api-request';

export default () => {
  const { category: value } = useParams();

  return (
    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
      {Object.getOwnPropertyNames(NobelPrizeCategory).map((category) => (
        <li key={category} className='nav-item'>
          <Link
            to={`/${category.toLowerCase()}`}
            className={`nav-link btn btn-link shadow-none d-flex justify-content-start ${
              value === category.toLowerCase() ? 'active' : ''
            }`}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};
