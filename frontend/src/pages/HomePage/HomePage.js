import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Typography, Box} from '@material-ui/core';
import {useCurrentPage} from '../../App';

export const HomePage = () => {
  const currentPage = useCurrentPage();

  return (
      <div>
        <Box css={{padding: '20vh 10vw'}}>
          <Typography variant='h1' gutterBottom>
            {currentPage.heading}
          </Typography>
          <Typography variant='h4' css={{fontWeight: 'lighter'}}>
            {currentPage.subheading}
          </Typography>
        </Box>
      </div>
  );
};