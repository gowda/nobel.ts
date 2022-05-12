import React from 'react';

interface Props {
  message?: string;
}

export default ({ message = 'Loading' }: Props) => (
  <div className='row'>
    <div className='col-auto'>
      <div className='spinner-border text-secondary' role='status' />
    </div>
    <div className='col-auto'>
      <span className='text-muted'>{message}...</span>
    </div>
  </div>
);
