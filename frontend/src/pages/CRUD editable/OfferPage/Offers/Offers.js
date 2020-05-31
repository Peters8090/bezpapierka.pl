import React, {useContext} from 'react';
import {Grid} from '@material-ui/core';

import {OfferPageContext} from '../OfferPage';
import {Offer} from './Offer/Offer';

export const Offers = () => {
  const offers = useContext(OfferPageContext).offers;

  return (
      <Grid container justify='center'>
        {offers.map(offer => (
            <Offer key={offer.id}
                   offer={offer}/>
        ))}
      </Grid>
  );
};