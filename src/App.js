import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createMuiTheme, ThemeProvider} from '@material-ui/core';
import {StylesProvider} from '@material-ui/styles';

import {Layout} from './components/Layout/Layout';
import {HomePage} from './pages/HomePage/HomePage';
import {ContactPage} from './pages/ContactPage/ContactPage';

import colors from './scss-partials/_colors.scss';
import constants from './scss-partials/_constants.scss';

const theme = createMuiTheme({
    palette: {
        primary: {main: colors['primary']},
        secondary: {main: colors['secondary']},
        error: {main: colors['error']},
        info: {main: colors['info']},
        success: {main: colors['success']},
    },
    other: {
        headerHeight: parseFloat(constants['header-height']) * parseFloat(getComputedStyle(document.documentElement).fontSize),
    }
});

const App = props => {
    return (
        <div className="App">
            <StylesProvider injectFirst>
                <BrowserRouter basename="/react/bezpapierka.pl">
                    <ThemeProvider theme={theme}>
                        <Layout>
                            <Switch>
                                <Route path="/"
                                       exact
                                       component={HomePage}/>
                                <Route path="/kontakt"
                                       exact
                                       component={ContactPage}/>
                            </Switch>
                        </Layout>
                    </ThemeProvider>
                </BrowserRouter>
            </StylesProvider>
        </div>
    );
};

export default App;