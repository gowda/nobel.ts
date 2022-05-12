import React, { useState } from 'react';

import CategoryLinks from './category-links';
import Search from './search';

export default () => {
  const [showNav, setShowNav] = useState<boolean>(false);

  return (
    <>
      <button
        className='navbar-toggler shadow-none'
        type='button'
        onClick={() => setShowNav(!showNav)}
      >
        <span className='navbar-toggler-icon' />
      </button>
      <div className={`collapse navbar-collapse ${showNav ? 'show' : ''}`}>
        <CategoryLinks />
        <Search />
      </div>
    </>
  );
};
