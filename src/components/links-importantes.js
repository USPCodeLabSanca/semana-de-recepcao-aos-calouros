import React from 'react';

import SectionHeader from './section-header';

const links = [
  {
    linkText: 'Site do ICMC',
    link: 'https://icmc.usp.br/',
  },
  {
    linkText: 'Manual do calouro USP',
    link: 'https://usp.br/manualdocalouro/',
  },
  {
    linkText: 'Dicas sobre alimentação, transporte e auxílios no Campus',
    link: 'http://www.saocarlos.usp.br/calouros-2022-confira-algumas-dicas-sobre-alimentacao-transporte-e-auxilios-no-campus/',
  },
  {
    linkText: 'Programa de Apoio à Permanência e Formação Estudantil (PAPFE)',
    link: 'http://www.saocarlos.usp.br/calouros-com-dificuldades-socioeconomicas-podem-se-inscrever-em-programa-de-permanencia/',
  },
  {
    linkText: 'Acesso às disciplinas do semestre',
    link: 'https://sites.google.com/icmc.usp.br/disciplinas-2021/disciplinas_servico',
  },
  {
    linkText: 'Solicitação de equipamento (computador/notebook) e kit internet',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSfrvos68papCtsSDSBWbpd7Fk7cN9SU1Wuxkt1GNgRR6P84kw/viewform',
    text: 'Para quem precisa de recursos para acompanhar as aulas de forma remota.',
  },
  {
    linkText: 'Cardápio do restaurante universitário',
    link: 'http://www.puspsc.usp.br/cardapio/',
    text: '(O Restaurante Universitário está fazendo a entrega de marmitas para todos os alunos que estiverem ativos no Sistema USP, com o cartão físico ou com o e-card)',
  },
  {
    text: 'Grupo LGBT+ do ICMC (procure no Telegram: @dan3u, @lcrodolfo, @nextlevelgih, @Ami_gayatri, @roassaf, @mcarvalhor, @allanmaniero, @arenasoy)',
  },
];

/**
 * Links Importantes
 *
 * @return {void}
 */
export default function LinksImportantes() {
  return (
    <>
      <SectionHeader title='Links úteis' subTitle={<p>Referências legais para consulta!</p>} />
      <div className='bg-primary pt-4 pb-8'>
        <div className='container mx-auto px-8'>
          {links.map((link, index) => {
            return (
              <div className='py-4 text-lg sm:text-xl md:text-2xl lg:text-3xl' key={index}>
                {
                  link.link &&
                  (<a rel='noreferrer noopener' className='hover:underline break-all' href={link.link} target="_blank">
                    {link.linkText}
                  </a>)
                }
                {
                  link.text &&
                  (<p>{link.text}</p>)
                }
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
