import React from 'react';

import ReactPlayer from 'react-player';
import {useHistory} from 'react-router-dom';

import SectionHeader from '../components/section-header';
// import Faq from '../components/faq';
import Footer from '../components/footer';

const services = {
  'servico-de-graduacao': {
    title: 'Serviço de Graduação',
    videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
    faq: [
      {
        question: 'O que é número USP? Como eu sei o meu?',
        answer: `
          É a sua identificação na USP, você vai precisar dele no atendimento de qualquer setor da USP. Você receberá um e-mail informando o seu número USP. Caso não encontre o e-mail, entre em contato com o Serviço de Graduação (grad@icmc.usp.br) e informe seu nome completo e RG.
        `,
      },
      {
        question: 'O que é senha única e como faço a minha?',
        answer: `
          A senha única te dá acesso a vários sistemas da USP. Primeiramente você terá acesso ao sistema da Graduação e ao longo da sua vida acadêmica, poderá acessar outros sistemas.
          Acesse o endereço http://id.usp.br, em "Primeiro Acesso", informe seu Número USP (você vai receber um e-mail com essa informação), o e-mail alternativo e siga os passos de validação para criar sua senha única.
          Se preferir, assista o vídeo "informações senha única e e-mail USP no link: https://www.youtube.com/watch?v=Izv-qS1cQbs3 - Como faço para ter meu e-mail USP?
          Antes de fazer o e-mail USP, você precisa criar a senha única, conforme explicado na pergunta 2.
          Após, entre novamente em http://id.usp.br utilize o botão "Autenticar" com sua senha única para criar seu e-mail @usp.br.Após a criação do e-mail institucional, o acesso deve ser realizado por meio do endereço http://email.usp.br
          Se preferir, assista o vídeo "informações senha única e e-mail USP no link: https://www.youtube.com/watch?v=Izv-qS1cQbs
        `,
      },
      {
        question: 'Como eu acesso o sistema da Graduação?',
        answer: `
          Após realizar o cadastro da senha única (explicado na pergunta 2), você poderá acessar o sistema da graduação, informando o seu número USP e sua senha única. Nesse sistema, você pode consultar sua grade horária, emitir atestados autenticados e seu histórico escolar, fazer sua matrícula, entre outras funções que você vai conhecer durante o semestre.
        `,
      },
      {
        question: 'O que é cartão USP? Como eu tenho o meu?',
        answer: `
          É sua carteira de identificação na USP.
          No vídeo https://www.youtube.com/watch?v=D0rM7BjxdeE há o passo a passo para solicitar o seu cartão USP.
          Enquanto você não tem seu cartão USP, você também pode usar o aplicativo e-card USP: O aplicativo está disponível nas lojas Apple e Google Play e poderá ser acessado por meio da senha única do usuário USP. Assim como a carteirinha física, o e-Card USP é pessoal e intransferível.
          Os alunos ingressantes terão acesso ao e-Card USP no momento que receberem seu número institucional, sem a necessidade de aguardarem pela confecção das carteirinhas físicas. Outra vantagem do aplicativo é que a atualização dos dados será automática.
        `,
      },
      {
        question: 'Como sei quais as disciplinas que vou cursar?',
        answer: `
          Você consulta a opção Grade Horária no sistema da Graduação. Lá vai aparecer as turmas das disciplinas que você está matriculado neste semestre.
          Atenção: No primeiro semestre, a equipe do Serviço de Graduação vai inserir as disciplinas, mas nos próximos é você que vai escolher as turmas que irá cursar. Mas  na época da matrícula, o Serviço de Graduação vai passar as instruções.
        `,
      },
      {
        question: 'Onde serão minhas aulas?',
        answer: `
          O Serviço de Graduação vai deixar disponível na página da Graduação em Horários como assistir suas aulas.  Pode ser conferido no link: https://www.icmc.usp.br/graduacao/informacoes-gerais-e-servicos/horarios-de-aulas
        `,
      },
      {
        question: 'Como posso ter um atestado de matrícula?',
        answer: `
          Você acessa o sistema da Graduação, vai em Emissão de Documentos e seleciona o documento que precisa.
          Há o vídeo "Emissão de Documentos", que explica o passo a passo: https://www.youtube.com/watch?v=mFJa2wUj7I4
          Caso não encontre o documento que precisa, pode entrar em contato com o Serviço de Graduação (grad@icmc.usp.br).
        `,
      },
      {
        question: 'Já fiz disciplinas em um curso anterior, como faço para conseguir equivalências? Posso adaptar minha grade?',
        answer: `
          Você pode conversar com o coordenador do seu curso para adaptar sua grade, levando em conta as disciplinas que já cursou. O Serviço de Graduação encaminhará um e-mail com as instruções e os formulários de equivalência e de readequação da grade.
        `,
      },
    ],
  },
  'biblioteca': {
    title: 'Biblioteca',
    videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
    faq: [
      {
        question: 'Como faço minha inscrição na Biblioteca?',
        answer: `
          Podem cadastrar-se junto à Biblioteca para utilização de seus recursos e serviços os docentes, docentes visitantes e funcionários da unidade, os alunos de graduação, pós-graduação e visitantes e os docentes de outras instituições de ensino superior. Os alunos são automaticamente inscritos nas Bibliotecas da USP no ato da matrícula. Eles são identificados pelo cartão USP, carteirinha Digital USP (e-card) que deve ser utilizado para empréstimos, reservas, renovações e demais serviços das Bibliotecas.
        `,
      },
      {
        question: 'Como funciona o sistema de empréstimos, renovações e reservas e qual o prazo de empréstimo?',
        answer: <>
          <p>
            O sistema de empréstimo é unificado permitindo que você empreste livros e outros materiais em todas as
            Bibliotecas da Universidade mediante a apresentação do cartão USP, carteirinha Digital USP (e-Card USP)
            ou um documento com foto. Consulte a <a
              rel='noreferrer noopener'
              className='hover:underline break-all'
              href='http://www.leginf.usp.br/?portaria=portaria-gr-no-6915-de-28-de-junho-de-2017'
              target="_blank"
            >Portaria GR-6915</a> para saber mais sobre o Empréstimo Unificado. O
            acervo disponível em todas as bibliotecas das USP pode ser consultado utilizando os buscadores  <a
              rel='noreferrer noopener'
              className='hover:underline break-all'
              href='http://dedalus.usp.br/F?RN=454054470'
              target="_blank"
            >Dedalus</a>
            ou o  <a
              rel='noreferrer noopener'
              className='hover:underline break-all'
              href='http://www.buscaintegrada.usp.br/'
              target="_blank"
            >Portal de Busca Integrada</a>.
          </p>
          <h1 className='py-4'><b>Pandemia: Empréstimos por agendamento</b></h1>
          <p>
            O empréstimo de materiais com agendamento é um serviço específico e temporário, oferecido em caráter
            emergencial neste momento de pandemia e, por isso, com novas regras e procedimentos. O acervo
            permanece fechado ao público, a consulta aos catálogos é feita exclusivamente pela internet, as
            solicitações de livros e teses devem ser enviadas para o e-mail <b>biblio@icmc.usp.br</b>, com o nome
            completo do usuário, e-mail, número USP, e os títulos desejados. A equipe da Biblioteca confirma
            por e-mail a disponibilidade do material e informa data e hora agendadas para retirada. Dúvidas
            durante esse processo e próximas à data e hora agendadas devem ser resolvidas por WhatsApp, por
            ser um canal mais ágil.
          </p>
          <h1 className='py-4'><b>Renovações e reservas</b></h1>
          <p>
            As renovações e reservas podem ser efetuadas no balcão de atendimento ou on-line. São permitidas 03
            renovações seguidas, desde que não haja reserva para o material. O usuário também poderá efetuar um
            total de 03 reservas simultaneamente para materiais distintos.
          </p>
          <h1 className='py-4'><b>Prazo de empréstimo</b></h1>
          <p>
            O tempo que o material pode ficar emprestado e a quantidade de itens que podem ser emprestados por
            vez variam de acordo com a categoria do usuário e com o tipo de documento, conforme a tabela abaixo:
          </p>
        </>,
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'assistencia-social': {
    title: 'Assistência Social',
    videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'informatica': {
    title: 'Informática',
    videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'comunicacao': {
    title: 'Comunicação',
    videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
  'apoio-psicologico': {
    title: 'Apoio Psicológico',
    videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
    faq: [
      {
        question: 'Pergunta 1',
        answer: 'Resposta 1',
      },
      {
        question: 'Pergunta 2',
        answer: 'Resposta 2',
      },
      {
        question: 'Pergunta 3',
        answer: 'Resposta 3',
      },
    ],
  },
};

/**
 * Servicos Page
 *
 * @param {object} props
 *
 * @return {object}
 */
export default function Servicos({match: {params: {service}}}) {
  const history = useHistory();

  if (!Object.keys(services).includes(service)) {
    history.push('/');
  }

  return (<main className='bg-primary pt-20'>
    <SectionHeader title={services[service].title} />
    <div className='container mx-auto mb-6 p-8 bg-white color-black shadow-md'>
      <div className='container-16-9 inset-0'>
        <ReactPlayer
          className='absolute inset-0 h-full-important shadow'
          width='100%'
          url={services[service].videoUrl}
        />
      </div>
      {/* <div className='pt-8'>
        <Faq items={services[service].faq}></Faq>
      </div> */}
    </div>
    <Footer />
  </main>);
}
