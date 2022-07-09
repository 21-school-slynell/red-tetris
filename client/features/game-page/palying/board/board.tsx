import { createStyles, makeStyles, Theme } from '@material-ui/core';
import {
  blue,
  deepPurple,
  green,
  indigo,
  orange,
  pink,
  purple,
  red,
  yellow,
} from '@material-ui/core/colors';
import clsx from 'clsx';
import React, { FC, memo } from 'react';
import { PieceSerializeProps } from '@server/socket/models/piece';
import { BOARD } from '../../../../../server/socket/config/board';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxHeight: 1000,
    minHeight: 600,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    padding: 24,
  },
  grid: {
    display: 'grid',
    gap: 16,
  },
  board: ({ isSmall }: any) => ({
    borderRadius: isSmall ? 10 : 20,
    border: `${isSmall ? 1 : 2}px solid ${
      isSmall
        ? '#828282'
        : theme.palette.primary.main
    }`,
    overflow: 'hidden',
    background: `repeating-linear-gradient(
      transparent,transparent ${isSmall ? 7 : 27}px, ${theme.palette.divider} ${
      isSmall ? 8 : 28
    }px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,transparent ${isSmall ? 7 : 27}px, ${theme.palette.divider} ${
      isSmall ? 8 : 28
    }px
    )`,
  }),
  ceil: ({ isSmall }: any) => ({
    width: isSmall ? 6 : 26,
    height: isSmall ? 6 : 26,
    margin: 1,
    borderRadius: isSmall ? 1 : 4,
    '&::before': {
      background: 'red',
    },
  }),
  selected: {
    boxShadow: 'inset 0px 0px 3px 2px rgb(0 0 0, 0.05)',
  },
  row: {
    display: 'flex',
  },
  red: {
    backgroundColor: red[500],
  },
  green: {
    backgroundColor: green[500],
  },
  blue: {
    backgroundColor: blue[500],
  },
  yellow: {
    backgroundColor: yellow[500],
  },
  pink: {
    backgroundColor: pink[500],
  },
  purple: {
    backgroundColor: purple[500],
  },
  deepPurple: {
    backgroundColor: deepPurple[500],
  },
  indigo: {
    backgroundColor: indigo[500],
  },
  orange: {
    backgroundColor: orange[500],
  },
}));

type BoardProps = {
  board: PieceSerializeProps[];
  isSmall?: boolean;
};

export const Board: FC<BoardProps> = memo(({ board, isSmall = true }) => {
  const classes = useStyles({ isSmall });

  const styleCells = (rowId: number, colId: number) => {
    let isSelected = false;
    let classCeil = {
      [classes.ceil]: true,
    };

    board.forEach((block) => {
      if (!isSelected && block?.data[rowId]?.includes(colId)) {
        isSelected = block?.data[rowId]?.includes(colId);

        classCeil = {
          [classes.ceil]: true,
          [classes.selected]: isSelected,
          [classes[block?.color as keyof typeof classes]]: isSelected,
        };
      }
    });

    return classCeil;
  };

  const createRow = (rowId: number) => Array(BOARD.COL)
    .fill(0)
    .map((_, colId) => (
      <div className={clsx(styleCells(rowId, colId))} />
    ));

  const boardComponent = Array(BOARD.ROW)
    .fill(0)
    .map((_, rowId) => (
      // eslint-disable-next-line react/no-array-index-key
      <div className={classes.row}>{createRow(rowId)}</div>
    ));

  return <div className={classes.board}>{boardComponent}</div>;
});
