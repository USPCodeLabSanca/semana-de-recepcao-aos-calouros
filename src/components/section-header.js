import React from 'react';

/**
 * SectionHeader
 *
 * @return {void}
 */
export default function SectionHeader({title, subTitle}) {
  return (
    <div className='bg-primary h-48'>
      <div className='flex flex-col h-full container mx-auto px-4 md:flex-row md:items-center'>
        <h1 className='text-xl font-bold uppercase pt-8 md:text-2xl lg:text-4xl md:pt-0'>{title}</h1>
        <div className='flex items-center h-full'>
          <div className='pr-4 py-8 h-full md:pl-4'>
            <div className='bg-black w-1 h-full rounded-full'></div>
          </div>
          <h2 className='text-lg max-w-xs md:text-xl lg:text-2xl'>
            {subTitle}
          </h2>
        </div>
      </div>
    </div>
  );
}
