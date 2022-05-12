import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { NobelPrizeCategory } from '../types/api-request';

export default () => {
  const { category: value } = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <nav className='navbar navbar-expand-lg navbar-light visible-sm pl-0 pr-0'>
      <button
        className='navbar-toggler w-100 shadow-none'
        type='button'
        onClick={() => setExpanded(!expanded)}
      >
        <span className='navbar-toggler-icon' />
      </button>
      <div
        className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}
        id='navbarNav'
      >
        <ul className='navbar-nav'>
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
              <button
                type='button'
                className='nav-link btn btn-link text-secondary justify-content-start text-left'
                onClick={() => {
                  setExpanded(false);
                  navigate('/', { replace: true });
                }}
              >
                <span className='mr-2 font-weight-bold' aria-hidden='true'>
                  &times;
                </span>
                Clear filters
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
