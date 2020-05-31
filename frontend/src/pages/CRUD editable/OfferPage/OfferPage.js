import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import {Dialog, useTheme} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {Route, withRouter, useHistory, useRouteMatch} from 'react-router-dom';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {OfferAdmin} from '../../../components/CRUD/Admins/OfferPage/OfferAdmin';
import {LoggedInOnly} from '../../../components/Auth/LoggedInOnly';
import {PageTitle} from '../../../components/Miscellaneous/PageTitle';
import {useCurrentPage} from '../../../components/Pages/Pages';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';
import {OfferDetailsPage} from './OfferDetailsPage/OfferDetailsPage';
import {Offers} from './Offers/Offers';

export const OfferPage = withRouter(props => {
  const page = useCurrentPage();

  const history = useHistory();
  const match = useRouteMatch();

  const dialogOnClose = () => history.push(page.link);

  const [offerAddDialogOpen, setOfferAddDialogOpen] = useState(false);

  const theme = useTheme();
  const styles = {
    addIcon: css`
      font-size: 70px;
      ${theme.breakpoints.down('sm')} {
        font-size: 40px;
      }
    `,
  };

  return (
      <CRUDEditablePageWrapper>
        <OfferPageContext.Provider value={page}>
          <LoggedInOnly>
            <OfferAdmin setOpen={setOfferAddDialogOpen}
                        open={offerAddDialogOpen}/>
          </LoggedInOnly>

          <PageTitle title={page.title} trailing={
            <LoggedInOnly>
              <IconButton onClick={() => setOfferAddDialogOpen(true)}>
                <AddIcon css={styles.addIcon}/>
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
      </CRUDEditablePageWrapper>
  );
});

export const OfferPageContext = React.createContext({});