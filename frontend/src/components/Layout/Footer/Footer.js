import React, {useContext} from 'react';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Paper, Typography, useTheme} from '@material-ui/core';
import {ConfigurationContext} from '../../Configuration/Configuration';
import {WaveBorder} from '../../Miscellaneous/WaveBorder';
import {LayoutContext} from '../Layout';

export const Footer = () => {
  const theme = useTheme();
  const styles = {
    paper: css`
      padding: ${theme.spacing(1)}px;
    `,
  };

  return (
      <React.Fragment>
        <WaveBorder/>
        <Paper component='footer' square css={styles.paper}>
          <Typography align='center' css={styles.typography}>
            (C) COPYRIGHT {new Date().getFullYear()}
          </Typography>
        </Paper>
      </React.Fragment>
  );
};