import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * Faq
 *
 * @param {array} items
 *
 * @return {object}
 */
export default function Faq({items}) {
  return (
    <div className='w-full'>
      {items.map((item, index) => {
        return (<Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <p className='text-sm md:text-base lg:text-lg font-bold'>{item.question}</p>
          </AccordionSummary>
          <AccordionDetails>
            <div className='text-xs md:text-sm lg:text-base w-full'>{item.answer}</div>
          </AccordionDetails>
        </Accordion>);
      })}
    </div>
  );
}
