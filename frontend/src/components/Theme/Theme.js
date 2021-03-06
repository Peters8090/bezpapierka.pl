import React, {useContext} from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes';
import {ThemeProvider} from '@material-ui/core';
import {convertLanguageCodeToMaterialUILocale} from '../../utility';

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
  }, convertLanguageCodeToMaterialUILocale(configuration.language)));

  return (
      <ThemeProvider theme={getTheme()}>
        {children}
      </ThemeProvider>
  );
};