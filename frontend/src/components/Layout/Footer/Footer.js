import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Paper, Typography, useTheme} from '@material-ui/core';

export const Footer = _ => {
  const theme = useTheme();
  return (
      <footer>
        <Paper variant="outlined" css={{padding: theme.spacing(1)}}>
          <Typography align='center' css={{textTransform: 'uppercase'}}>
            (C) Copyright 2020
          </Typography>
        </Paper>
      </footer>
  );
};