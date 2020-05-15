import React, {useContext} from 'react';

import {Typography, Box} from '@material-ui/core';

import {PagesContext, useCurrentPage} from '../../App';

export const HomePage = () => {
  const currentPage = useCurrentPage();

  return (
      <Box style={{padding: '20vh 10vw'}}>
        <Typography variant='h1' gutterBottom>
          {currentPage.heading}
        </Typography>
        <Typography variant='h4' style={{fontWeight: 'lighter'}}>
          {currentPage.subheading}
        </Typography>
      </Box>
  );
};