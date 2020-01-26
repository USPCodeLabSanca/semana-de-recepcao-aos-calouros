import React from 'react'

import { Box, CardContent } from '@material-ui/core'

import AccessTimeIcon from '@material-ui/icons/AccessTime'
import RoomIcon from '@material-ui/icons/Room'

import Recepcao from '../images/recepcao.jpg'
import RecepcaoConjunta from '../images/recepcaoconjunta.jpg'
import BatePapo from '../images/batepapo.jpg'
import FeiraDeOportunidades from '../images/feiradeoportunidades.jpg'
import GameNight from '../images/gamenight.jpg'
import Encerramento from '../images/encerramento.jpg'

const style = {
    card: 'rounded-lg shadow w-custom mx-4 sm:mx-8 my-6',
    card_content: 'bg-white pt-4 pb-2 rounded-b-lg',
    card_row: 'flex flex-wrap items-center justify-center',
    event_info_box: 'flex mb-2',
    event_description: 'ml-1 lg:ml-3 color-dark-gray',
    event_title: 'text-lg color-primary font-medium mb-3',
    icon: 'color-gray',
    image: 'h-56 sm:h-64 rounded-t-lg',
    main_box:'py-8 sm:py-16 mb-24 event-card-bg'
}

export default function Eventos() {
    return (
        <Box className={style.main_box}>
            <Box className={style.card_row}>
                <Box className={style.card}>
                    <img style={{objectFit: 'cover'}} src={RecepcaoConjunta} alt="Abertura conjunta" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}>Abertura conjunta</h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>17/02 - 8h</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Salão de eventos do Campus</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img style={{objectFit: 'cover'}} src={Recepcao} alt="Recepção do ICMC" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}>Recepção do ICMC</h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>17/02 - 18h</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Auditório Fernão Stella</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img style={{objectFit: 'cover'}} src={BatePapo} alt="Bate-papo com a coordenação" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}>Bate-papo com a coordenação</h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>18/02 - Horários na Programação</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Locais na Programação</p>
                        </Box>
                    </CardContent>
                </Box>
            </Box>

            <Box className={style.card_row}>
                <Box className={style.card}>
                    <img style={{objectFit: 'cover'}} src={FeiraDeOportunidades} alt="Feira de oportunidades" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}>Feira de oportunidades</h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>19/02 - 9h</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Hiperespaço Gilberto Loibel</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img style={{objectFit: 'cover'}} src={GameNight} alt="Game Night" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}>Game Night</h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>20/02 - 19h</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Jardim secreto do ICMC</p>
                        </Box>
                    </CardContent>
                </Box>
                <Box className={style.card}>
                    <img style={{objectFit: 'cover'}} src={Encerramento} alt="Encerramento" className={style.image}/>
                    <CardContent className={style.card_content}>
                        <h3 className={style.event_title}>Encerramento</h3>
                        <Box className={style.event_info_box}>
                            <AccessTimeIcon className={style.icon}/>
                            <p className={style.event_description}>21/02 - 12h</p>
                        </Box>
                        <Box className={style.event_info_box}>
                            <RoomIcon className={style.icon}/>
                            <p className={style.event_description}>Auditório Fernão Stella</p>
                        </Box>
                    </CardContent>
                </Box>
            </Box>
        </Box>
    )
}
