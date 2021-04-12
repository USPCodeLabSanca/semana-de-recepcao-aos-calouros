import React from 'react';

export default {
  title: 'Apoio Psicológico',
  videoUrl: 'https://youtu.be/EnJO1PIoTbw',
  faq: [
    {
      question: 'O que é o GAPsi?',
      answer: <p>
        É o Grupo de Apoio Psicopedagógico criado em 2018 pelo ICMC. A vida universitária apresenta muitos desafios e
        mudanças, e o grupo foi pensado para apoiar os alunos nessa transição. Assim, o GAPsi recebe, acolhe e
        acompanha os estudantes no seu ingresso, colaborando com a sua adaptação, convivência e integração no espaço
        universitário. Nos casos necessários, realiza o encaminhamento de estudantes que necessitam de um
        atendimento. O objetivo do GAPsi é desenvolver atividades preventivas de caráter psicopedagógico que promovam
        a saúde e o bem-estar psicológico dos estudantes, de modo a melhorar a saúde mental e, consequentemente,
        melhorar o processo de ensino-aprendizado dos estudantes.
      </p>,
    },
    {
      question: 'Quem faz parte do GAPsi?',
      answer: <p>
        A equipe é formada por docentes do ICMC, técnica-administrativoa do ICMC, assistentes sociais da PUSP,
        estagiáries em psicologia, representantes discentes da graduação e da pós do ICMC e por uma professora
        supervisora externa da psicologia.
      </p>,
    },
    {
      question: 'Quais serviços são oferecidos pelo GAPsi?',
      answer: <>
        <ul className="list-disc ml-6">
          <li>
            Acolhimentos individuais;
          </li>
          <li>
            Grupos operativos;
          </li>
          <li>
            Grupos de formação de vínculos;
          </li>
          <li>
            Mediação de conflitos;
          </li>
          <li>
            Palestras, oficinas, rodas de conversa, entre outros;
          </li>
          <li>
            Assessoria ou assistência a chefes de departamento, coordenadores de curso e demais professores ou
            técnicos que sintam a necessidade de acompanhamento de casos específicos relacionados a sofrimento
            psíquico;
          </li>
          <li>
            Articulação com as Redes de Atenção de Psicossocial (RAPS) local e de outros municípios;
          </li>
          <li>
            Esclarecimentos e encaminhamentos em casos de sofrimento psíquico que não dizem respeito ao contexto
            universitário;
          </li>
          <li>
            Produção de material psicoeducativo e informativo;
          </li>
          <li>
            Acompanhamento sob demanda a pessoas ou grupos que necessitem de estratégias diversas às listadas.
          </li>
        </ul>
      </>,
    },
    {
      question: 'Qual o público atendido pelo serviço?',
      answer: <p>
        Alunos da graduação, pós-graduação, técnicos e professores da comunidade do ICMC.
      </p>,
    },
    {
      question: 'O que é o acolhimento?',
      answer: <>
        <p>
          A palavra acolhimento está relacionada com o ato ou efeito de acolher, oferecer atenção e consideração. No
          GAPsi, acolher significa receber as pessoas que procuram o serviço com disponibilidade para escutar,
          promovendo condições para que seu sofrimento possa ser expresso.
        </p>
        <p>
          O acolhimento psicológico é um tipo de intervenção psicológica que atende a pessoa no exato momento de sua
          urgência, compreendendo seu sofrimento e ajudando-a a lidar com seus recursos e limites.
        </p>
      </>,
    },
    {
      question: 'Quando devo procurar o acolhimento?',
      answer: <>
        <p>
          A pessoa que procura o acolhimento está aflita, angustiada em função de alguma perda, escolhas que tem que
          fazer, dificuldades amorosas, angústias existenciais, tristeza, ansiedade.
        </p>
        <p>
          Exemplos de urgências para buscar o GAPsi:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Dificuldade de adaptação ao ambiente acadêmico
          </li>
          <li>
            Sentimento de não pertencimento ao meio universitário
          </li>
          <li>
            Situação imediata de desespero
          </li>
          <li>
            Risco de agressão contra si mesmo (ideias suicidas / ideias de morte, tentativa de suicídio, automutilação)
          </li>
          <li>
            Risco de agressão contra outros (desejo ou tentativa de homicídio ou outros atos violentos que configurem agressões de ordem física, sexual ou psicológica)
          </li>
          <li>
            Referir perda do controle de seus atos e de sua autonomia
          </li>
          <li>
            Confusão mental
          </li>
          <li>
            Surto psicótico, presença de alucinações (auditivas, visuais, táteis), delírio
          </li>
          <li>
            Crise – tristeza intensa, medo intenso, choro intenso, ansiedade intensa, desmotivação intensa
          </li>
        </ul>
      </>,
    },
    {
      question: 'Como faço para agendar um acolhimento?',
      answer: <>
        <p>
          Para fazer o agendamento, você pode consultar em nosso site os horários disponíveis na aba Nossos
          Acolhimentos, e solicitar o agendamento através do email: <a
            className='hover:underline break-all'
            href='mailto:gapsi@icmc.usp.br'
          >gapsi@icmc.usp.br</a>.
        </p>
      </>,
    },
    {
      question: 'Quais as redes sociais do GAPsi?',
      answer: <p>
        As nossas redes sociais são facebook: @gapsi.icmc e instagram: @gapsi_icmc.
      </p>,
    },
    {
      question: 'Preciso apresentar algum documento para realizar o acolhimento?',
      answer: <p>
        Não, nenhum documento precisa ser apresentado para o agendamento do acolhimento.
      </p>,
    },
    {
      question: 'Como funcionam os acolhimentos?',
      answer: <>
        <p>
          Os acolhimentos tem a duração de 50 minutos, e a frequência dos atendimentos dependem da demanda do usuário
          do serviço e acordo com o estagiário, podendo ser realizados semanalmente, quinzenalmente e até
          mensalmente.
        </p>
        <p>
          No <b>formato presencial</b>, os acolhimentos ocorrem na Sala 4-008 (ICMC), já <b>no formato
          online/remoto</b>, os encontros são realizados pelas plataformas do Google Meet, Hangouts e Skype.
        </p>
      </>,
    },
    {
      question: 'Quem faz o acolhimento?',
      answer: <p>
        Os acolhimentos são realizados por estagiários em psicologia da UFSCar supervisionados por um docente da
        UFSCar.
      </p>,
    },
    {
      question: 'Tenho que pagar algo pelo serviço?',
      answer: <p>
        Os serviços são gratuitos.
      </p>,
    },
    {
      question: 'Não tenho vínculo com a faculdade. Posso usar o serviço do GAPsi?',
      answer: <p>
        Infelizmente não. Mas você pode mandar um e-mail para nós explicando a situação que auxiliamos explicando
        onde você pode encontrar ajuda dependendo do caso.
      </p>,
    },
  ],
};
