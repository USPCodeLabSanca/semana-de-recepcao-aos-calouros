import React from 'react';

import { Link } from 'react-router-dom';

import SectionHeader from './section-header';
import { ComputerOutlined, ForumOutlined, LocalHospitalOutlined, MenuBookOutlined, PeopleOutline, SchoolOutlined } from '@material-ui/icons';

const services = [
  {
    path: '/servicos/servico-de-graduacao',
    title: 'Serviço de Graduação',
    description: 'matrículas & equivalências & documentos & atendimento',
    icon: SchoolOutlined,
  },
  {
    path: '/servicos/biblioteca',
    title: 'Biblioteca',
    description: 'livros & empréstimos & sites & informação',
    icon: MenuBookOutlined,
  },
  {
    path: '/servicos/assistencia-social',
    title: 'Assistência Social',
    description: 'bolsas & auxílios & moradia & alimentação',
    icon: PeopleOutline,
  },
  {
    path: '/servicos/informatica',
    title: 'Informática',
    description: 'senha única & e-mail USP & recursos digitais',
    icon: ComputerOutlined,
  },
  {
    path: '/servicos/comunicacao',
    title: 'Comunicação',
    description: 'divulgações & mídias institucionais & eventos & cursos de extensão',
    icon: ForumOutlined,
  },
  {
    path: '/servicos/apoio-psicologico',
    title: 'Apoio Psicológico',
    description: 'eventos & acolhimento & escuta & apoio & ajuda',
    icon: LocalHospitalOutlined,
  },
];

/**
 * Services
 *
 * @return {void}
 */
export default function Services({ url }) {
  return (
    <div className='bg-primary' id='servicos'>
      <SectionHeader title='Serviços e setores' subTitle={<p>Você vai <b>precisar</b> desse pessoal!</p>} />
      <div className='bg-primary pb-8'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            {services.map((service, index) => {
              return (<Link className='h-full' key={index} to={service.path}>
                <div className='card-servico flex flex-col justify-center break-words transition-all bg-white hover:bg-gray-100 shadow-md hover:shadow-xl m-4 p-8 h-36 md:h-56'>
                  {
                    service.title.length > 0 && (
                      <div className='flex items-center gap-5'>
                        {service.icon && <service.icon className='MuiIcon-fontSizeLarge' />}
                        <h1 className='text-xl lg:text-2xl xl:text-4xl'>{service.title}</h1>
                      </div>
                    )
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
