import React, {useContext} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Typography, Box, useTheme} from '@material-ui/core';
import {ConfigurationContext} from '../../App';

export const Logo = () => {
  const configurationContext = useContext(ConfigurationContext);

  const theme = useTheme();

  return (
      <Box display='flex'>
        {
          configurationContext.logo ? (
              <img alt='logo' src={configurationContext.logo} css={{
                borderRadius: '5px',
                minWidth: '50px',
                maxWidth: '150px',
                minHeight: `calc(${theme.misc.headerHeight} * 0.5)`,
                maxHeight: `calc(${theme.misc.headerHeight} * 0.75)`,
              }}/>
          ) : (
              <Typography variant='h6'
                          color='secondary'
                          css={{fontFamily: "'Bree Serif', serif"}}>
                {configurationContext.site_name}
              </Typography>
          )
        }
      </Box>
  );
};