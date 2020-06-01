import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';
import {Typography, Box} from '@material-ui/core';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {useCurrentPage} from '../../../components/Pages/Pages';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';

export const HomePage = () => {
  const currentPage = useCurrentPage();

  const theme = useTheme();
  const styles = {
    wrapper: css`
      padding: 22vh 10vw;
      ${theme.breakpoints.down('sm')} {
        padding: 12vh 10vw;
      }
    `,
    subheading: css`
      font-weight: lighter;
    `,
  };

  return (
      <CRUDEditablePageWrapper>
        <Box css={styles.wrapper}>
          <Typography variant='h1' gutterBottom>
            {currentPage.heading}
          </Typography>
          <Typography variant='h4' css={styles.subheading}>
            {currentPage.subheading}
          </Typography>
        </Box>
      </CRUDEditablePageWrapper>
  );
};