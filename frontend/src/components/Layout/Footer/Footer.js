import React, {useContext} from 'react';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Paper, Typography, useTheme} from '@material-ui/core';
import {ConfigurationContext} from '../../Configuration/Configuration';
import {WaveBorder} from '../../Miscellaneous/WaveBorder';

export const Footer = () => {
  const wave_border_height = useContext(ConfigurationContext).configuration.wave_border_height;

  const theme = useTheme();
  const styles = {
    paper: css`
      padding: ${theme.spacing(1)}px;
    `,
  };

  return (
      <React.Fragment>
        <WaveBorder height={wave_border_height}/>
        <Paper component='footer' square css={styles.paper}>
          <Typography align='center' css={styles.typography}>
            (C) COPYRIGHT {new Date().getFullYear()}
          </Typography>
        </Paper>
      </React.Fragment>
  );
};