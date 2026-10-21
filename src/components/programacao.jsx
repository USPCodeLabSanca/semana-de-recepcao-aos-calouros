import React from 'react';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import StepLabel from '@mui/material/StepLabel';

import SectionHeader from './section-header';
import markdownToHtml from '../lib/markdown-to-html';
import { getLocationId, useLocationSearch } from '../lib/location';
import MapLocationModal from './map-modal';

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
  transition: 'transform 0.3s ease',
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
  const { active, className, dayText } = props;

  return (
    <ColorlibStepIconRoot active={active} className={className}>
      <span className={`text-lg font-bold ${active ? 'text-white' : 'text-gray-600'}`}>
        {dayText}
      </span>
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

/**
 * EventContentItem
 *
 * @param {Event} events
 *
 * @return {void}
 */
function EventContentItem({ event }) {
  const [startHour, startMinute] = event.Inicio.split(':');
  const [endHour, endMinute] = event.Fim.split(':');

  const originalDescription = event.Descricao;
  const convertedDescription = markdownToHtml(originalDescription || '');

  const { setLocation, setOpen } = useLocationSearch();

  /**
  * handleLocationClick
  *
  * @param {string} local
  *
  * @return {void}
  */
  function handleLocationClick(local) {
    setLocation(getLocationId(local));
    setOpen(true);
  }

  return (
    <div className='bg-gray-100 border-solid border-gray-100 my-2 shadow-md w-5/6'>
      <div className='flex'>
        <div className={event.type === '1' ? 'bg-black text-center w-1/4 sm:w-1/6 py-2 flex flex-col justify-center' : 'bg-black text-center w-1/4 sm:w-1/6 py-2'}>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-white'>{`${startHour}:${startMinute}`}</p>
          <p className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-white'>{`${endHour}:${endMinute}`}</p>
        </div>
        <div className='flex flex-col justify-center py-2 px-3 w-full'>
          <h1 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold color-black'>{event.Titulo}</h1>
          {
            convertedDescription &&
            <>
              <div
                className='text-xs sm:text-sm md:text-base lg:text-lg color-dark-gray'
                dangerouslySetInnerHTML={{ __html: convertedDescription }}
              ></div>
            </>
          }
          <div className='flex gap-2'>
            {event.Local.split(',').map((local, idx) => {
              return (
                <h2
                  key={idx}
                  className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-dark-gray cursor-pointer hover:underline'
                  onClick={() => handleLocationClick(local.trim())}
                >{local.trim()}</h2>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Parses a 'YYYY-MM-DD' string as a local calendar date (new Date(string) would use UTC midnight)
 *
 * @param {string} dateString
 *
 * @return {Date}
 */
function parseDay(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formats a Date as 'YYYY-MM-DD' in local time
 *
 * @param {Date} date
 *
 * @return {string}
 */
function toDayString(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Picks today's tab if it is in the schedule, the last day if the week is over, otherwise the first
 *
 * @param {string[]} days sorted 'YYYY-MM-DD' strings
 *
 * @return {number}
 */
function getInitialStep(days) {
  const today = toDayString(new Date());
  const todayIndex = days.indexOf(today);
  if (todayIndex !== -1) {
    return todayIndex;
  }
  if (days.length > 0 && today > days[days.length - 1]) {
    return days.length - 1;
  }
  return 0;
}

/**
 * Programacao
 *
 * @return {void}
 */
export default function Programacao({ events }) {
  // Indexed by Date.getDay() (0 = Sunday)
  const dayName = [
    {
      short: 'dom',
      long: 'Domingo',
    }, {
      short: 'seg',
      long: 'Segunda-feira',
    }, {
      short: 'ter',
      long: 'Terça-feira',
    }, {
      short: 'qua',
      long: 'Quarta-feira',
    }, {
      short: 'qui',
      long: 'Quinta-feira',
    }, {
      short: 'sex',
      long: 'Sexta-feira',
    }, {
      short: 'sáb',
      long: 'Sábado',
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

  const [activeStep, setActiveStep] = React.useState(() => getInitialStep(days));

  // Re-pick the day whenever the set of days changes (e.g. a new schedule is published)
  const daysKey = days.join(',');
  React.useEffect(() => {
    setActiveStep(getInitialStep(days));
  }, [daysKey]);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  if (days.length === 0) {
    return null;
  }

  const currentStep = Math.min(activeStep, days.length - 1);
  const activeDate = parseDay(days[currentStep]);

  return (
    <div className='bg-secondary flex flex-col items-center pb-8' id='programacao'>
      <SectionHeader title='Programação parcial' subTitle={<p>Sujeita a mudanças</p>} />

      <div className='w-full sm:w-5/6 lg:w-3/5 bg-white'>
        <div className='px-6 py-8'>
          <Stepper alternativeLabel nonLinear activeStep={currentStep} connector={<ColorlibConnector />}>
            {Object.keys(schedule).map((dateString, index) => {
              const date = parseDay(dateString);
              const dayNumber = date.getDate();
              const dayOfWeek = dayName[date.getDay()].short;
              return (
                <Step key={index}>
                  <StepButton
                    onClick={handleStep(index)}
                    className='group md:hover:bg-black/5 transition-colors duration-200 ease-in-out'
                  >
                    <StepLabel
                      slots={{ stepIcon: ColorlibStepIcon }}
                      slotProps={{
                        stepIcon: {
                          className: 'group-hover:scale-110 group-focus:scale-110 transition-transform duration-300',
                          dayText: dayNumber,
                        },
                      }}
                    >
                      <p className="md:text-lg text-sm">{dayOfWeek}</p>
                    </StepLabel>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <MapLocationModal/>

        <h1 className='text-lg sm:xl md:text-2xl lg:text-3xl font-bold text-center px-2 pb-6 bg-white'>
          {`${('0'+activeDate.getDate()).slice(-2)}/${('0'+(activeDate.getMonth()+1)).slice(-2)} - ${dayName[activeDate.getDay()].long}`}
        </h1>

        <div className='flex flex-col items-center bg-white pb-8'>
          {schedule[days[currentStep]].map((event, idx) => <EventContentItem event={event} key={idx}/>)}
        </div>
      </div>
    </div>
  );
}
