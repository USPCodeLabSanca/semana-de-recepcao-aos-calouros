import React from 'react';

import ReactPlayer from 'react-player';

import SectionHeader from './section-header';

const services = [
  {
    title: 'Serviço de Graduação',
    description: 'matrículas & equivalências & documentos & atendimento',
  },
  {
    title: 'Biblioteca',
    description: 'livros & empréstimos & sites & informação',
  },
  {
    title: 'Assistência Social',
    description: '',
  },
  {
    title: 'Informática',
    description: '',
  },
  {
    title: 'Comunicação',
    description: '',
  },
  {
    title: '',
    description: '',
  },
];

/**
 * Services
 *
 * @return {void}
 */
export default function Services({url}) {
  return (
    <div>
      <SectionHeader title='Serviços e setores' subTitle={<p>Você vai <b>precisar</b> desse pessoal!</p>} />
      <div className='bg-primary px-8 pb-8'>
        <ReactPlayer
          className='h-screen-without-navbar shadow'
          width='100%'
          url='https://www.youtube.com/playlist?list=UUAnzNH_nZcLIBVLWoiWY5KA'
        />
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 container mx-auto'>
          {services.map((service, index) => {
            return (
              <div className='flex flex-col justify-center break-words bg-white shadow-md m-8 p-8 h-96' key={index}>
                {
                  service.description.length > 0 &&
                  <p className='text-lg lg:text-xl xl:text-2xl pb-4'>{service.description}</p>
                }
                {
                  service.title.length > 0 &&
                  <h1 className='text-2xl lg:text-3xl xl:text-5xl'>{service.title}</h1>
                }
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
