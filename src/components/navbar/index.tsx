import React from 'react';
import { Link } from 'react-router-dom';

import LinksAndSearch from './links-and-search';

export default () => (
  <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    <div className='container-fluid'>
      <Link className='navbar-brand' to='/'>
        Nobel laureates
      </Link>
      <LinksAndSearch />
    </div>
  </nav>
);
