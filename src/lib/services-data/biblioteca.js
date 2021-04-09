import React from 'react';

export default {
  title: 'Biblioteca',
  videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
  faq: [
    {
      question: 'Como faço minha inscrição na Biblioteca?',
      answer: <p>
        Podem cadastrar-se junto à Biblioteca para utilização de seus recursos e serviços os docentes, docentes visitantes e
        funcionários da unidade, os alunos de graduação, pós-graduação e visitantes e os docentes de outras instituições de
        ensino superior. Os alunos são automaticamente inscritos nas Bibliotecas da USP no ato da matrícula. Eles são
        identificados pelo cartão USP, carteirinha Digital USP (e-card) que deve ser utilizado para empréstimos, reservas,
        renovações e demais serviços das Bibliotecas.
      </p>,
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
          ou o <a
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
        <div className='w-full overflow-x-auto'>
          <table className='my-4'>
            <thead>
              <tr>
                <th className='border p-4'>Categoria de usuário</th>
                <th className='border p-4'>Limite de empréstimos</th>
                <th className='border p-4'>Prazo (dias consecutivos)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border p-4'>Aluno de graduação, incluído  especial e intercâmbio</td>
                <td className='border p-4'>10 itens</td>
                <td className='border p-4'>10 dias</td>
              </tr>
              <tr>
                <td className='border p-4'>Aluno de especialização</td>
                <td className='border p-4'>15 itens</td>
                <td className='border p-4'>20 dias</td>
              </tr>
              <tr>
                <td className='border p-4'>Aluno de pós-graduação</td>
                <td className='border p-4'>15 itens</td>
                <td className='border p-4'>20 dias</td>
              </tr>
              <tr>
                <td className='border p-4'>Pós-doutorado</td>
                <td className='border p-4'>15 itens</td>
                <td className='border p-4'>20 dias</td>
              </tr>
              <tr>
                <td className='border p-4'>Docente</td>
                <td className='border p-4'>20 itens</td>
                <td className='border p-4'>30 dias</td>
              </tr>
              <tr>
                <td className='border p-4'>Docente aposentado (em atividades na USP)</td>
                <td className='border p-4'>20 itens</td>
                <td className='border p-4'>30 dias</td>
              </tr>
              <tr>
                <td className='border p-4'>Funcionário</td>
                <td className='border p-4'>10 itens</td>
                <td className='border p-4'>10 dias</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>,
    },
    {
      question: 'Como efetuar as devoluções dos livros e o que acontece se houver atraso na devolução?',
      answer: <>
        <p>
          A devolução do material emprestado pode ser feita diretamente no balcão de empréstimo ou através
          da Caixa de Devolução 24h, disponível na entrada principal da Biblioteca.
        </p>
        <h1 className='py-4'><b>Penalidade por Atraso</b></h1>
        <p>
          Aplica-se um dia de suspensão ao serviço de empréstimo domiciliar para cada dia de atraso na
          devolução do material, por item atrasado. A pena de suspensão impede o usuário de realizar novo
          empréstimo de material nas Bibliotecas da USP. Os livros de consulta devolvidos após o prazo
          determinado acarretam a suspensão de empréstimos domiciliares por 03 meses.
        </p>
      </>,
    },
    {
      question: 'Posso solicitar livros de outras Bibliotecas fora do campus USP São Carlos?',
      answer: <p>
        Sim. Você pode solicitar o Empréstimo entre Bibliotecas (EEB). Esse serviço possibilita o
        empréstimo de materiais pertencentes ao acervo de uma das 48 Bibliotecas dos outros campi da USP,
        assim como de outras instituições de ensino superior que mantemos cooperação, como UNICAMP e UNESP.
        As solicitações de EEB são efetuadas através de formulário próprio, acessando o programa SisWEEB,
        disponível em: <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='http://www.iqsc.usp.br/eeb/index.php'
          target="_blank"
        >http://www.iqsc.usp.br/eeb/index.php</a>.
      </p>,
    },
    {
      question: 'Como proceder para solicitação de artigos?',
      answer: <p>
        O serviço de solicitação de artigos localiza o documento desejado, físico ou digital, nas Bibliotecas
        da USP, em outras instituições nacionais ou internacionais. Os documentos pertencentes a instituições
        nacionais são obtidos através do Programa de Comutação Bibliográfica do IBICT (COMUT), e os documentos
        internacionais através de busca monitorada no exterior. Para as solicitações de artigos utilize o
        formulário específico disponível em: <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='http://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca/servicos'
          target="_blank"
        >http://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca/servicos</a>. Este serviço é pago,
        <b>exceto para solicitações de documentos pertencentes às Bibliotecas da USP</b>. Consulte os valores na
        Seção de Atendimento ao Usuário, no térreo da Biblioteca ou também pelo e-mail biblio@icmc.usp.br.
      </p>,
    },
    {
      question: 'A Biblioteca oferece capacitação aos usuários?',
      answer: <p>
        Sim. A Biblioteca oferece treinamentos para uso dos catálogos e do acervo, e-books, e-journals, acesso às
        bases de dados, palestras e workshops sobre metodologia do trabalho científico, normalização, escrita
        científica, criação e manutenção de identificadores digitais de autor, entre outros temas. Envie sua
        demanda/necessidade para o e-mail <a
          className='hover:underline break-all'
          href='mailto:biblio@icmc.usp.br'
        >biblio@icmc.usp.br</a> e ofereceremos o treinamento que você precisa.
      </p>,
    },
    {
      question: `
        Durante a pandemia, existem recursos on-line disponíveis, uma vez que o acesso à Biblioteca está suspenso?
      `,
      answer: <>
        <p>
          Sim. A Biblioteca disponibiliza alguns recursos on-line durante a pandemia:
        </p>
        <p>
          <b>Serviço de VPN</b> (Virtual Private Network ou Rede Privada Virtual): Acesse: <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://servicos.sti.usp.br/en/vpn/'
            target="_blank"
          >https://servicos.sti.usp.br/en/vpn/</a>
        </p>
        <p>
          <b>Biblioteca Virtual da Pearson</b>: Acesso em: <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://plataforma.bvirtual.com.br'
            target="_blank"
          >https://plataforma.bvirtual.com.br</a>. Solicitar login e senha à Biblioteca via e-mail <a
            className='hover:underline break-all'
            href='mailto:biblio@icmc.usp.br'
          >biblio@icmc.usp.br</a>
        </p>
        <p>
          <b>Minha Biblioteca</b>. Plataforma de e-Books que oferece acesso a milhares de livros eletrônicos das
          principais editoras do país. É possível encontrar e acessar alguns títulos que constam da bibliografia
          básica de disciplinas da área de Exatas. Acesse o vídeo instrucional <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://www.youtube.com/watch?v=A0gU_476OsA'
            target="_blank"
          >https://www.youtube.com/watch?v=A0gU_476OsA</a>
        </p>
        <p>
          <b>E-books Springer</b>: Lista dos títulos disponível em: <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://www.springernature.com/gp/librarians/news-events/all-news-articles/industry-news-initiatives/free-access-to-textbooks-for-institutions-affected-by-coronaviru/17855960'
            target="_blank"
          >https://www.springernature.com/gp/librarians/news-events/all-news-articles/industry-news-initiatives/free-access-to-textbooks-for-institutions-affected-by-coronaviru/17855960</a>.
        </p>
        <p>
          <b>E-books Elsevier</b>: 256 títulos de livros-texto de várias áreas do conhecimento. Acesso via site <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://www.sciencedirect.com/'
            target="_blank"
          >https://www.sciencedirect.com/</a> e é necessário estar conectado em um IP USP.
        </p>
        <p>
          <b>Harvard Business Publishing</b>: disponibiliza acesso livre e ilimitado à coleção de e-books da Harvard
          Business Review. É necessário estar conectado a um IP USP. Link: <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='bit.ly/usp-hbr'
            target="_blank"
          >bit.ly/usp-hbr</a>
        </p>
        <p>
          <b>JoVE</b> - Journal of Visual Experimentation: <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://www.jove.com/coronavirusresource'
            target="_blank"
          >https://www.jove.com/coronavirusresource</a>.
        </p>
        <p>
          Acesso liberado por meio de IP USP.
        </p>
        <p>
          Mais informações acesse a home page da biblioteca: <a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca'
            target="_blank"
          >https://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca</a>
        </p>
      </>,
    },
    {
      question: 'Qual o horário de funcionamento da Biblioteca?',
      answer: <>
        <p>
          Período letivo:
        </p>
        <p>
          2ª a 6ª feira: 8h às 21h30
        </p>
        <p>
          Período de férias:
        </p>
        <p>
          2ª a 6ª feira: 8h às 18h
        </p>
        <p>
          Sábados: 9h às 12h
        </p>
        <p>
          Canais de comunicação:
        </p>
        <p>
          - e-mail: <b><a
            className='hover:underline break-all'
            href='mailto:biblio@icmc.usp.br'
          >biblio@icmc.usp.br</a></b>
        </p>
        <p>
          - skype: <b>biblio_icmc</b>
        </p>
        <p>
          - atendimento online: <b><a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='http://biblioteca.icmc.usp.br/livechat/'
            target="_blank"
          >http://biblioteca.icmc.usp.br/livechat/</a></b>
        </p>
        <p>
          - whatsApp: +55 16 3373-9637
        </p>
      </>,
    },
    {
      question: 'A Biblioteca dispõe de aplicativo móvel para acesso ao acervo?',
      answer: <p>
        Sim. É o aplicativo “Bibliotecas USP”, gratuito, para Android e IOS, e pode ser obtido no seu app store. Com
        ele é possível pesquisar nas 48 Bibliotecas da USP, buscar os materiais que precisa em todos os acervos da
        USP ao mesmo tempo e verificar se estão disponíveis naquele momento. É possível reservar os materiais
        desejados, renovar os que já estão com você e ver o seu  seu histórico de empréstimos. Também é possível
        localizar no mapa as Bibliotecas da USP, checar horários de funcionamento  e contatos. A sua conta criada no
        app utiliza a sua senha única da USP.
      </p>,
    },
    {
      question: 'Quais outros serviços que a Biblioteca oferece?',
      answer: <>
        <p>A Biblioteca também oferece:</p>
        <p>Orientações gerais sobre levantamento bibliográfico e revisão de literatura;</p>
        <p>Orientações sobre plágio e uso da ferramenta Turnitin;</p>
        <p><a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca/servicos#r6'
          target="_blank"
        >Normalização de documentos</a> e trabalhos acadêmicos;</p>
        <p><a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca/servicos#r4'
          target="_blank"
        >Elaboração de ficha catalográfica</a>;</p>
        <p><a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca/servicos#r5'
          target="_blank"
        >Cadastramento da produção científica</a> e levantamento de indicadores de produção;</p>
        <p>Orientações sobre ISBN, DOI e outras questões relacionadas à produção de publicações;</p>
        <p>Disponibiliza link para <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/biblioteca/servicos#r7'
          target="_blank"
        >Sugestões de livros</a> novos.</p>
      </>,
    },
  ],
};
