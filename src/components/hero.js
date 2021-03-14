import React from 'react';

/**
 * Hero
 *
 * @return {void}
 */
function Hero() {
  return (<>
    <div className='flex items-center min-h-screen bg-primary'>
      <div className='md:grid md:grid-cols-2 container mx-auto px-4 pt-10'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl py-4'>
          <b>Bem-vindes ao ICMC!</b>
        </h1>
        <div className='text-base sm:text-lg md:text-xl lg:text-2xl'>
          <p className='py-4'>
              Você acababa de ingressar em uma <b>universidade pública, gratuita e reconhecida</b> como umas das melhores do mundo.
          </p>
          <p className='py-4'>
              Para aproveitar ao máximo sua experiência, reunimos as informações que todos os calouros e calouras precisam saber para <b>entender o que é a USP e o ICMC</b> e aproveitar as oportunidades, serviços e atividades que a sua nova casa oferece.
          </p>
        </div>
      </div>
    </div>
  </>);
}

export default Hero;
