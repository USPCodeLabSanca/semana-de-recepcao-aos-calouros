import React from 'react';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';
import AddIcon from '@mui/icons-material/Add';

import SectionHeader from './section-header';
import markdownToHtml from '../lib/markdown-to-html';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 40,
    height: 40,
  },
  ...(active && {
    backgroundColor: '#303030',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
}));

/**
 * ColorlibStepIcon
 *
 * @param {object} props
 *
 * @return {void}
 */
function ColorlibStepIcon(props) {
  const { active, className } = props;

  return (
    <ColorlibStepIconRoot active={active} className={className}>
      <AddIcon />
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

/**
 * getScheduleContent
 *
 * @param {array} events
 *
 * @return {void}
 */
function getScheduleContent(events) {
  const content = [];
  let current = {};

  for (const index in events) {
    current = events[index];
    const [startHour, startMinute] = current.Inicio.split(':');
    const [endHour, endMinute] = current.Fim.split(':');

    const originalDescription = current.Descricao;
    const convertedDescription = markdownToHtml(originalDescription || '');

    content.push(
        <div className='bg-gray-100 border-solid border-gray-100 my-2 shadow-md w-5/6' key={index}>
          <div className='flex'>
            <div className={current.type === '1' ? 'bg-black text-center w-1/4 sm:w-1/6 py-2 flex flex-col justify-center' : 'bg-black text-center w-1/4 sm:w-1/6 py-2'}>
              <p className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-white'>{`${startHour}:${startMinute}`}</p>
              <p className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-white'>{`${endHour}:${endMinute}`}</p>
            </div>
            <div className='flex flex-col justify-center py-2 px-3 w-full'>
              <h1 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold color-black'>{current.Titulo}</h1>
              {
                convertedDescription &&
              <>
                <div
                  className='text-xs sm:text-sm md:text-base lg:text-lg color-dark-gray'
                  dangerouslySetInnerHTML={{__html: convertedDescription}}
                ></div>
              </>
              }
              <h2 className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-dark-gray'>{current.Local}</h2>
            </div>
          </div>
        </div>,
    );
  }

  return content;
}

/**
 * Programacao
 *
 * @return {void}
 */
export default function Programacao({ events }) {
  const dayName = [
    {
      short: 'seg',
      long: 'Segunda-Feira',
    }, {
      short: 'ter',
      long: 'Terça-Feira',
    }, {
      short: 'qua',
      long: 'Quarta-Feira',
    }, {
      short: 'qui',
      long: 'Quinta-Feira',
    }, {
      short: 'sex',
      long: 'Sexta-Feira',
    }, {
      short: 'sáb',
      long: 'Sábado',
    }, {
      short: 'dom',
      long: 'Domingo',
    },
  ];

  let days = new Set();
  events.forEach((event) => {
    days.add(event.Data);
  });

  days = [...days].sort();

  const schedule = {};

  days.forEach((day) => {
    schedule[day] = [];
    events.forEach((event) => {
      if (event.Data === day) {
        schedule[day].push(event);
      }
    });
    schedule[day].sort((event1, event2) => {
      if (event1.Inicio < event2.Inicio) {
        return -1;
      }
      if (event1.Inicio > event2.Inicio) {
        return 1;
      }

      return 0;
    });
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const getActiveDate = () => {
    const dates = Object.keys(schedule);
    if (dates.length === 0) return new Date();
    return new Date(dates[activeStep]);
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className='bg-secondary flex flex-col items-center pb-8' id='programacao'>
      <SectionHeader title='Programação parcial' subTitle={<p>Sujeita a mudanças</p>} />

      <div className='w-full sm:w-5/6 lg:w-3/5 bg-white'>
        <div className='px-6 py-8'>
          <Stepper alternativeLabel nonLinear activeStep={activeStep} connector={<ColorlibConnector />}>
            {Object.keys(schedule).map((dateString, index) => {
              const date = new Date(dateString);
              // const formatedDate = `${('0'+(date.getDate()+1)).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}`;
              const formatedDate = `${date.getDate() + 1} / ${('0'+(date.getMonth()+1)).slice(-2)}`;
              const dayOfWeek = dayName[date.getDay()].short;
              return (
                <Step key={index}>
                  <StepButton onClick={handleStep(index)} style={{outline: 'none'}}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <p className='md:text-lg text-xs'>{formatedDate}</p>
                      <p className='md:text-lg text-sm'>{dayOfWeek}</p>
                    </StepLabel>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <h1 className='text-lg sm:xl md:text-2xl lg:text-3xl font-bold text-center px-2 pb-6 bg-white'>
          {`${('0'+(getActiveDate().getDate() + 1)).slice(-2)}/${('0'+(getActiveDate().getMonth()+1)).slice(-2)} - ${dayName[getActiveDate().getDay()].long}`}
        </h1>

        <div className='flex flex-col items-center bg-white pb-8'>
          {getScheduleContent(Object.values(schedule)[activeStep])}
        </div>
      </div>
    </div>
  );
}
