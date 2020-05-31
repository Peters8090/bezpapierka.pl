import React from 'react';
import Box from '@material-ui/core/Box';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ThemeProvider} from '@material-ui/core';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const NotFoundPage = () => {
  const styles = {
    root: css`
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
    `,
  };

  const currentTheme = useTheme();

  const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'));

  const theme = responsiveFontSizes(createMuiTheme({
    ...currentTheme,
    typography: {
      ...currentTheme.typography,
      h1: {
        ...currentTheme.typography.h1,
        fontSize: isMobile ? 250 : 300,
      },
      h3: {
        ...currentTheme.typography.h3,
        fontSize: isMobile ? 60 : 100,
      },
    },
  }));

  return (
      <ThemeProvider theme={theme}>
        <Box css={styles.root}>
          <Typography variant='h1' align='center'>
            404
          </Typography>
          <Typography variant='h3' align='center'>
            Nie znaleziono
          </Typography>
        </Box>
      </ThemeProvider>
  );
};
