import React from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Typography, useTheme} from '@material-ui/core';

export const PageTitle = props => {
  return (
      <Typography variant='h1'
                  align='center'
                  component='span'
                  gutterBottom
                  css={{
                    fontWeight: 'normal',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
        {props.title}
        {props.trailing}
      </Typography>
  );
};