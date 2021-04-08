import React from 'react';

import Detalhe from '../images/detalhe.png';

/**
 * Hero
 *
 * @return {void}
 */
function Hero() {
  return (<>
    <div className='flex items-center min-h-screen bg-primary pt-24 md:pt-12'>
      <div className='md:grid md:grid-cols-2 md:items-center container mx-auto px-8'>
        <div className='flex justify-center'>
          <div className='w-full max-w-lg py-4 md:px-4'>
            <img src={Detalhe} alt='A USP tranforma VOCÊ tranforma a USP'/>
          </div>
        </div>
        <div className='text-base sm:text-lg md:text-xl lg:text-2xl'>
          <p className='py-4'>
            Você acababa de ingressar em uma <b>universidade pública, gratuita e reconhecida</b> como umas das melhores do mundo.
          </p>
          <p className='py-4'>
            Durante a semana de 12 a 16 de abril de 2021 preparamos uma programação para apresentar <b>a sua nova casa</b>.
          </p>
          <p className='py-4'>
            Tudo será <b>virtual</b>, assim como as aulas deste primeiro semestre.
          </p>
          <div className='pb-14 pt-4 md:pb-4'>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLScxUHu-s87JOR-lOXKML6T-wfTBhHv_8C1h2EAJYUdIL2zmbQ/viewform' target='_blank' rel='noopener noreferrer'>
              <button className='text-base sm:text-lg md:text-xl lg:text-2xl transition-all bg-white hover:bg-gray-100 shadow-md py-3 px-12 rounded w-100'>
                Quero participar!
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default Hero;
