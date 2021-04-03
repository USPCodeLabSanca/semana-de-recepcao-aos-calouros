import React from 'react';

/**
 * SectionHeader
 *
 * @return {void}
 */
export default function SectionHeader({title, subTitle}) {
  return (
    <div className='bg-primary h-48'>
      <div className='flex flex-col justify-center md:justify-start h-full container mx-auto px-8 md:flex-row md:items-center'>
        <h1 className='text-xl font-bold uppercase md:text-2xl lg:text-4xl'>{title}</h1>
        {
          subTitle && (<div className='flex items-center pr-4 pt-8 md:py-8 md:pl-4 md:h-full'>
            <div className='bg-black w-1 mr-4 h-full rounded-full'></div>
            <h2 className='text-lg max-w-md md:text-xl lg:text-2xl'>
              {subTitle}
            </h2>
          </div>)
        }
      </div>
    </div>
  );
}
