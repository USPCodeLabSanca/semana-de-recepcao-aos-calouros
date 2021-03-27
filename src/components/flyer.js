import React from 'react';

import LogoBixoquest from '../images/logo-bixoquest.png';

/**
 * Flyer
 *
 * @return {void}
 */
export default function Flyer() {
  return (
    <div className='flex flex-col sm:flex-row justify-center shadow-md py-8'>
      <div className='flex justify-center py-4 md:px-4'>
        <div className='w-3/4 h-full'>
          <img src={LogoBixoquest} alt='Logo Bixoquest'/>
        </div>
      </div>
      <div className='text-center sm:text-left px-2 flex flex-col sm:items-start justify-center'>
        <h2 className='text-5xl color-black font-semibold'>A aventura vai começar!</h2>
        <p className='color-black pb-10 pt-2 px-2 sm:px-0 text-lg'>
          Já pensou em transformar a Semana de Recepção em um grande jogo?!
        </p>
        <a href='https://bixoquest.icmc.usp.br' target='_blank' rel='noopener noreferrer'>
          <button className='bg-secondary shadow-sm py-3 px-12 color-white rounded font-medium w-100'>
            Clique aqui!
          </button>
        </a>
      </div>
    </div>
  );
}
