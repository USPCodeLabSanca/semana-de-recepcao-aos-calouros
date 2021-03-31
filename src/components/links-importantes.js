import React from 'react';

import SectionHeader from './section-header';

const links = [
  {
    title: 'Site ICMC',
    link: 'icmc.usp.br',
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
    <>
      <SectionHeader title='Contatos' subTitle={<p>A gente pode não saber tudo, mas <b>conhecemos quem sabe</b>!</p>} />
      <div className='bg-primary pt-4 pb-8'>
        <div className='container mx-auto px-8'>
          {links.map((link, index) => {
            return (
              <div className='py-4 text-lg sm:text-xl md:text-2xl lg:text-3xl' key={index}>
                <h3 className='font-medium'>{link.title}</h3>
                <a rel='noreferrer noopener' className='hover:underline break-all' href={`https://${link.link}`} target="_blank">
                  {link.link}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
