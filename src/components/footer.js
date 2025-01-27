import React from 'react';

import { HashLink } from 'react-router-hash-link';
import { Phone, Public, Mail, WhatsApp } from '@material-ui/icons';

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
    linkText: 'Manual do calouro USP',
    link: 'https://usp.br/manualdocalouro/',
  },
  {
    linkText: 'Transporte e Alimentação',
    link: 'https://www.puspsc.usp.br/transporte-alimentacao-e-moradia/',
  },
  {
    linkText: 'Atendimento médico',
    link: 'https://saocarlos.usp.br/servicos/atendimento-medico/',
  },
  {
    linkText: 'Segurança e tráfego no campus',
    link: 'https://www.puspsc.usp.br/seguranca-e-acesso-ao-campus/',
  },
  {
    linkText: 'Pró-reitoria de Inclusão e Pertencimento (PRIP)',
    link: 'https://prip.usp.br/',
  },
  {
    linkText: 'Cardápio do restaurante universitário',
    link: 'https://www.puspsc.usp.br/cardapio/',
  },
];

const contacts = [
  {
    image: <Phone />,
    text: <a
      rel='noreferrer noopener'
      className='hover:underline break-all'
      href="tel:55-16-33739639"
      target='_blank'
    >
      +55 (16) 3373-9639
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
    <footer>
      <div className='bg-primary color-white px-4 pb-10'>
        <Socials />
        <div className='grid gap-1 grid-cols-1 md:grid-cols-3 sm:grid-cols-1'>
          <Card
            title='UNIVERSIDADE DE SÃO PAULO INSTITUTO DE CIÊNCIAS MATEMÁTICAS E DE COMPUTAÇÃO'
            icon={<Public />}
          >
            <div className='text-sl'>
              Avenida Trabalhador São-carlense, 400 - Centro <br></br>
              CEP: 13566-590 - São Carlos - SP
            </div>
          </Card>
          <Card title='Links Úteis'>
            {usefulLinks.map((link, index) => {
              return (
                <div className='text-sl' key={index}>
                  {link.link && (
                    <a
                      rel='noreferrer noopener'
                      className='hover:underline break-all'
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
            {contacts.map((contact, index) => {
              return (
                <div className='text-sl' key={index}>
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

      <div className='bg-black w-full h-10 text-center flex flex-col justify-center items-center'>
        <p className='text-xs color-white'>
          ©2025 Instituto de Ciências Matemáticas e de Computação
        </p>
      </div>
    </footer>
  );
}
