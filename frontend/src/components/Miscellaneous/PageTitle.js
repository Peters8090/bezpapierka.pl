import React from 'react';

import {Typography, useTheme} from '@material-ui/core';

export const PageTitle = props => {
  return (
      <Typography variant='h1'
                  align='center'
                  gutterBottom
                  style={{
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