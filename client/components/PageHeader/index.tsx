import React, { FC } from 'react';
import { Box, Typography } from '@material-ui/core';

interface PageHeaderProps {
  title: string;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, children }) => (
  <Box mb="40px">
    <>
      <Typography variant="h3">{title}</Typography>
      {children}
    </>
  </Box>
);
