import React from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {CircularProgress} from '@material-ui/core';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const LoadingPage = () => {
  const styles = {
    root: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: white;
    `,
    circularProgress: css`
      color: black;
    `,
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
      <div css={styles.root}>
        <CircularProgress thickness={5} size={isMobile ? 75 : 100} disableShrink
                          css={styles.circularProgress}/>
      </div>
  );
};