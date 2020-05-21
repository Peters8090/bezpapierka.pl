import IconButton from '@material-ui/core/IconButton';
import React, {useContext, useState} from 'react';
import {Dialog, useTheme} from '@material-ui/core';
import {Route, withRouter, useHistory, useRouteMatch} from 'react-router-dom';
import {OfferAdmin} from '../../../components/CRUD/Admins/OfferPage/OfferAdmin';
import {LoggedInOnly} from '../../../components/Miscellaneous/LoggedInOnly';
import {PageTitle} from '../../../components/Miscellaneous/PageTitle';
import {PagesContext, useCurrentPage} from '../../../App';
import {OfferDetailsPage} from './OfferDetailsPage/OfferDetailsPage';
import {Offers} from './Offers/Offers';
import AddIcon from '@material-ui/icons/Add';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const OfferPage = withRouter(props => {
  const page = useCurrentPage();
  const history = useHistory();
  const match = useRouteMatch();

  const dialogOnClose = () => history.push(page.link);

  const [offerAddDialogOpen, setOfferAddDialogOpen] = useState(false);

  const theme = useTheme();

  return (
      <div>
        <OfferPageContext.Provider value={page}>
          <LoggedInOnly>
            <OfferAdmin setOpen={setOfferAddDialogOpen}
                        open={offerAddDialogOpen}/>
          </LoggedInOnly>

          <PageTitle title={page.title} trailing={
            <LoggedInOnly>
              <IconButton onClick={() => setOfferAddDialogOpen(true)}>
                <AddIcon css={{
                  fontSize: 70,
                  [theme.breakpoints.down('sm')]: {
                    fontSize: 40,
                  },
                }}/>
              </IconButton>
            </LoggedInOnly>
          }/>
          <Offers/>
          <Route exact path={`${match.url}/:offerSlug`}
                 children={({match}) => (
                     <Dialog open={match != null}
                             fullScreen
                             onClose={dialogOnClose}>
                       {match && (
                           <OfferDetailsPage offerSlug={match.params.offerSlug}
                                             dialogOnClose={dialogOnClose}/>
                       )}
                     </Dialog>
                 )}/>
        </OfferPageContext.Provider>
      </div>
  );
});

export const OfferPageContext = React.createContext({});