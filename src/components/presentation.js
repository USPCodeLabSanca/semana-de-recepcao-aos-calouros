import React from 'react';

import ReactPlayer from 'react-player';

/**
 * Presentation
 *
 * @return {void}
 */
export default function Presentation() {
  return (
    <div className='container-16-9 inset-0'>
      <ReactPlayer
        className='absolute inset-0 h-full-important shadow'
        width='100%'
        url='https://youtu.be/Z-tJPsCmVww'
      />
    </div>
  );
}
