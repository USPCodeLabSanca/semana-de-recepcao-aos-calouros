import React from 'react'

import { Box } from '@material-ui/core'

const style = {
  main_box: 'bg-purple-900 px-10 md:px-20 py-12 text-white',
  link: 'text-lg hover:underline',
  link_box: 'my-8 ',
  link_title: 'font-medium text-2xl md:text-3xl',
  title: 'font-semibold text-4xl md:text-5xl'
}

export default function LinksImportantes() {
  return (
    <Box className={style.main_box}>
      <h2 className={style.title}>Links Importantes</h2>
      <Box className={style.link_box}>
        <h3 className={style.link_title}>Evento no Facebook</h3>
        <a rel='noreferrer noopener' className={style.link} href='https://www.icmc.usp.br/e/af3c6'>www.icmc.usp.br/e/af3c6</a>
      </Box>
      <Box className={style.link_box}>
        <h3 className={style.link_title}>Sistema Júpiter Web</h3>
        <a rel='noreferrer noopener' className={style.link} href='https://uspdigital.usp.br/jupiterweb'>uspdigital.usp.br/jupiterweb</a>
      </Box>
      <Box className={style.link_box}>
        <h3 className={style.link_title}>Informações aos calouros</h3>
        <a rel='noreferrer noopener' className={style.link} href='https://calouros.icmc.usp.br'>calouros.icmc.usp.br</a>
      </Box>
      <Box className={style.link_box}>
        <h3 className={style.link_title}>Aplicativo móvel de segurança</h3>
        <a rel='noreferrer noopener' className={style.link} href='https://www.sppu.usp.br'>www.sppu.usp.br</a>
      </Box>
      <Box className={style.link_box}>
        <h3 className={style.link_title}>FAQ e depoimentos</h3>
        <a rel='noreferrer noopener' className={style.link} href='https://www.icmc.usp.br/graduacao/faq-e-depoimentos'>www.icmc.usp.br/graduacao/faq-e-depoimentos</a>
      </Box>
      <Box className={style.link_box}>
        <h3 className={style.link_title}>Manual do calouro USP</h3>
        <a rel='noreferrer noopener' className={style.link} href='https://www.usp.br/manualdocalouro'>www.usp.br/manualdocalouro</a>
      </Box>
    </Box>
  )
}