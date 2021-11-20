import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useSelector } from 'react-redux';
import { gameSelector } from 'client/core/store';
import { Widgets } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

export default function InteractiveList() {
    const classes = useStyles();

    const { rooms } = useSelector(gameSelector);

    const createListItem = (name: string, count: number) => {
        return (
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
                    <IconButton edge="end" aria-label="delete">
                        <PlayArrowIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    };

    const createList = Object.keys(rooms).map((name) =>
        createListItem(name, rooms[name]),
    );

    return (
        <div className={classes.root}>
            <Grid item xs={12} md={12}>
                <Typography
                    variant="h6"
                    align="center"
                    className={classes.title}
                >
                    List active rooms
                </Typography>
                <div className={classes.demo}>
                    <List dense>{createList}</List>
                </div>
            </Grid>
        </div>
    );
}
