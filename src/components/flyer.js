import React from 'react';

import manualImage from '../images/bg-manual.webp';
import jupiterImage from '../images/bg-jupiterweb.webp';
import prgImage from '../images/bg-prgusp.webp';

const services = [
  {
    path: 'https://jornal.usp.br/universidade/manual-do-calouro-apresenta-a-usp-aos-novos-ingressantes/',
    title: 'Manual do Calouro Oficial da USP',
    description: 'apps, oportunidades e muito mais',
    image: manualImage,
  },
  {
    path: 'https://jornal.usp.br/universidade/acabou-de-entrar-na-usp-conheca-o-jupiterweb-e-como-ele-pode-ajudar-na-graduacao/',
    title: 'JupiterWeb',
    description: 'Entenda como funciona o sistema interno da USP',
    image: jupiterImage,
  },
  {
    path: 'https://linktr.ee/prgusp',
    title: 'PRG USP',
    description: 'Links da pró reitoria de graduação da USP',
    image: prgImage,
  },
];

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
            <h1 className='font-bold text-black text-lg sm:text-xl md:text-2xl lg:text-4xl py-4'>
              Confira outras informações importantes para os seus primeiros dias na USP!
            </h1>
          </div>
        </div>
      </div>
      <div className='pb-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            {services.map((service, index) => {
              return (<a className='h-full' target='_blank' rel='noreferrer' key={index} href={service.path}>
                <div
                  style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${service.image})` }}
                  className='card-servico card-servico-imagem flex flex-col justify-center break-words transition-all bg-white hover:bg-gray-100 shadow-md hover:shadow-xl m-8 p-8 h-96'>
                  {
                    service.title.length > 0 &&
                    <h1 className='text-xl lg:text-2xl xl:text-4xl'>{service.title}</h1>
                  }
                  {
                    service.description.length > 0 &&
                    <p className='text-base lg:text-lg xl:text-xl pb-4'>{service.description}</p>
                  }
                </div>
              </a>);
            })}
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1'>
            <a className='h-full' target='_blank' rel='noreferrer' href="https://folki.com.br">
              <div
                style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://i.imgur.com/E7qGMeR.png)` }}
                className='card-servico card-servico-imagem flex flex-col justify-center break-words transition-all bg-white hover:bg-gray-100 shadow-md hover:shadow-xl m-8 p-8 h-96'>
                <h1 className='text-xl lg:text-2xl xl:text-4xl'>Folki - O App para se Organizar na USP</h1>
                <p className='text-base lg:text-lg xl:text-xl pb-4'>Organize suas atividades, faltas, aulas e notas. Tudo em um só lugar! Mais de 5 mil USPianos usam e aprovam!</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
