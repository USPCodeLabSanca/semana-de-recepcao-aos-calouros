import React from 'react';
import SectionHeader from './section-header';

const links = [
  {
    path: 'https://t.me/joinchat/bakayQMJ5rkwYTZh',
    title: 'Grupo SuperFamília ICMC',
  },
  {
    path: '',
    title: 'Grupo LGBT+ do ICMC',
  },
  {
    path: '',
    title: 'Grupo de Feirão do ICMC',
  },
  {
    path: 'https://t.me/+MKAZLPOvV-U5ODEx',
    title: 'Grupo para Recepção de bixos BCC',
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
      <SectionHeader title='Grupos Essenciais' subTitle={<p>Encontre suas futuras <b>companhias</b>!</p>} />
      <div className='pb-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1'>
            {links.map((link, index) => {
              return (
                <>
                  <a className='text-white hover:text-blue-100 underline text-base font-bold sm:text-lg md:text-xl lg:text-2xl mx-8 my-1' target='_blank' rel='noreferrer' href={link.path}>{link.title}</a>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
