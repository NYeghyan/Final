import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ControlledAccordions({ ...children }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          style={{ display: 'flex', padding: '10px' }}
        >
          {children.name}
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" component="p">
            Description:
          </Typography>
          {children.description}
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body2" component="p">
            Start Time:
          </Typography>
          {children.startTime}
        </AccordionDetails>
        <AccordionDetails>
          <Typography variant="body2" component="p">
            End Time:
          </Typography>
          {children.endTime}
        </AccordionDetails>
        <AccordionDetails>{children.eventImage}</AccordionDetails>
        <AccordionDetails>
          {children.updateButton}, {children.deleteButton}
        </AccordionDetails>
        <AccordionDetails>
          {children.updateButtonForCreateEvent}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
