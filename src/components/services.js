import React from 'react';

import {Link} from 'react-router-dom';

import SectionHeader from './section-header';

const services = [
  {
    path: '/servicos/servico-de-graduacao',
    title: 'Serviço de Graduação',
    description: 'matrículas & equivalências & documentos & atendimento',
  },
  {
    path: '/servicos/biblioteca',
    title: 'Biblioteca',
    description: 'livros & empréstimos & sites & informação',
  },
  {
    path: '/servicos/informatica',
    title: 'Informática',
    description: 'senha única & e-mail USP & recursos digitais',
  },
  {
    path: '/servicos/comunicacao',
    title: 'Comunicação',
    description: 'divulgações & mídias institucionais & eventos & cursos de extensão',
  },
  {
    path: '/servicos/apoio-psicologico',
    title: 'Apoio Psicológico',
    description: 'eventos & acolhimento & escuta & apoio & ajuda',
  },
];

/**
 * Services
 *
 * @return {void}
 */
export default function Services({url}) {
  return (
    <div id='servicos'>
      <SectionHeader title='Serviços e setores' subTitle={<p>Você vai <b>precisar</b> desse pessoal!</p>} />
      <div className='bg-primary pb-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            {services.map((service, index) => {
              return (<Link className='h-full' key={index} to={service.path}>
                <div className='card-servico flex flex-col justify-center break-words transition-all bg-white hover:bg-gray-200 shadow-md hover:shadow-none m-8 p-8 h-96'>
                  {
                    service.title.length > 0 &&
                    <h1 className='text-xl lg:text-2xl xl:text-4xl'>{service.title}</h1>
                  }
                  {
                    service.description.length > 0 &&
                    <p className='text-base lg:text-lg xl:text-xl pb-4'>{service.description}</p>
                  }
                </div>
              </Link>);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
