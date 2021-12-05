import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { FC, memo } from 'react';
import { isServer } from 'client/core/store';

const useStyles = makeStyles({
  root: {
    maxHeight: 1000,
    minHeight: 600,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 24,
  },
  grid: {
    display: 'grid',
    gap: 16,
  },
});

export const WrapperNotFound: FC = memo(() => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid xs={12} md={12} className={classes.grid}>
        <Typography variant="h5" align="center">
          Unfortunately, the game has not been found for you
        </Typography>
        <Button
          href="/"
          color="primary"
          style={{ textDecoration: 'underline' }}
        >
          go to main
        </Button>
      </Grid>
    </Paper>
  );
});

const NullFC: FC = () => <></>;

// export const Game = withAuth(!isServer ? WrapperGame : NullFC);
export const NotFound = !isServer ? WrapperNotFound : NullFC;
