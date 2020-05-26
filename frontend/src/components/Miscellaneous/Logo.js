import React, {useContext} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Typography, Box, useTheme} from '@material-ui/core';
import {ConfigurationContext} from '../Configuration/Configuration';

export const Logo = () => {
  const configurationContext = useContext(ConfigurationContext).configuration;
  const theme = useTheme();

  return (
      <Box display='flex'>
        {
          configurationContext.logo ? (
              <img alt='logo' src={configurationContext.logo} css={{
                borderRadius: theme.spacing(1),
                maxWidth: theme.spacing(20),
                height: theme.spacing(3.5),
              }}/>
          ) : (
              <Typography variant='h6'
                          color='primary'
                          css={{fontFamily: "'Bree Serif', serif"}}>
                {configurationContext.site_name}
              </Typography>
          )
        }
      </Box>
  );
};