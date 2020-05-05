import React from 'react';

import {Paper, Typography, useTheme} from '@material-ui/core';

export const Footer = _ => {
  const theme = useTheme();
  return (
      <footer>
        <Paper variant="outlined" style={{padding: theme.spacing(1)}}>
          <Typography align='center' style={{textTransform: 'uppercase'}}>
            (C) Copyright 2020
          </Typography>
        </Paper>
      </footer>
  );
};