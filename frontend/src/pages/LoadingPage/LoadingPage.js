import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
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
      @keyframes changeColor {
        12.5% {
          color: #FF0000;
        }
        25% {
          color: #FFA500;
        }
        37.5% {
          color: #FFFF00;
        }
        50% {
          color: #7FFF00;
        }
        62.5% {
          color: #00FFFF;
        }
        75% {
          color: #0000FF;
        }
        87.5% {
          color: #9932CC;
        }
        100% {
          color: #FF1493;
        }
      }
      
      //color: black;      
      animation: MuiCircularProgress-keyframes-circular-rotate 1.4s linear infinite, changeColor 2s linear infinite;
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