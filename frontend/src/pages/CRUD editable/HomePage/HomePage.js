import React, {useContext, useEffect} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Typography, Box} from '@material-ui/core';
import {useCurrentPage} from '../../../App';
import {LayoutContext} from '../../../components/Layout/Layout';

export const HomePage = () => {
  const currentPage = useCurrentPage();
  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    layoutContext.setBackgroundImageURL(currentPage.background_image);

    return () => {
      layoutContext.setBackgroundImageURL('');
    };
  }, [currentPage.background_image]);

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