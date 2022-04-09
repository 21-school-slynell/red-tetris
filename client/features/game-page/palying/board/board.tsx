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
import { PieceSerializeProps } from 'server/socket/models/piece';
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
  ceil: ({ isSmall }: any) => ({
    border: `1px solid ${theme.palette.divider}`,
    width: isSmall ? 12 : 22,
    height: isSmall ? 12 : 22,
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
      <div className={classes.row}>{createRow(rowId)}</div>
    ));

  return <div>{boardComponent}</div>;
});
