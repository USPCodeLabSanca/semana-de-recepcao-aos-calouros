import React from 'react';

import LogoBixoquest from '../images/logo-bixoquest.png';
import LogoBixoVentures from '../images/logo-bixoventures.png';

/**
 * Flyer
 *
 * @return {void}
 */
export default function Flyer() {
  return (
    <>
      <div className='h-48'>
        <div className='flex flex-col items-center justify-center text-center h-full container mx-auto px-8'>
          <div>
            <h1 className='text-xl font-bold uppercase md:text-2xl lg:text-4xl'>Games</h1>
            <p className='text-xl pt-2'>
              Divirta-se nesses <b>jogos temáticos</b> criados por seus vetaranos
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row justify-center shadow-md pb-8 h-full'>
        <div className='sm:w-1/2 pb-8 sm:pb-0'>
          <div className='flex justify-center sm:py-4 md:px-4'>
            <div className='w-3/4'>
              <div className='container-16-9 inset-0'>
                <div className='flex items-center absolute inset-0 h-full-important'>
                  <img src={LogoBixoquest} alt='Logo Bixoquest'/>
                </div>
              </div>
            </div>
          </div>
          <div className='px-4 pt-8'>
            <a href='https://bixoquest.icmc.usp.br' target='_blank' rel='noopener noreferrer'>
              <button className='text-base sm:text-lg md:text-xl lg:text-2xl transition-all bg-secondary hover:bg-indigo-800 color-white shadow-md py-3 px-12 rounded w-full'>
                Clique aqui!
              </button>
            </a>
          </div>
        </div>
        <div className='sm:w-1/2 h-full'>
          <div className='flex justify-center items-center sm:py-4 md:px-4'>
            <div className='w-3/4'>
              <div className='container-16-9 inset-0'>
                <div className='flex items-end absolute inset-0 h-full-important'>
                  <img src={LogoBixoVentures} alt='Logo Bixoventures'/>
                </div>
              </div>
            </div>
          </div>
          <div className='flex-grow'></div>
          <div className='px-4 pt-8'>
            <a href='https://fog-icmc.itch.io/bixoventures' target='_blank' rel='noopener noreferrer'>
              <button className='text-base sm:text-lg md:text-xl lg:text-2xl transition-all bg-secondary hover:bg-indigo-800 color-white shadow-md py-3 px-12 rounded w-full'>
                Clique aqui!
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
