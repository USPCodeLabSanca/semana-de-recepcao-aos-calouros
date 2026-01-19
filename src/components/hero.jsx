import React, { useEffect } from 'react';
import { useState } from 'react';

import Faixa1 from '../images/2026_calouros_faixa1.webp';
import Faixa2 from '../images/2026_calouros_faixa2.webp';
import Faixa3 from '../images/2026_calouros_faixa3.webp';
import Faixa4 from '../images/2026_calouros_faixa4.webp';
import Faixa5 from '../images/2026_calouros_faixa5.webp';
import Mobile1 from '../images/2026_calouros_mobile1.webp';
import Mobile2 from '../images/2026_calouros_mobile2.webp';
import Mobile3 from '../images/2026_calouros_mobile3.webp';
import Mobile4 from '../images/2026_calouros_mobile4.webp';
import Mobile5 from '../images/2026_calouros_mobile5.webp';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

/**
 *
 * @param {*} param0
 * @return {void}
 */
function Phrase({ text, color }) {
  return (
    <div className={`text-white text-base font-bold sm:text-lg md:text-xl lg:text-2xl py-10 px-10 md:px-24 text-center bg-${color} transition-all`} >
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

const CarouselImage = ({ src, alt }) => (
  <div className="select-none" style={{ userSelect: 'none' }}>
    <img
      src={src}
      alt={alt}
      onDragStart={(e) => e.preventDefault()}
      style={{ pointerEvents: 'none', width: '100%', height: 'auto' }}
    />
  </div>
);

/**
 * Hero
 *
 * @return {void}
 */
function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', '#1c93d2');
    document.documentElement.style.setProperty('--secondary', '#1879aa');
  }, []);
  const onChange = (index, item) => {
    setIndex(index);
    document.documentElement.style.setProperty('--primary', list[index].primary);
    document.documentElement.style.setProperty('--secondary', list[index].secondary);
  };
  const list = [
    {
      title: 'Você já notou como a inclusão é uma prioridade na USP? Essa abordagem fortalece o pertencimento e o acolhimento, criando um espaço onde todos os estudantes podem se sentir parte integrante da comunidade USP.',
      text: 'No ICMC, a diversidade é um valor inegociável. Temos, por exemplo, um grupo de apoio para estudantes LGBTQIA+!',
      primary: '#1c93d2',
      secondary: '#1879aa',
    },
    {
      title: 'Você sabe qual a importância das pesquisas acadêmicas? Com mais de 20% da produção científica do Brasil, a USP se destaca mundialmente, formando uma comunidade acadêmica que valoriza a excelência e a inovação em todos os seus projetos e práticas educacionais.',
      text: 'No ICMC, temos aproximadamente 450 publicações anuais, com apoio constante das agências de fomento (FAPESP, CNPq, CAPES, FINEP). Nesse <a href="https://www.icmc.usp.br/pesquisa/grupos" class="underline text-gray-200 hover:text-gray-300" target="_blank" rel="noopener noreferrer">link</a>, você pode conhecer todos os grupos de pesquisa do instituto.',
      primary: '#259063',
      secondary: '#1b704d',
    },
    {
      title: 'Você já conhece a história da USP? Aqui, cada canto da universidade reflete um legado de excelência, onde o conhecimento e a tradição se entrelaçam para formar uma comunidade engajada e inovadora.',
      text: 'O ICMC foi fundado em 1971, e desde então, tem se destacado como um dos principais centros de ensino e pesquisa em computação e matemática do Brasil!',
      primary: '#d61d4c',
      secondary: '#b01b40',
    },
    {
      title: 'Você já experimentou o bandejão? Os restaurantes universitários, conhecidos na USP como bandejões, estão disponíveis em todos os campi. A comunidade universitária paga apenas R$ 2,00 no almoço e no jantar, e R$ 0,50 no café da manhã.',
      text: 'Na USP São Carlos, temos 2 bandejões: um no campus 1 e outro no campus 2. Ambos oferecem refeições balanceadas e de qualidade. ',
      primary: '#fdc217',
      secondary: '#cf9f07',
    },
    {
      title: 'Você já descobriu qual é a sua atlética? Na USP, cada atlética é um espaço vibrante onde o esporte e a amizade se encontram com um único propósito: celebrar conquistas e cultivar laços duradouros.',
      text: 'Na USP São Carlos, possuímos uma única atlética, o Centro Acadêmico Armando Salles de Oliveira (CAASO), que organiza eventos esportivos e culturais para toda a comunidade. No ICMC, contamos com a Secretaria Acadêmica do ICMC (SACIM).',
      primary: '#e9581e',
      secondary: '#c94017',
    },
  ];
  return (
    <>
      <div>
        <div className="flex flex-col items-center min-h-screen bg-primary color-white pt-20 md:pt-16">
          <div className='top-20 left-0 w-full h-full select-none'>
            {/* DESKTOP */}
            <Carousel
              className='hidden md:block items-center'
              showArrows={false}
              onChange={onChange}
              infiniteLoop={true}
              transitionTime={500}
              showThumbs={false}
              showStatus={false}
              emulateTouch={true}
              swipeable={true}
              swipeScrollTolerance={50}
              preventMovementUntilSwipeScrollTolerance={true}
            >
              <div><CarouselImage src={Faixa1} alt='Banner 1' /></div>
              <div><CarouselImage src={Faixa2} alt='Banner 2' /></div>
              <div><CarouselImage src={Faixa3} alt='Banner 3' /></div>
              <div><CarouselImage src={Faixa4} alt='Banner 4' /></div>
              <div><CarouselImage src={Faixa5} alt='Banner 5' /></div>
            </Carousel>

            {/* MOBILE */}
            <Carousel
              className='md:hidden'
              onChange={onChange}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              transitionTime={500}
              swipeable={true}
              emulateTouch={true}
              swipeScrollTolerance={50}
              preventMovementUntilSwipeScrollTolerance={true}
            >
              <div><CarouselImage src={Mobile1} alt='Mobile 1' /></div>
              <div><CarouselImage src={Mobile2} alt='Mobile 2' /></div>
              <div><CarouselImage src={Mobile3} alt='Mobile 3' /></div>
              <div><CarouselImage src={Mobile4} alt='Mobile 4' /></div>
              <div><CarouselImage src={Mobile5} alt='Mobile 5' /></div>
            </Carousel>
          </div>
          <div className='h-40 flex flex-col justify-center items-center'>
            <h1 className='w-full text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center bg-primary p-10'>Bem-vindo ao ICMC!</h1>
          </div>
          <Phrase text={list[index].title} color='secondary' />
          <Phrase text={list[index].text} color='primary' />
        </div>
      </div >
    </>
  );
}

export default Hero;
