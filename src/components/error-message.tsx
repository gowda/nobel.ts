import React from 'react';

interface Props {
  message: string;
}

export default ({ message }: Props) => (
  <div className='row'>
    <div className='col-auto'>
      <span className='text-danger'>{message}</span>
    </div>
  </div>
);
