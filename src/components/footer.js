import React from 'react';
import Card from './card';
import Socials from './socials';

import PhoneIcon from '@material-ui/icons/Phone';
import TelegramIcon from '@material-ui/icons/Telegram';

import PublicIcon from '@material-ui/icons/Public';

const usefulLinks = [
  {
    linkText: 'Site do ICMC',
    link: 'https://icmc.usp.br/',
  },
  {
    linkText: 'Discord do ICMC',
    link: 'https://discord.gg/QrbxjtwhBx',
  },
  {
    linkText: 'Manual do calouro USP',
    link: 'https://usp.br/manualdocalouro/',
  },
  {
    linkText: 'Transporte',
    link: 'http://www.saocarlos.usp.br/onibus/',
  },
  {
    linkText: 'Alimentação',
    link: 'http://www.puspsc.usp.br/cardapio/',
  },
  {
    linkText: 'Atendimento médico',
    link: 'http://www.saocarlos.usp.br/servicos/atendimento-medico/',
  },
  {
    linkText: 'Segurança e tráfego no campus',
    link: 'http://www.saocarlos.usp.br/servicos/seguranca-e-trafego-no-campus/',
  },
  {
    linkText: 'pró-reitoria de Inclusão e Pertencimento (PRIP)',
    link: 'https://prip.usp.br/',
  },
  {
    linkText: 'Programa de Apoio à Permanência e Formação Estudantil (PAPFE)',
    link: 'http://www.saocarlos.usp.br/calouros-com-dificuldades-socioeconomicas-podem-se-inscrever-em-programa-de-permanencia/',
  },
  {
    linkText: 'Cardápio do restaurante universitário',
    link: 'http://www.puspsc.usp.br/cardapio/',
  },
];

const contacts = [
  {
    image: <PhoneIcon color='' />,
    text: '+55 (16) 3373-9700',
  },
  {
    image: <TelegramIcon color='' />,
    text: 'Grupo LGBT+ do ICMC (procure no Telegram: @dan3u, @lcrodolfo, @nextlevelgih, @Ami_gayatri, @roassaf, @mcarvalhor, @allanmaniero, @milenacsilva)',
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
      <div className='bg-primary color-white px-4'>
        <Socials/>
        <div className='grid gap-1 grid-cols-1 md:grid-cols-3  sm:grid-cols-1'>
          <Card title="UNIVERSIDADE DE SÃO PAULO INSTITUTO DE CIÊNCIAS MATEMÁTICAS E DE COMPUTAÇÃO" icon={<PublicIcon color='' />}>
            <div className='text-sl'>
              Avenida Trabalhador São-carlense, 400 - Centro <br></br>
              CEP: 13566-590 - São Carlos - SP
            </div>
          </Card>
          <Card title="Links Úteis">
            {usefulLinks.map((link, index) => {
              return (
                <div className='text-sl' key={index}>
                  {
                    link.link &&
                    (<a rel='noreferrer noopener' className='hover:underline break-all' href={link.link} target="_blank">
                      {link.linkText}
                    </a>)
                  }
                </div>
              );
            })}
          </Card>
          <Card title="Contato">
            {contacts.map((contact, index) => {
              return (
                <div className='text-sl' key={index}>
                  {
                    (<p>{contact.image} {contact.text}</p>)
                  }
                </div>
              );
            })}
          </Card>
        </div>
      </div>

      <div className='bg-black w-full h-10 text-center flex flex-col justify-center items-center'>
        <p className='text-xs color-white'>
          ©2022 Instituto de Ciências Matemáticas e de Computação
        </p>
      </div>
    </footer>
  );
}
