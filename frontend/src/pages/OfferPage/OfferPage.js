import IconButton from '@material-ui/core/IconButton';
import React, {useContext, useState} from 'react';
import {Dialog} from '@material-ui/core';
import {Route, withRouter} from 'react-router-dom';
import {DialogWithProps} from '../../components/CRUD/DialogForm/DialogForm';
import {OfferAdmin} from '../../components/CRUD/OfferAdmin';
import {PageTitle} from '../../components/Miscellaneous/PageTitle';
import {PagesContext} from '../../App';
import {OfferDetailsPage} from './OfferDetailsPage/OfferDetailsPage';
import {Offers} from './Offers/Offers';
import AddIcon from '@material-ui/icons/Add';

export const OfferPage = withRouter(props => {
  const page = useContext(PagesContext).find(page => props.pageId === page.id);

  const dialogOnClose = () => props.history.push(page.link);

  const [offerAddDialogOpen, setOfferAddDialogOpen] = useState(false);

  return (
      <div>
        <OfferPageContext.Provider value={page}>
          <DialogWithProps setOpen={setOfferAddDialogOpen} open={offerAddDialogOpen}>
            <OfferAdmin/>
          </DialogWithProps>

          <PageTitle title={page.title}/>
          <IconButton onClick={() => setOfferAddDialogOpen(true)}>
            <AddIcon style={{width: 70, height: 70}}/>
          </IconButton>
          <Offers/>
          <Route exact path={`${props.match.url}/:offerSlug`}
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