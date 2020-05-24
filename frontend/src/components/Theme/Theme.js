import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import {plPL} from '@material-ui/core/locale';
import React, {useContext} from 'react';
import {ConfigurationContext} from '../Configuration/Configuration';

export const Theme = ({children}) => {
  const configuration = useContext(ConfigurationContext).configuration;

  const getTheme = () => responsiveFontSizes(createMuiTheme({
    palette: {
      type: configuration.theme,
      primary: {main: configuration.primary_color},
      secondary: {main: configuration.secondary_color},
    },
    typography: {
      fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe Miscellaneous", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe Miscellaneous Emoji", "Segoe Miscellaneous Symbol"',
    },
    misc: {
      waveBorderHeight: '5vh',
    },
  }, plPL));

  return (
      <ThemeProvider theme={getTheme()}>
        {children}
      </ThemeProvider>
  );
};