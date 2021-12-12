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
import { UserProps } from 'client/features/home-page/slice';
import { getUsers } from '../slice';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function UserList() {
  const classes = useStyles();

  const users = useSelector(getUsers) as UserProps[];

  const createListItem = (user: UserProps) => (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText
        primary={user.login}
        secondary={(
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {'About me - '}
            </Typography>
            {user?.description || 'introvert'}
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
