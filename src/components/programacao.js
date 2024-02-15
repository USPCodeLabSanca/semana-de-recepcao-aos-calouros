import React from 'react';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import StepConnector from '@material-ui/core/StepConnector';
import StepLabel from '@material-ui/core/StepLabel';
import AddIcon from '@material-ui/icons/Add';

import SectionHeader from './section-header';
import markdownToHtml from '../lib/markdown-to-html';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40,
    },
    [theme.breakpoints.up('md')]: {
      width: 50,
      height: 50,
    },
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#303030',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
}));

/**
 * ColorlibStepIcon
 *
 * @param {object} props
 *
 * @return {void}
 */
function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const {active} = props;

  return (
    <div className={clsx(classes.root, {[classes.active]: active})}>
      <AddIcon/>
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
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

    current.Descricao = markdownToHtml(current.Descricao || '');

    content.push(
        <div className='border-solid border-2 border-gray-100 my-4 shadow-md w-5/6 md:w-3/5' key={index}>
          <div className='flex'>
            <div className={current.type === '1' ? 'bg-black text-center w-1/4 sm:w-1/6 py-2' : 'bg-black text-center w-1/4 sm:w-1/6 py-2'}>
              <p className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-white'>{`${startHour}:${startMinute}`}</p>
              <p className='text-xs sm:text-sm md:text-base lg:text-lg font-bold color-white'>{`${endHour}:${endMinute}`}</p>
            </div>
            <div className='flex flex-col justify-center py-2 px-3 w-full'>
              <h1 className='text-sm sm:text-base md:text-lg lg:text-xl font-bold color-black'>{current.Titulo}</h1>
              <br/>
              {
                current.Descricao &&
                <>
                  <div
                    className='text-xs sm:text-sm md:text-base lg:text-lg color-dark-gray'
                    dangerouslySetInnerHTML={{__html: current.Descricao}}
                  ></div>
                  <br/>
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
export default function Programacao({events}) {
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
    return new Date(Object.keys(schedule)[activeStep]);
  };

  return (
    <div className='min-h-screen' id='programacao'>
      <SectionHeader title='Programação completa' subTitle={<p>Confira tudo que já aconteceu e que <b>ainda vai rolar!</b></p>} />
      <div className='flex justify-center pt-4'>
        <div className='w-full sm:w-5/6 md:w-3/5 overflow-x-scroll sm:overflow-x-auto'>
          <Stepper alternativeLabel nonLinear activeStep={activeStep} connector={<ColorlibConnector/>}>
            {Object.keys(schedule).map((dateString, index) => {
              const date = new Date(dateString);
              // const formatedDate = `${('0'+(date.getDate()+1)).slice(-2)}/${('0'+(date.getMonth()+1)).slice(-2)}`;
              const formatedDate = `${date.getDate()} / ${('0'+(date.getMonth()+1)).slice(-2)}`;
              const dayOfWeek = dayName[date.getDay() -1].short;
              return (
                <Step key={index}>
                  <StepButton onClick={handleStep(index)} style={{outline: 'none'}}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      <div>{formatedDate}</div>
                      <div>{dayOfWeek}</div>
                    </StepLabel>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
        </div>
      </div>

      <h1 className='text-lg sm:xl md:text-2xl lg:text-3xl font-bold text-center color-primary px-2 my-8'>
        {`${('0'+(getActiveDate().getDate()+1)).slice(-2)}/${('0'+(getActiveDate().getMonth()+1)).slice(-2)} - ${dayName[getActiveDate().getDay() -1].long}`}
      </h1>

      <div className='flex flex-col items-center mb-8'>
        {getScheduleContent(Object.values(schedule)[activeStep])}
      </div>
    </div>
  );
}
