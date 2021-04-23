import React from 'react';

import Carousel from 'react-material-ui-carousel';
import ReactPlayer from 'react-player';

import SectionHeader from './section-header';

const highlights = [
  {
    link: 'https://youtu.be/WKKbMOXh1MY?t=322',
    title: 'Bem-vindx: Agora você é ICMC:',
    description: `
      Esta foi a primeira atividade da Semana de Recepção aos Calouros. “Vocês merecem muitos parabéns por essa
      conquista importante, e os parabéns são ainda mais merecidos quando a  gente considera como foi difícil esse ano
      em que vocês prestaram o exame de ingresso”, disse a professora Maria Cristina Ferreira de Oliveira, diretora do
      ICMC. O evento também contou com a participação da presidente da Comissão de Graduação do Instituto e da
      presidente da comissão que coordenou a programação da semana. Vale a pena ver o que essas mulheres disseram!
    `,
  },
  {
    link: 'https://youtu.be/mxyMpf8E90Q?t=666',
    title: 'Bate-papo com a jornalista Miriam Leitão:',
    description: `
      "Na juventude, você pode ter um momento em que pensa que não existe futuro. Especialmente nesse momento de
      distopia que vivemos, que até desmoraliza a distopia de tão ruim, vocês podem pensar: não vai dar! Mas eu quero
      que vocês não desistam do sonho de vocês. O futuro será melhor!”, disse a jornalista durante o bate-papo
      inspirador.
    `,
  },
  {
    link: 'https://youtu.be/5nO66YQXN04?t=436',
    title: 'Passeio virtual pelo ICMC e visita pelo Museu da Computação:',
    description: `
      Os dois eventos possibilitaram aos estudantes ter a experiência de caminhar pelos prédios do Instituto e ter um
      gostinho do que é estar presencialmente no ICMC. Entre as atrações, houve destaque para a Biblioteca Achille
      Bassi, o jardim secreto e as obras Teorema da Gaveta e a “Coisa”.
    `,
  },
  {
    link: 'https://youtu.be/wouS5mFf7qU?t=436',
    title: 'Tutoriais sobre as ferramentas mais importantes:',
    description: `
      Para diminuir as aflições sobre todas as plataformas que serão usadas pelos estudantes durante as aulas remotas,
      estudantes do grupo PET Computação gravaram vários tutoriais.
    `,
  },
  {
    link: 'https://youtu.be/ld4fE_DUCtw?t=791',
    title: 'Aulas introdutórias:',
    description: `
      Não deixe de assistir à aula introdutória de computação e de matemática, que mostraram aos calouros exemplos de
      como serão as aulas remotas na USP.
    `,
  },
  {
    link: 'https://youtu.be/LQUusz7iTR4?t=657',
    title: 'Palestra especial: mulheres, trajetórias e inspiração nas ciências exatas',
  },
  {
    link: 'https://youtu.be/rhiofHCxF2A?t=582',
    title: 'Bate-papo com ex-alunos Vida após a formatura',
  },
];

/**
 * Highlights
 *
 * @return {void}
 */
export default function Highlights() {
  return (
    <div>
      <SectionHeader title='Destaques da programação' subTitle='Confira os principais eventos realizados!' />
      <div className='bg-primary pb-8'>
        <div className='container mx-auto px-8'>
          <Carousel
            animation="slide"
            navButtonsAlwaysVisible="true"
            autoPlay={false}
          >
            {highlights.map((highlight, index) => {
              return (<div key={index} className='md:flex break-words transition-all bg-white shadow-md m-8 p-8'>
                <div className='md:w-1/2'>
                  {
                    highlight.link &&
                      <div className='container-16-9 inset-0'>
                        <ReactPlayer
                          className='absolute inset-0 h-full-important shadow'
                          width='100%'
                          url={highlight.link}
                        />
                      </div>
                  }
                </div>
                <div className='md:w-1/2 md:pl-8 pt-6 md:pt-0'>
                  {
                    highlight.title &&
                      <h1 className='text-lg lg:text-xl xl:text-2xl'>
                        {highlight.title}
                      </h1>
                  }
                  {
                    highlight.description && (<p className='text-xs lg:text-sm xl:text-base'>{highlight.description}</p>)
                  }
                </div>
              </div>);
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
