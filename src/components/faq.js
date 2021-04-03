import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
            <p className='text-xs md:text-sm lg:text-base'>{item.answer}</p>
          </AccordionDetails>
        </Accordion>);
      })}
    </div>
  );
}
