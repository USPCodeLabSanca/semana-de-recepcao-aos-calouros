import React from 'react';
import Nuvem from '../images/nuvem.png';

/**
 * Hero
 *
 * @return {void}
 */
function Hero() {
  return (
    <>
      <div>
        <div className="flex items-center min-h-screen bg-primary color-white pt-24 md:pt-12">
          <div className="md:grid md:grid-cols-2 md:items-center container mx-auto px-8">
            <div>
              <h1 className="text-3xl text-5xl md:text-6xl lg:text-7xl lg:pr-10 font-primary">
                Viver a USP é melhor que sonhar.
              </h1>
              <div className="text-base text-xl md:text-xl lg:text-2xl">
                <p className="py-4">
                  Por muito tempo, você sonhou em ser aprovado na melhor
                  universidade da América Latina.
                </p>
              </div>
            </div>

            <div className="text-base md:text-xl lg:text-2xl md:pl-16 pt-16 ">
              <img src={Nuvem} alt="Nuvem de sonho" className="z-0 top-0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
