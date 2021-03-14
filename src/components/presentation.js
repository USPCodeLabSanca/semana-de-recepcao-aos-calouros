import React from 'react';

import ReactPlayer from 'react-player';

/**
 * Presentation
 *
 * @return {void}
 */
export default function Presentation() {
  return (
    <ReactPlayer
      className='h-screen-without-navbar'
      width='100%'
      url='https://youtu.be/4B7NOctCnW4'
    />
  );
}
