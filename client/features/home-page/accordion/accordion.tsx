import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ListRooms from '../list-rooms/list-rooms';
import NewParty from '../new-party/new-party';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
  },
  heading: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
  },
}));

const CONFIG = [
  {
    name: 'new-game',
    icon: <AddBoxIcon fontSize="large" color="action" />,
    title: 'Create a new batch',
    component: <NewParty />,
  },
  {
    name: 'existing-games',
    icon: <GroupIcon fontSize="large" color="action" />,
    title: 'List of available batches',
    component: <ListRooms />,
  },
];

export default function AccordionGame() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(CONFIG[0].name);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      {CONFIG.map((config) => (
        <Accordion
          expanded={expanded === config.name}
          onChange={handleChange(config.name)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${config.name}-controls`}
            id={`${config.name}-headers`}
          >
            {config.icon}
            <div className={classes.heading}>
              <Typography className={classes.secondaryHeading}>
                {config.title}
              </Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails>{config.component}</AccordionDetails>
        </Accordion>
                ))}
    </div>
  );
}
