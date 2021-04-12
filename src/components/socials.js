import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const links = [
  {
    image: <FacebookIcon color='primary' />,
    link: 'https://pt-br.facebook.com/icmc.usp',
  },
  {
    image: <InstagramIcon color='primary' />,
    link: 'https://www.instagram.com/icmc.usp',
  },
  {
    image: <TwitterIcon color='primary' />,
    link: 'https://twitter.com/icmc_usp',
  },
  {
    image: <LinkedInIcon color='primary' />,
    link: 'https://www.linkedin.com/school/icmc-usp',
  },
  {
    image: <YouTubeIcon color='primary' />,
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
      <div className='bg-primary h-48'>
        <div className='flex items-center justify-center text-center h-full container mx-auto px-8'>
          <h1 className='text-xl font-bold uppercase md:text-2xl lg:text-4xl'>Siga nossas redes sociais:</h1>
        </div>
      </div>
      <div className='bg-primary pb-20'>
        <div className='flex flex-wrap justify-center container mx-auto'>
          {links.map((link, index) => {
            return (
              <div className='p-4' key={index}>
                <a
                  className='flex items-center justify-center transition-all bg-black hover:bg-gray-700 rounded-full h-12 w-12 sm:h-16 sm:w-16 sm:h-20 sm:w-20'
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
