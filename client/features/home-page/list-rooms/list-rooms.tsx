import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useDispatch, useSelector } from 'react-redux';
import { gameSelector, showSnackBarAction } from 'client/core/store';
import { Widgets } from '@material-ui/icons';
import { changeNameGame, getInitDataGame, joinGame } from '../slice';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function ListRooms() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { login } = useSelector(getInitDataGame);
  const { rooms } = useSelector(gameSelector);

  const handleClick = (name: string) => () => {
    if (login) {
      dispatch(changeNameGame(name));
      dispatch(joinGame());
    } else {
      dispatch(
        showSnackBarAction({
          type: 'warning',
          msg: 'Enter your login or name party',
        }),
      );
    }
  };

  const createListItem = (name: string, count: number) => (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <Widgets />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`room name: ${name}`}
        secondary={`number of players: ${count}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={handleClick(name)}>
          <PlayArrowIcon color="primary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  const createList = Object.keys(rooms).map((name) => createListItem(name, rooms[name]));

  return (
    <div className={classes.root}>
      <List dense>{createList}</List>
    </div>
  );
}
