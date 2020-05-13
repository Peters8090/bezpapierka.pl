import React, {useContext} from 'react';

import {Typography, Box} from '@material-ui/core';
import {ConfigurationContext} from '../../App';

export const Logo = () => {
  const configurationContext = useContext(ConfigurationContext);

  return (
      <Box display='flex'>
        <Typography variant='h6'
                    color='secondary'
                    style={{fontFamily: "'Bree Serif', serif"}}>
          {configurationContext.site_name}
        </Typography>
      </Box>
  );
};