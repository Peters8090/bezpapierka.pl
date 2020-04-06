import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import * as colors from '@material-ui/core/colors';

import { Layout } from './components/Layout/Layout';
import { HomePage } from './pages/HomePage/HomePage';
import { ContactPage } from './pages/ContactPage/ContactPage';

import { StyleRoot } from 'radium';

const theme = createMuiTheme({
    palette: {
        primary: colors.indigo,
        secondary: colors.amber,
        error: colors.red,
        info: colors.cyan,
        success: colors.lightGreen,
    },
});

const App = props => {
    return (
        <div className="App">
            <StyleRoot>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <Layout>
                            <Switch>
                                <Route path="/"
                                       exact
                                       component={HomePage} />
                                <Route path="/kontakt"
                                       exact
                                       component={ContactPage} />
                            </Switch>
                        </Layout>
                    </ThemeProvider>
                </BrowserRouter>
            </StyleRoot>
        </div>
    );
};

export default App;