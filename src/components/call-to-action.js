import React from 'react';

import Button from '@material-ui/core/Button';

import Logo50 from '../images/logo50.png';
import Detalhe from '../images/detalhe.png';

/**
 * Call To Action
 *
 * @return {void}
 */
function CallToAction() {
  return (<>
    <div className='min-h-screen bg-primary pt-10'>
      <div className='bg-black text-white'>
        <div className='flex flex-col md:flex-row items-center container mx-auto px-4'>
          <img src={Logo50} alt='Logo ICMC 50 anos' className='p-4 h-24'/>
          <div className='p-4'>
            <h1 className='text-lg md:text-xl uppercase'>
              <b>Instituto de Ciências Matemáticas e de Computação da USP</b>
            </h1>
            <h2 className='md:text-lg'>
              <b>semana de recepção aos calouros de 2021</b>
            </h2>
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <div className='md:grid md:grid-cols-2 md:items-center container mx-auto px-8 pt-10'>
          <div className='flex justify-center'>
            <div className='max-h-96 py-4 md:px-4'>
              <img src={Detalhe} alt='A USP tranforma VOCÊ tranforma a USP'/>
            </div>
          </div>
          <div className='text-base sm:text-lg md:text-xl lg:text-2xl'>
            <p className='py-4'>
              Você acababa de ingressar em uma <b>universidade pública, gratuita e reconhecida</b> como umas das melhores do mundo.
            </p>
            <p className='py-4'>
              Durante a semana <b>de 12 a 16 de abril de 2021</b> preparamos uma programação para te ajudar a <b>conhecer a sua nova casa</b>.
            </p>
            <div className='pb-14 pt-4 md:pb-4'>
              <a href='https://docs.google.com/forms/d/e/1FAIpQLScxUHu-s87JOR-lOXKML6T-wfTBhHv_8C1h2EAJYUdIL2zmbQ/viewform' target='_blank' rel='noopener noreferrer'>
                <Button variant="contained" size="large">Quero participar!</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

export default CallToAction;
