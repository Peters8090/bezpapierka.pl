import React from 'react';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Typography, useTheme} from '@material-ui/core';

export const PageTitle = props => {
  const styles = {
    root: css`
      font-weight: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  };

  return (
      <Typography variant='h1'
                  align='center'
                  gutterBottom
                  css={styles.root}>
        {props.title}
        {props.trailing}
      </Typography>
  );
};