import React from 'react';

import {Box} from '@material-ui/core';

const style = {
  main_box: 'bg-primary px-10 md:px-20 py-12 color-white',
  link: 'text-lg color-light-gray hover:underline break-all',
  link_box: 'my-8 ',
  link_title: 'font-medium text-2xl md:text-3xl',
  title: 'font-semibold text-4xl md:text-5xl',
};

const links = [
  {
    title: 'Evento no Facebook',
    link: 'facebook.com/events/170712444024695/',
  },
  {
    title: 'Sistema Júpiter Web',
    link: 'uspdigital.usp.br/jupiterweb',
  },
  {
    title: 'Aplicativo móvel de segurança',
    link: 'sppu.usp.br',
  },
  {
    title: 'FAQ e depoimentos',
    link: 'icmc.usp.br/graduacao/faq-e-depoimentos',
  },
  {
    title: 'Manual do calouro USP',
    link: 'usp.br/manualdocalouro',
  },
];

/**
 * LinksImportantes
 *
 * @return {void}
 */
export default function LinksImportantes() {
  return (
    <Box className={style.main_box}>
      <h2 className={style.title}>Links Importantes</h2>
      {links.map((link, index) => {
        return (
          <Box className={style.link_box} key={index}>
            <h3 className={style.link_title}>{link.title}</h3>
            <a rel='noreferrer noopener' className={style.link} href={`https://${link.link}`} target="_blank">
              {link.link}
            </a>
          </Box>
        );
      })}
    </Box>
  );
}
