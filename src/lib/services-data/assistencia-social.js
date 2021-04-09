import React from 'react';

export default {
  title: 'Assistência Social',
  videoUrl: 'https://www.youtube.com/watch?v=eG2VCdJH5Wc',
  text: <p>
    Antes de mais nada, leia atentamente o EDITAL PAPFE INGRESSANTES 2021 que dispõe sobre as normas do Programa de
    Apoio à Permanência e Formação Estudantil, destinado aos ingressantes na Universidade de São Paulo no ano de 2021
    (<a
      rel='noreferrer noopener'
      className='hover:underline break-all'
      href='https://sites.usp.br/sas/wp-content/uploads/sites/265/2021/03/2021_03_26_Edital-PAPFE-INGRESSANTES-2021-site.pdf'
      target="_blank"
    >https://sites.usp.br/sas/wp-content/uploads/sites/265/2021/03/2021_03_26_Edital-PAPFE-INGRESSANTES-2021-site.pdf</a>)
  </p>,
  faq: [
    {
      question: 'Quem pode se inscrever nos benefícios do PAPFE?',
      answer: <>
        <p>
          Alunos regularmente matriculados em cursos de Graduação da USP, ingressantes em 2021, que estejam cursando
          a primeira graduação, inclusive os estudantes intercambistas (não são aceitas inscrições de alunos já
          graduados – bacharelado, licenciatura ou tecnólogo).
        </p>
        <p>
          Alunos ingressantes via intercâmbio (PEC G) devem entrar em contato com e-mail papfe@usp.br (informar nome
          completo e nº USP).
        </p>
        <p>
          Período de inscrição dos alunos ingressantes:
        </p>
        <p>
          Ingressantes FUVEST: de 29/03 a 14/04/2021
        </p>
        <p>
          Ingressantes SiSU: de 15/04 a 21/05/2021
        </p>
      </>,
    },
    {
      question: 'Sou veterano na USP, posso me inscrever agora?',
      answer: <p>
        Não, a inscrição para alunos veteranos encerrou-se em 11/02/2021.
      </p>,
    },
    {
      question: 'O que é o questionário de avaliação socioeconômica (SASe)?',
      answer: <p>
        Para a inscrição no PAPFE 2021, o candidato deverá preencher o questionário eletrônico de avaliação
        socioeconômica (SASe), no qual deve registrar as informações que correspondam fielmente à sua atual situação
        socioeconômica, assim como a de sua família. O candidato é integralmente responsável pela veracidade da
        informação fornecida.
      </p>,
    },
    {
      question: 'Quais os benefícios que posso concorrer?',
      answer: <>
        <p>
          Os benefícios que compõem o PAPFE e disponível no campus São Carlos são:
        </p>
        <ul className="list-disc ml-6">
          <li>
            Vaga em moradia estudantil (Apoio Moradia)
          </li>
          <li>
            Auxílio Moradia/Financeiro
          </li>
          <li>
            Auxílio Alimentação
          </li>
          <li>
            Auxílio-Livros
          </li>
          <li>
            Auxílio Transporte
          </li>
        </ul>
        <p>
          Não é permitido acumular os benefícios de Auxílio Financeiro e Auxílio Transporte; assim como não é
          permitido aos alunos que residem ou estejam hospedados em vagas nas moradias estudantis serem
          contemplados com a concessão de Auxílio Financeiro ou Auxílio Transporte.
        </p>
        <p>
          Obs. Nos campi onde há moradia estudantil os alunos se inscrevem em apoio moradia e o aluno declara a
          preferência por vaga ou pelo auxílio financeiro.
        </p>
        <p>
          Não há inscrição em auxílio moradia/financeiro diretamente.
        </p>
      </>,
    },
    {
      question: 'Forma/Caminho de inscrição:',
      answer: <>
        <p>
          As inscrições deverão ser feitas dentro dos prazos estipulados no Edital, exclusivamente pelo Portal de
          Serviços Computacionais da USP (<a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://portalservicos.usp.br/'
            target="_blank"
          >https://portalservicos.usp.br/</a>), inclusive com a anexação de documentos comprobatórios
          (preferencialmente em PDF e para cada documento um nome de arquivo) da situação socioeconômica declarada no
          formulário.
        </p>
        <ol className="list-decimal ml-6">
          <li>Acessar novo portal de serviços computacionais da USP (<a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://portalservicos.usp.br/'
            target="_blank"
          >https://portalservicos.usp.br/</a>)</li>
          <li>Graduação</li>
          <li>Programa de Bolsas</li>
          <li>PAPFE/SASe</li>
          <li>Inscrição em bolsas e apoios</li>
          <li>Escolha os benefícios aos quais quer concorrer.</li>
          <li>
            Os alunos devem preencher o questionário e justificativa, anexar documentos (em PDF e para cada documento
            um nome de arquivo) e enviar/finalizar a inscrição.
          </li>
        </ol>
        <p>
          Sempre visualize o protocolo de inscrição, para confirmar que finalizou a inscrição.
        </p>
      </>,
    },
    {
      question: 'Importante – Recebimento do Auxílio moradia/financeiro ou Auxílio transporte',
      answer: <>
        <p>
          É necessário/obrigatório ter conta corrente do Banco no Brasil cadastrado no sistema da USP (Portal de
          serviços computacionais).
        </p>
        <p>
          Para o pagamento dos auxílios (financeiro, transporte ou manutenção), você deverá conferir seus dados no
          sistema USP, ícone Graduação/acompanhamentos/Dados Pessoais (RG, CPF, endereço residencial, e-mail e
          telefone). Se necessário, deverá corrigir a(s) informação(ões). Deverá cadastrar o número de Agência e
          Conta Corrente no sistema USP (só poderá ser conta corrente do Banco do Brasil e deverá estar em nome do
          próprio estudante como primeiro titular). Estudantes que não tiverem conta corrente no Banco do Brasil
          deverão providenciar. Caso seja necessária declaração do Auxílio recebido para abertura de conta está
          disponível no sistema USP, menu Emissão de documentos - Documentos (Escolher no campo Documento a opção
          Declaração para abertura de conta bancária).
        </p>
      </>,
    },
    {
      question: 'Quais documentos devo apresentar digitalmente no momento da inscrição?',
      answer: <>
        <p>
          DOCUMENTOS OBRIGATÓRIOS – PAPFE 2021
        </p>
        <p>
          Os documentos listados abaixo deverão ser, obrigatoriamente, anexados ao questionário do SASe. Caso o(a)
          aluno(a) não disponha de algum desses documentos deverá justificar a ausência, expondo os motivos para a
          falta de determinado documento.
        </p>
        <p>
          Dúvidas sobre documentação: enviar e-mail para o serviço social do campus onde estuda ou para a Assistente
          Social responsável pelo seu atendimento.
        </p>
        <ol className="list-decimal ml-6">
          <li>
            <p>
              CONTA DE LUZ ATUALIZADA (para comprovação de consumo/despesa).
            </p>
            <p>
              A conta deverá ser da unidade residencial da família e relativa ao mês /ano da inscrição no PAPFE/2021
            </p>
          </li>
          <li>
            <p>
              IPTU DA MORADIA DO ANO EM CURSO (para comprovação de propriedade)
            </p>
            <p>
              O imposto deverá ser da unidade residencial da família para comprovação de casa própria; no caso de a
              moradia ser alugada/república, enviar o comprovante do pagamento de aluguel do mês/ano da inscrição do
              PAPFE/2021
            </p>
          </li>
          <li>
            <p>
              CÓPIAS DE DOCUMENTOS DE RENDA MENSAL ATUALIZADO DE TODAS AS PESSOAS DO NÚCLEO FAMILIAR QUE POSSUEM
              RENDA, MESMO QUE INFORMAL OU EVENTUAL (para comprovação da renda familiar)
            </p>
            <p>
              Documentos que podem ser aceitos: holeriths/contracheques OU cópia da Carteira Profissional atualizada
              (todas as folhas preenchidas) OU declaração de pró-labore (de contador ou próprio punho ou comprovante
              de recebimento de pensão alimentícia OU extrato de benefícios do INSS; para autônomos, declaração de
              próprio punho constando natureza do trabalho e média mensal de retirada; renda proveniente de aluguel
              (recibos)
            </p>
          </li>
          <li>
            <p>
              IMPOSTO DE RENDA DO PRINCIPAL CONTRIBUINTE DA RENDA FAMILIAR ENTREGUE NO ÚLTIMO ANO (para comprovação
              de endereço de procedência, de renda, de dependentes, de bens móveis e imóveis, de pagamento de
              escolas, pagamento de planos de saúde e outros)
            </p>
            <p>
              Cópia completa da última declaração de IR (2019/2020), todas as folhas.
            </p>
          </li>
        </ol>
        <p>
          IMPORTANTE:
        </p>
        <ol className="list-decimal ml-6">
          <li>
            <p>
              Caso o(a) aluno(a) julgue necessário anexar mais documentos que não foram solicitados, poderá anexá-los
              no ícone “Outros documentos” no questionário de avaliação socioeconômica. Lembre-se que, quanto mais
              claras forem as informações e comprovantes apresentados, mais fidedigna será a avaliação
              socioeconômica.
            </p>
            <p>
              A depender das informações prestadas na inscrição, outros documentos complementares poderão ser
              solicitados pela Assistente Social e, no caso de não atendimento, a avaliação socioeconômica não poderá
              ser concretizada e, portanto, a inscrição ficará incompleta
            </p>
          </li>
          <li>
            O sistema aceita arquivo/anexo com tamanho máximo de 4M.
          </li>
        </ol>
      </>,
    },
    {
      question: 'Posso entregar a documentação impressa?',
      answer: <p>
        Não. Serão aceitos somente as informações e documentos digitais submetidos por meio do formulário eletrônico,
        dentro do prazo previsto no edital.
      </p>,
    },
    {
      question: 'Como proceder caso não disponha de alguma documentação no momento da inscrição?',
      answer: <>
        <p>
          Não dispondo de algum documento para anexar, o candidato deverá justificar a ausência da comprovação no
          campo do próprio formulário.
        </p>
        <p>
          Lembramos que os alunos serão classificados por meio das informações declaradas no momento do preenchimento
          do questionário SASe, com posterior avaliação dos documentos comprobatórios da situação socioeconômica. A
          não comprovação das informações socioeconômicas declaradas acarretará em mudanças na classificação de
          prioridade ou mesmo no cancelamento dos benefícios concedidos, sem prejuízo de outras ações administrativas
          e legais.
        </p>
      </>,
    },
    {
      question: 'Posso vir a ser chamado a apresentar Informações e documentos adicionais?',
      answer: <p>
        Sim, no decorrer do processo de análise, informações e documentações adicionais poderão ser requisitadas.
      </p>,
    },
    {
      question: 'Que uso será feito das informações e documentos que forneci na inscrição no PAPFE 2021?',
      answer: <p>
        As informações e os documentos fornecidos no SASe têm a finalidade exclusiva de avaliação socioeconômica para
        o processo seletivo de bolsas, auxílios e apoios da Universidade de São Paulo, sendo de acesso restrito e
        sigiloso.
      </p>,
    },
    {
      question: 'Ainda tenho dúvidas em relação ao PAPFE 2021. Como posso saná-las?',
      answer: <>
        <p>
          Entre em contato com a Assistente Social. Você pode enviar um e-mail para a assistente social responsável
          pela sua inscrição (Rosa: <a
            className='hover:underline break-all'
            href='mailto:rosa@sc.usp.br'
          >rosa@sc.usp.br</a> ou Emanuela: <a
            className='hover:underline break-all'
            href='mailto:emanuela@sc.usp.br'
          >emanuela@sc.usp.br</a>), ou agendar um horário  pelo
          Clique Social (<a
            rel='noreferrer noopener'
            className='hover:underline break-all'
            href='https://portalservicos.usp.br/'
            target="_blank"
          >https://portalservicos.usp.br</a>) ou envie um e-mail (informe seu nº USP e nome completo) para
          o Serviço Social do campus: <a
            className='hover:underline break-all'
            href='mailto:social.prefeitura@sc.usp.br'
          >social.prefeitura@sc.usp.br</a>, ou ainda pelo telefone/whatasapp: 16 99742-1218.
        </p>
      </>,
    },
  ],
};
