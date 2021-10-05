import React, { useState } from 'react';

import { NobelPrizeCategory } from '../types/api-request';

interface Props {
  value?: string;
  onChange: (v?: string) => void;
}

export default ({ value, onChange }: Props) => {
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
              <button
                type='button'
                className={`nav-link btn btn-link w-100 justify-content-start text-left ${
                  value === category ? 'active' : ''
                }`}
                onClick={() => {
                  setExpanded(!expanded);
                  onChange(category);
                }}
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
                onClick={() => {
                  setExpanded(!expanded);
                  onChange(undefined);
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
