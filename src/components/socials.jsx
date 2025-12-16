import React from 'react';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';

const links = [
  {
    image: <FacebookIcon />,
    link: 'https://pt-br.facebook.com/icmc.usp',
  },
  {
    image: <InstagramIcon />,
    link: 'https://www.instagram.com/icmc.usp',
  },
  {
    image: <TwitterIcon />,
    link: 'https://twitter.com/icmc_usp',
  },
  {
    image: <LinkedInIcon />,
    link: 'https://www.linkedin.com/school/icmc-usp',
  },
  {
    image: <YouTubeIcon />,
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
      <div className='pb-2'>
        <div className='flex flex-wrap justify-center container mx-auto'>
          {links.map((link, index) => {
            return (
              <div className='p-2' key={index}>
                <a
                  className='flex items-center justify-center transition-all hover:bg-gray-200 hover:text-black rounded-full h-6 w-6 sm:h-12 sm:w-12'
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
