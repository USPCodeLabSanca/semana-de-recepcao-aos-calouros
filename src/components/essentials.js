import React from 'react';
import SectionHeader from './section-header';

const links = [
  {
    path: 'https://forms.gle/Gz7RCErLg8GwdzVF6',
    title: 'Forms para bixos 2025',
  },
];

/**
 * Essentials
 *
 * @return {void}
 */
export default function Essentials({ url }) {
  return (
    <div className='bg-secondary'>
      <SectionHeader title='Forms para bixos' subTitle={<p>Responda para ser adicionado nos grupos!</p>} />
      <div className='pb-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1'>
            {links.map((link, index) => {
              return (
                <>
                  <a className='card-servico transition-all bg-white hover:bg-gray-100 shadow-md hover:shadow-xl font-bold py-4 mx-8 text-center text-base sm:text-lg md:text-xl lg:text-2xl text-black' target='_blank' rel='noreferrer' href={link.path}>{link.title}</a>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
