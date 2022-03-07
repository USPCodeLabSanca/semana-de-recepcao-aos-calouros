import React from 'react';

import Image from '../images/50anos.png';

/**
 * Celebration
 *
 * @return {void}
 */
export default function Celebration() {
  return (
    <div className='flex items-center bg-black min-h-screen bg-primary py-24'>
      <div className='flex flex-col items-center container mx-auto text-center px-8 text-white'>
        <div className='max-w-4xl'>
          <p className='text-xl py-8'>
            Em 2021 <b>o ICMC completou 50 anos</b> desde sua criação!!
            Durante o ano todo você vai poder conhecer mais sobre <b>a história e as pessoas</b> que fizeram e fazem parte dessa grande família.
          </p>
        </div>
        <div className='flex justify-center py-8'>
          <div className='w-3/4 h-full mb-8'>
            <img src={Image} alt='50 Anos - Reconhecendo o passado e projetando o futuro'/>
          </div>
        </div>
      </div>
    </div>
  );
}
