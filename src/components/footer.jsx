import React from 'react';

import { HashLink } from 'react-router-hash-link';
import { Phone, Mail, WhatsApp } from '@mui/icons-material';

import Card from './card';
import Socials from './socials';

const usefulLinks = [
  {
    linkText: 'Site do ICMC',
    link: 'https://icmc.usp.br/',
  },
  {
    linkText: 'Grupo do ICMC',
    link: 'https://t.me/joinchat/bakayQMJ5rkwYTZh',
  },
  {
    linkText: 'Manual do Calouro USP',
    link: 'https://usp.br/manualdocalouro/',
  },
  {
    linkText: 'Transporte e Alimentação',
    link: 'https://www.puspsc.usp.br/transporte-alimentacao-e-moradia/',
  },
  {
    linkText: 'Atendimento Médico',
    link: 'https://saocarlos.usp.br/servicos/atendimento-medico/',
  },
  {
    linkText: 'Segurança e Tráfego no Campus',
    link: 'https://www.puspsc.usp.br/seguranca-e-acesso-ao-campus/',
  },
  {
    linkText: 'Pró-Reitoria de Inclusão e Pertencimento',
    link: 'https://prip.usp.br/',
  },
  {
    linkText: 'Cardápio do Restaurante Universitário',
    link: 'https://www.puspsc.usp.br/cardapio/',
  },
];

const contacts = [
  {
    image: <Phone />,
    text: <a
      rel='noreferrer noopener'
      className='hover:underline break-all'
      href="tel:55-16-33739700"
      target='_blank'
    >
      +55 (16) 3373-9700
    </a>,
  },
  {
    image: <WhatsApp />,
    text: (
      <>
        Grupo LGBT+ do ICMC (contate em{' '}
        <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href="https://wa.me/5516992888314"
          target='_blank'
        >
          +55 16 99288-8314
        </a>
        )
      </>
    ),
  },
  {
    image: <Mail />,
    text: <HashLink smooth to='/contato' className='hover:underline break-all'>Clique para ver mais contatos</HashLink>,
  },
];

/**
 * Footer
 *
 * @return {void}
 */
export default function Footer() {
  return (
    <footer className='bg-primary'>
      <div className='color-white px-4 py-10 mx-auto container'>
        <div className='grid gap-1 grid-cols-1 md:grid-cols-3 sm:grid-cols-1'>
          <Card>
            <div className='sm:justify-start in:justify-center flex gap-4'>
              <img src='src/images/logo-usp-branco.png' alt='Logo USP' className='h-12 mb-4' />
              <img src='src/images/logo-icmc-branco.svg' alt='Logo ICMC' className='h-12 mb-4' />
            </div>
            <p className='sm:text-left in:text-center text-xl font-bold'>Universidade de São Paulo</p>
            <p className='sm:text-left in:text-center text-xl'>Instituto de Ciências Matemáticas e de Computação</p>
            <Socials />
          </Card>
          <Card title='Links Úteis'>
            {usefulLinks.map((link, index) => {
              return (
                <div className='text-sl' key={index}>
                  {link.link && (
                    <a
                      rel='noreferrer noopener'
                      className='hover:underline break-all text-white/75'
                      href={link.link}
                      target='_blank'
                    >
                      {link.linkText}
                    </a>
                  )}
                </div>
              );
            })}
          </Card>
          <Card title='Contato'>
            <div className='mb-2 text-white/75'>
              Avenida Trabalhador São-carlense, 400 - Centro <br></br>
              CEP: 13566-590 - São Carlos - SP
            </div>
            {contacts.map((contact, index) => {
              return (
                <div key={index}>
                  {
                    <p>
                      {contact.image} {contact.text}
                    </p>
                  }
                </div>
              );
            })}
          </Card>
        </div>
      </div>

      <div className='bg-black w-full p-4 text-center flex flex-col justify-center items-center'>
        <p className='text-xs color-white'>
          ©2025 Instituto de Ciências Matemáticas e de Computação
        </p>
        <p className='text-xs color-white'>
          Desenvolvido por <a className='text-blue-300' href='https://codelab.icmc.usp.br/'>
            Codelab
          </a>
        </p>
      </div>
    </footer>
  );
}
