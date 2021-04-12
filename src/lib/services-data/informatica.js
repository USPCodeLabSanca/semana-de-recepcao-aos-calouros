import React from 'react';

export default {
  title: 'Informática',
  videoUrl: 'https://youtu.be/HTdka-yx6AY',
  faq: [
    {
      question: 'Como faço para criar minha senha única?',
      answer: <p>
        Acesse o endereço <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://id.usp.br'
          target="_blank"
        >https://id.usp.br</a>, clique em &quot;Primeiro Acesso&quot;, informe seu número USP, o e-mail alternativo e
        siga as instruções de validação para criar a sua senha única.
      </p>,
    },
    {
      question: 'Como faço para me conectar a rede wi-fi no ICMC?',
      answer: <p>
        Você deve se conectar a rede wi-fi que possui o SSID &quot;<b>eduroam</b>&quot;. Verifique se a configuração
        de Tipo de segurança está selecionada para &quot;<b>WPA2-Enterprise</b>&quot; e a criptografia em
        &quot;<b>AES</b>&quot;. O método de autenticação deve ser &quot;<b>PEAP</b>&quot; e a fase 2 como
        &quot;<b>MSCHAPv2</b>&quot;. O usuário é no formato &quot;<b>nº USP</b>&quot; + &quot;<b>@usp.br</b>&quot;
        (ex. 9999999@usp.br) e a senha é a <b>senha única</b> dos sistemas USP.
      </p>,
    },
    {
      question: `
        Onde posso obter mais informações a respeito dos laboratórios de graduação, como softwares e hardwares
        disponíveis?
      `,
      answer: <p>
        Consulte o &quot;Informativo sobre os laboratórios de graduação&quot; disponível no portal do ICMC, site STI,
        área de Serviços para a Graduação: <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/sti/servicos#graduacao'
          target="_blank"
        >https://www.icmc.usp.br/institucional/estrutura-administrativa/sti/servicos#graduacao</a>
      </p>,
    },
    {
      question: `
        Como posso obter acesso às licenças da Microsoft disponíveis no programa Azure Dev Tools for Teaching?
      `,
      answer: <>
        <p>
          Para acessar, você deve utilizar uma conta pessoal Microsoft e registrar-se no Azure Dev Tools for Teaching
          do ICMC. Caso não tenha uma conta Microsoft você deverá criá-la.
        </p>
        <p>
          Acesse o link e siga as instruções para se inscrever (no menu &quot;Enroll or Renew&quot; da página).
        </p>
        <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://aka.ms/devtoolsforteaching'
          target="_blank"
        >https://aka.ms/devtoolsforteaching</a>
        <p>
          Após o acesso utilizando a conta Microsoft, será solicitada a verificação acadêmica para validar sua
          inscrição. Neste passo você deve informar, obrigatoriamente, o seu e-mail do ICMC ou USP (somente alunos e
          docentes do ICMC). Sua conta deve ter o domínio @icmc.usp.br ou @usp.br.
        </p>
      </>,
    },
    {
      question: `Quais são as regras de uso dos Recursos Computacionais do ICMC/USP?`,
      answer: <p>
        Você pode consultar todas as normas de uso relacionadas aos recursos computacionais no endereço: <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/sti/normas-e-relatorios'
          target="_blank"
        >https://www.icmc.usp.br/institucional/estrutura-administrativa/sti/normas-e-relatorios</a>
      </p>,
    },
    {
      question: `Como faço para utilizar a impressora da graduação?`,
      answer: <p>
        Os alunos da graduação possuem uma cota semestral de impressão de 100 páginas. A impressão é realizada
        através do sistema de impressão na nuvem. Para imprimir algo, basta acessar o serviço disponível em <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://printer.icmc.usp.br'
          target="_blank"
        >https://printer.icmc.usp.br</a>, utilizando seus dados da autenticação unificada e submeter os arquivos
        desejados, lembrando que os mesmos devem estar em formato PDF.
      </p>,
    },
    {
      question: `Como converto arquivos de outros formatos para PDF?`,
      answer: <p>
        Alguns programas já permitem o salvamento de arquivos diretamente no formato PDF, mas caso precise converter
        um arquivo já criado, você deve enviá-lo para uma impressora virtual, como por exemplo, a &quot;Microsoft
        Print to PDF&quot;, que irá gerar um PDF do arquivo que você deseja converter.
      </p>,
    },
    {
      question: `O que é o Programa Pró-Aluno do ICMC?`,
      answer: <p>
        O Programa Pró-Aluno foi criado para possibilitar o contato dos alunos de graduação da Universidade de São
        Paulo com a informática, de forma a complementar sua formação e melhor prepará-los para o mercado de
        trabalho. Ele consiste em horários de monitoria disponíveis aos graduandos que desejarem tirar dúvidas a
        respeito dos softwares e sistemas computacionais da USP utilizados na graduação.
      </p>,
    },
    {
      question: `Posso participar do Programa Pró-Aluno do ICMC?`,
      answer: <p>
        A divulgação do edital para novas bolsas do Programa Pró-Aluno é realizada através dos canais oficiais de
        comunicação do ICMC e da página da STI na área de Serviços para a Graduação: <a
          rel='noreferrer noopener'
          className='hover:underline break-all'
          href='https://www.icmc.usp.br/institucional/estrutura-administrativa/sti/servicos#graduacao'
          target="_blank"
        >https://www.icmc.usp.br/institucional/estrutura-administrativa/sti/servicos#graduacao</a>
      </p>,
    },
    {
      question: `Como faço para solicitar um atendimento na Seção Técnica de Informática?`,
      answer: <p>
        Envie um e-mail para <a
          className='hover:underline break-all'
          href='mailto:atendimento@icmc.usp.br'
        >atendimento@icmc.usp.br</a>. Procure ser claro no título do e-mail destacando o problema e forneça o máximo
        de informações possível no corpo da mensagem, preferencialmente indicando seu nome completo, número USP,
        número de patrimônio e a localização do equipamento (número da sala), sempre que possível.
      </p>,
    },
  ],
};
