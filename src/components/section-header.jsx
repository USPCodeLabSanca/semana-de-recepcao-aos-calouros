import React from 'react';

/**
 * SectionHeader
 *
 * @return {void}
 */
export default function SectionHeader({ title, subTitle }) {
  return (
    <div className='color-white h-36 w-full pt-2'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-center justify-start h-full container mx-auto px-6'>
        <div className='flex-grow md:flex-grow-0 h-full'></div>
        <h1 className='text-2xl font-bold uppercase lg:text-4xl'>{title}</h1>
        {
          subTitle && (<div className='flex items-center pr-4 pt-2 md:py-8 md:pl-4 h-full'>
            <div className='bg-white w-1 mr-4 h-3/4 md:h-1/2 rounded-full'></div>
            <h2 className='text-lg max-w-md md:text-xl lg:text-2xl'>
              {subTitle}
            </h2>
          </div>)
        }
        <div className='flex-grow md:flex-grow-0 h-full'></div>
      </div>
    </div>
  );
}
