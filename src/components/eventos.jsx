import React from 'react';

import {Box, CardContent} from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';

import Recepcao from '../images/recepcao.jpg';
import RecepcaoConjunta from '../images/recepcaoconjunta.jpg';
import BatePapo from '../images/batepapo.jpg';
import FeiraDeOportunidades from '../images/feiradeoportunidades.jpg';
import GameNight from '../images/gamenight.jpg';
import Encerramento from '../images/encerramento.jpg';

const style = {
  card: 'rounded-lg shadow mx-4 sm:mx-8 my-6',
  card_content: 'bg-white pt-4 pb-2 rounded-b-lg',
  card_row: 'flex flex-wrap items-center justify-center',
  event_info_box: 'flex mb-2',
  event_description: 'ml-1 lg:ml-3 color-dark-gray',
  event_title: 'text-lg color-primary font-medium mb-3',
  icon: 'color-gray',
  image: 'h-56 sm:h-64 rounded-t-lg',
  main_box: 'py-8 sm:py-16 mb-24 event-card-bg',
};

const events = [
  {
    image: RecepcaoConjunta,
    title: 'Abertura conjunta',
    hour: '17/02 - 8h',
    place: 'Salão de eventos do Campus',
  },
  {
    image: Recepcao,
    title: 'Recepção do ICMC',
    hour: '17/02 - 18h',
    place: 'Auditório Fernão Stella',
  },
  {
    image: BatePapo,
    title: 'Bate-papo com a coordenação',
    hour: '18/02 - Horários na Programação',
    place: 'Locais na Programação',
  },
  {
    image: FeiraDeOportunidades,
    title: 'Feira de oportunidades',
    hour: '19/02 - 9h',
    place: 'Hiperespaço Gilberto Loibel',
  },
  {
    image: GameNight,
    title: 'Game Night',
    hour: '20/02 - 19h',
    place: 'Jardim secreto do ICMC',
  },
  {
    image: Encerramento,
    title: 'Encerramento',
    hour: '21/02 - 12h',
    place: 'Auditório Fernão Stella',
  },
];

/**
 * Eventos
 *
 * @return {void}
 */
export default function Eventos() {
  return (
    <Box className={style.main_box}>
      <Box className={style.card_row}>
        {events.map((event, index) => {
          return (
            <Box className={style.card} key={index}>
              <img style={{objectFit: 'cover'}} src={event.image} alt={event.title} className={style.image}/>
              <CardContent className={style.card_content}>
                <h3 className={style.event_title}>{event.title}</h3>
                <Box className={style.event_info_box}>
                  <AccessTimeIcon className={style.icon}/>
                  <p className={style.event_description}>{event.hour}</p>
                </Box>
                <Box className={style.event_info_box}>
                  <RoomIcon className={style.icon}/>
                  <p className={style.event_description}>{event.place}</p>
                </Box>
              </CardContent>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
