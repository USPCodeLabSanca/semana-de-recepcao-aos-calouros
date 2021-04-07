import React from 'react';

import SectionHeader from '../components/section-header';
import Footer from '../components/footer';

const serviceChannels = [
  {
    title: 'Guarda Universitária',
    description: '(16) 3373-6666, 3373-9112 e 3373 9889',
    info: 'Atendimento 24 horas para registrar ocorrências de segurança no Campus.',
  },
  {
    title: 'Disque-trote',
    description: '0800-0121090',
    info: 'Atendimento de segunda a sexta-feira, das 9 às 21 horas.',
  },
  {
    title: 'E-mail',
    description: 'disquetrote@usp.br',
  },
  {
    title: 'Aplicativo Disque-Trote USP',
    description: 'Versão android e Versão IOS',
  },
  {
    title: 'Código de Ética',
    description: `
      Confira o texto do Código de Ética da Universidade de São Paulo, aprovado
      de acordo com a Resolução n. 4871 de 22 de outubro de 2001. Fique atento
      aos itens relacionados ao corpo discente e demais alunos da Universidade.
      O artigo 21, por exemplo, trata de princípios importantes para o novo aluno:
    `,
  },
];

const Attendance = ({title, description, info}) => <>
  <h3 className='text-sm md:text-base lg:text-lg font-bold pt-8'>
    {title}
  </h3>
  <p className='text-xs md:text-sm lg:text-base'>
    {description}
  </p>
  { info &&
    <p className='text-xs md:text-sm lg:text-base'>
      {info}
    </p>
  }
</>;

/**
 * Disque Trote Page
 *
 * @return {void}
 */
export default function DisqueTrote() {
  return (<main className='bg-primary pt-20'>
    <SectionHeader title='Disque-Trote' />
    <div className='container mx-auto mb-6 p-8 bg-white color-black shadow-md'>
      <h1 className='text-xl md:text-2xl lg:text-4xl font-bold pb-4'>O trote é proibido na USP!</h1>
      <p className='text-base md:text-lg lg:text-xl pb-8'>
        O calouro da USP pode contar com dois canais de atendimento para enviar
        denúncias de trotes abusivos que ocorram nos campi da USP. O trote pode
        ser qualquer tipo de manifestação estudantil que cause, a quem quer que
        seja, agressão física, moral ou outras formas de constrangimento, dentro
        ou fora do âmbito da Universidade. Em caso de dúvida, ligue para o
        disque-trote ou acesse o chat de atendimento.
      </p>
      <h2 className='text-lg md:text-xl lg:text-2xl font-bold'>Canais de atendimento ao calouro:</h2>

      {
        serviceChannels.map((serviceChannel, index) => {
          return (<Attendance
            key={index}
            title={serviceChannel.title}
            description={serviceChannel.description}
            info={serviceChannel.info}
          />);
        })
      }

      <p className='text-base md:text-lg lg:text-xl font-bold pt-8'>
        “As relações entre os membros do corpo discente e demais alunos da
        Universidade devem ser presididas pelo respeito à autonomia e à dignidade
        do ser humano, não sendo tolerados atos ou manifestações de prepotência
        ou violência ou que ponham em risco a integridade física e moral de outros.”
      </p>
    </div>
    <Footer />
  </main>);
}
