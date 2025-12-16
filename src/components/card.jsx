import React from 'react';

/**
 * Card
 * @param  {Object} props
 * @return {void}
 */
export default function Card(props) {
  return (
    <div className='max-w overflow-hidden'>
      <div className='p-2'>
        <div className='font-bold uppercase text-xl mb-2'>{props.icon} {props.title}</div>
        {props.children}
      </div>
    </div>
  );
}
