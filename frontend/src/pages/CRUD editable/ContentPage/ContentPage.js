import React from 'react';
import Container from '@material-ui/core/Container';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {PageTitle} from '../../../components/Miscellaneous/PageTitle';
import {useCurrentPage} from '../../../components/Pages/Pages';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';

export const ContentPage = () => {
  const currentPage = useCurrentPage();

  const theme = useTheme();
  const styles = {
    container: css`
      display: block;
      text-align: center;
    `,
    image: css`
      border-radius: ${theme.spacing(5)}px;
      margin: ${theme.spacing(4)}px 0;
      
      ${theme.breakpoints.up('md')} {
        min-width: 20vw;
        max-width: 60vw;
        
        min-height: 25vh;
        max-height: 35vh;
        
        object-fit: cover;
      }
      
      ${theme.breakpoints.down('sm')} {
        width: 70vw;
      }
    `,
    contentsText: css`
      font-weight: lighter;
    `,
  };

  return (
      <CRUDEditablePageWrapper>
        <PageTitle title={currentPage.title}/>
        <Container maxWidth='lg' css={styles.container}>
          <Typography
              variant='h3'
              display='block'
              align='justify'
              css={styles.contentsText}>
            {currentPage.contents}
          </Typography>
          {currentPage.image && (
              <img
                  src={currentPage.image}
                  alt={currentPage.title}
                  css={styles.image}/>
          )}
        </Container>
      </CRUDEditablePageWrapper>
  );
};