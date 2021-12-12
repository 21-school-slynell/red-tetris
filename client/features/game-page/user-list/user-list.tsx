import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import {
  getCurrentLoginUser,
  UserProps,
} from 'client/features/home-page/slice';
import StarIcon from '@material-ui/icons/Star';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { yellow } from '@material-ui/core/colors';
import { getUsers } from '../slice';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    overflow: 'hidden',
  },
  inline: {
    display: 'inline',
  },
  star: {
    backgroundColor: yellow[500],
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function UserList() {
  const classes = useStyles();

  const users = useSelector(getUsers) as UserProps[];
  const login = useSelector(getCurrentLoginUser);

  const getClassName = (user: UserProps) => {
    if (user.isLeader) {
      return classes.star;
    }
    if (user.login === login) {
      return classes.selected;
    }
    return '';
  };

  const createListItem = (user: UserProps) => (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar className={getClassName(user)}>
          {user.isLeader ? <StarIcon /> : <AccountCircleIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={user.login}
        secondary={(
          <>
            <Typography
              component="span"
              variant="body1"
              className={classes.inline}
              color="textPrimary"
            >
              {'About me - '}
            </Typography>
            <Typography variant="subtitle2" className={classes.inline}>
              {user?.description || 'introvert'}
            </Typography>
          </>
        )}
      />
    </ListItem>
  );

  const listItems = users.map((user, index) => {
    if (index !== users.length - 1) {
      return (
        <>
          {createListItem(user)}
          <Divider variant="inset" component="li" />
        </>
      );
    }
    return createListItem(user);
  });

  return <List className={classes.root}>{listItems}</List>;
}
