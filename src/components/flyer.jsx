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
  {
    path: 'https://folki.com.br',
    title: 'Folki - O App para se Organizar na USP',
    description: 'Organize suas atividades, faltas, aulas e notas. Tudo em um só lugar! Mais de 5 mil USPianos usam e aprovam!',
    image: 'https://i.imgur.com/E7qGMeR.png',
  },
  {
    path: 'https://sancabrecho.com.br',
    title: 'Sanca Brechó - O Mercado Universitário de Usados',
    description: 'Compre e venda entre universitários de São Carlos! Completamente gratuito e feito por estudantes do ICMC.',
    image: 'https://i.imgur.com/ibUq1QL.png',
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
      <div className='h-24 mt-6'>
        <div className='flex flex-col items-center justify-center text-center h-full container mx-auto px-8'>
          <div>
            <h1 className='font-bold text-black text-lg sm:text-xl md:text-2xl lg:text-4xl'>
              Confira outras informações importantes para os seus primeiros dias na USP!
            </h1>
          </div>
        </div>
      </div>
      <div className='pb-8'>
        <div className='container mx-auto'>
          <div className='flex flex-wrap'>
            {services.map((service, index) => {
              return (
                <a
                  key={index}
                  href={service.path}
                  target='_blank'
                  rel='noreferrer'
                  className='h-full grow w-full lg:w-1/2 xl:w-1/3'
                >
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
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
