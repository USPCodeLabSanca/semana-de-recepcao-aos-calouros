import React from 'react';

import Image from '../images/slogan.png';

// <h1 style={{fontFamily: 'Belfast', fontSize: '6ch', fontWeight: '700'}}>Agora, <br/>nossa história é sua também.</h1>

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
          <img src={Image} alt="Agora, nossa história é sua também."></img>
        </div>
        <div className='text-base sm:text-lg md:text-xl lg:text-2xl'>
          <p className='py-4'>
            Você acaba de ingressar em uma <b>universidade pública, gratuita e reconhecida</b> como umas das melhores do mundo.
          </p>
          <p className='py-4'>
            Preparamos diversos conteúdos para apresentar a sua nova casa. Tudo será <b>virtual</b>, assim como as aulas deste primeiro semestre.
          </p>
        </div>
      </div>
    </div>
  </>);
}

export default Hero;
