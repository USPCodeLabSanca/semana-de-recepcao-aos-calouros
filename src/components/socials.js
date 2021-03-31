import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

import SectionHeader from './section-header';

const links = [
  {
    image: <FacebookIcon fontSize='large' color='primary' />,
    link: 'https://pt-br.facebook.com/icmc.usp',
  },
  {
    image: <InstagramIcon fontSize='large' color='primary' />,
    link: 'https://www.instagram.com/icmc.usp',
  },
  {
    image: <TwitterIcon fontSize='large' color='primary' />,
    link: 'https://twitter.com/icmc_usp',
  },
  {
    image: <LinkedInIcon fontSize='large' color='primary' />,
    link: 'https://www.linkedin.com/school/icmc-usp',
  },
  {
    image: <YouTubeIcon fontSize='large' color='primary' />,
    link: 'https://www.youtube.com/channel/UCAnzNH_nZcLIBVLWoiWY5KA',
  },
];

/**
 * Socials
 *
 * @return {void}
 */
export default function Socials() {
  return (
    <>
      <SectionHeader title='Siga nossas redes sociais!' subTitle={<p>Você também pode <b>entrar em contato</b> em todos esses canais para <b>pedir informações</b></p>} />
      <div className='bg-primary pb-8'>
        <div className='flex flex-wrap justify-center container mx-auto'>
          {links.map((link, index) => {
            return (
              <div className='p-8' key={index}>
                <a
                  className='flex items-center justify-center transition-all bg-black hover:bg-gray-700 rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32'
                  rel='noreferrer noopener'
                  href={link.link} target="_blank"
                >
                  {link.image}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
