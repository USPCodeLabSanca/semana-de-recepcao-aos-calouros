import React from 'react';

// <h1 style={{fontFamily: 'Belfast', fontSize: '6ch', fontWeight: '700'}}>Agora, <br/>nossa história é sua também.</h1>

/**
 * Hero
 *
 * @return {void}
 */
function Hero() {
  return (<>
    <div className='flex items-center min-h-screen bg-primary color-white pt-24 md:pt-12'>
      <div className='md:grid md:grid-cols-2 md:items-center container mx-auto px-8'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
          Viver a USP é melhor que sonhar!
        </h1>
        <div className='text-base sm:text-lg md:text-xl lg:text-2xl'>
          <p className='py-4'>
            Você acaba de ingressar em uma <b>universidade pública, gratuita e reconhecida</b> como umas das melhores do mundo.
          </p>
        </div>
      </div>
    </div>
  </>);
}

export default Hero;
