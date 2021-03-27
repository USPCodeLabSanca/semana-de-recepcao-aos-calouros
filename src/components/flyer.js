import React from 'react';
import {Box} from '@material-ui/core';

import LogoBixoquest from '../images/logo-bixoquest.png';

/**
 * Flyer
 *
 * @return {void}
 */
export default function Flyer() {
  return (
    <Box className='flex flex-col sm:flex-row justify-center shadow-md'>
      <Box className='flex justify-center'>
        <img src={LogoBixoquest} alt='Logo Bixoquest' className='w-3/4'/>
      </Box>
      <Box className='text-center md:text-left px-2 flex flex-col sm:items-start justify-center'>
        <h2 className='text-5xl color-black font-semibold'>A aventura vai começar!</h2>
        <p className='color-black mb-10 px-2 md:px-0 text-lg'>
          Já pensou em transformar a Semana de Recepção em um grande jogo?!
        </p>
        <a href='https://bixoquest.icmc.usp.br' target='_blank' rel='noopener noreferrer'>
          <button className='bg-secondary shadow-sm mb-8 sm:mb-0 py-3 px-12 color-white rounded font-medium w-100'>
            Clique aqui!
          </button>
        </a>
      </Box>
    </Box>
  );
}
