import React from 'react';
import {StylesProvider} from '@material-ui/core/styles';
import {BrowserRouter} from 'react-router-dom';

import {Auth} from './components/Auth/Auth';
import {Configuration} from './components/Configuration/Configuration';
import {GlobalStyle} from './components/GlobalStyle/GlobalStyle';
import {Pages} from './components/Pages/Pages';
import {Translation} from './components/Translation/Translation';
import {LoadingPage} from './pages/LoadingPage/LoadingPage';
import {importantData} from '../importantData';

export const AppContext = React.createContext({
  apiUrl: '',
});

const App = () => {
  return (
      <div className="App">
        <StylesProvider injectFirst>
          <GlobalStyle/>
          <BrowserRouter>
            <AppContext.Provider value={{
              apiUrl: importantData.apiUrl,
            }}>
              <LoadingPage/>
              <Auth>
                <Configuration>
                  <Translation>
                    <Pages/>
                  </Translation>
                </Configuration>
              </Auth>
            </AppContext.Provider>
          </BrowserRouter>
        </StylesProvider>
      </div>
  );
};

export default App;