import React from 'react'
import { Box } from '@material-ui/core'

import LogoBixoquest from '../images/logo-bixoquest.png'

const style = {
    main_box: 'flex flex-col sm:flex-row justify-center shadow',
    button: 'shadow-sm mb-8 sm:mb-0 py-3 px-12 color-white rounded font-medium w-100',
    buttonPrimary: 'bg-secondary',
    buttonDisabled: 'bg-gray cursor-default',
    logo:'w-3/4',
    logo_box:'flex justify-center',
    text: 'color-dark-gray mb-10 px-2 md:px-0 text-lg',
    text_box: 'text-center md:text-left px-2 flex flex-col sm:items-start justify-center',
    title: 'text-5xl color-dark-gray font-semibold'
}

export default function Flyer() {
    return (
        <Box className={style.main_box}>
            <Box className={style.logo_box}>
                <img src={LogoBixoquest} alt='Logo Bixoquest' className={style.logo}/>
            </Box>
            <Box className={style.text_box}>
                <h2 className={style.title}>A aventura vai começar!</h2>
                <p className={style.text}>
                    Já pensou em transformar a Semana de Recepção em um grande jogo?!
                </p>
                <button className={`${style.button} ${style.buttonDisabled}`} disabled>Em breve!</button>
                {/* <button className={`${style.button} ${style.buttonPrimary}`}>Clique aqui!</button> */}
            </Box>
        </Box>
    )
}
