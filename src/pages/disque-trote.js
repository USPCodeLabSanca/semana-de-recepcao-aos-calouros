import React from 'react'

const style = {
  root: 'py-10 px-2 md:px-16',
  title: 'text-3xl font-bold',
  description: '',
  subTitle: 'text-2xl font-bold pt-10',
  attendance: {
    title: 'pt-4 text-lg font-bold',
    description: 'text-xs'
  },
  quote: 'text-2xl font-bold pt-10'
}

const Attendance = ({ title, desc1, desc2 }) => <React.Fragment>
  <h3 className={style.attendance.title}>
    {title}
  </h3>
  <p className={style.attendance.description}>
    {desc1}
  </p>
  { desc2 &&
    <p className={style.attendance.description}>
      {desc2}
    </p>
  }
</React.Fragment>

export default function DisqueTrote () {
  return (
    <main className={style.root}>
      <h1 className={style.title}>O trote é proibido na USP!</h1>
      <p className={style.description}>
        O calouro da USP pode contar com dois canais de atendimento para enviar
        denúncias de trotes abusivos que ocorram nos campi da USP. O trote pode
        ser qualquer tipo de manifestação estudantil que cause, a quem quer que
        seja, agressão física, moral ou outras formas de constrangimento, dentro
        ou fora do âmbito da Universidade. Em caso de dúvida, ligue para o
        disque-trote ou acesse o chat de atendimento.
      </p>
      <h2 className={style.subTitle}>Canais de atendimento ao calouro:</h2>

      <Attendance
        title='Guarda Universitária'
        desc1='(16) 3373-6666, 3373-9112 e 3373 9889'
        desc2='Atendimento 24 horas para registrar ocorrências de segurança no Campus.'
      />
      <Attendance
        title='Disque-trote'
        desc1='0800-0121090'
        desc2='Atendimento de segunda a sexta-feira, das 9 às 21 horas.'
      />
      <Attendance
        title='E-mail'
        desc1='disquetrote@usp.br'
      />
      <Attendance
        title='Aplicativo Disque-Trote USP'
        desc1='Versão android e Versão IOS'
      />
      <Attendance
        title='Código de Ética'
        desc1='
          Confira o texto do Código de Ética da Universidade de São Paulo, aprovado
          de acordo com a Resolução n. 4871 de 22 de outubro de 2001. Fique atento
          aos itens relacionados ao corpo discente e demais alunos da Universidade.
          O artigo 21, por exemplo, trata de princípios importantes para o novo aluno:
        '
      />
      <p className={style.quote}>
        “As relações entre os membros do corpo discente e demais alunos da
        Universidade devem ser presididas pelo respeito à autonomia e à dignidade
        do ser humano, não sendo tolerados atos ou manifestações de prepotência
        ou violência ou que ponham em risco a integridade física e moral de outros.”
      </p>
    </main>
  )
}
