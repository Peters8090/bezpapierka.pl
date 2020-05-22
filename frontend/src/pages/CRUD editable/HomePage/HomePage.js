import React, {useContext, useEffect} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Typography, Box} from '@material-ui/core';
import {LayoutContext} from '../../../components/Layout/Layout';
import {useCurrentPage} from '../../../components/Pages/Pages';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';

export const HomePage = () => {
  const currentPage = useCurrentPage();

  return (
      <CRUDEditablePageWrapper>
        <Box css={{padding: '20vh 10vw'}}>
          <Typography variant='h1' gutterBottom>
            {currentPage.heading}
          </Typography>
          <Typography variant='h4' css={{fontWeight: 'lighter'}}>
            {currentPage.subheading}
          </Typography>
        </Box>
      </CRUDEditablePageWrapper>
  );
};