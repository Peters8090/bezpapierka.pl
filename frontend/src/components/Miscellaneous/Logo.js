import React, {useContext} from 'react';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Typography, Box, useTheme} from '@material-ui/core';
import {ConfigurationContext} from '../Configuration/Configuration';

export const Logo = () => {
  const configuration = useContext(ConfigurationContext).configuration;

  const theme = useTheme();
  const styles = {
    img: css`
      border-radius: ${theme.spacing(1)}px;
      max-width: ${theme.spacing(20)}px;
      height: ${theme.spacing(3.5)}px;
    `,
    typography: css`
      font-family: 'Bree Serif', serif;
    `,
  };

  return (
      <Box display='flex'>
        {
          configuration.logo ? (
              <img alt='logo' src={configuration.logo} css={styles.img}/>
          ) : (
              <Typography variant='h6'
                          color='primary'
                          css={styles.typography}>
                {configuration.site_name}
              </Typography>
          )
        }
      </Box>
  );
};