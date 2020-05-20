import React from 'react';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Paper, Typography, useTheme} from '@material-ui/core';

export const Footer = () => {
  const theme = useTheme();

  const styles = {
    paper: css`
      padding: ${theme.spacing(1)};
    `,
    typography: css`
      text-transform: uppercase;
    `,
  };

  return (
      <footer>
        <Paper variant="outlined" css={styles.paper}>
          <Typography align='center' css={styles.typography}>
            (C) Copyright {new Date().getFullYear()}
          </Typography>
        </Paper>
      </footer>
  );
};