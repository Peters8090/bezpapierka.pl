import React from 'react';
import {Grid} from '@material-ui/core';

import {useCurrentPage} from '../../../../components/Pages/Pages';
import {Offer} from './Offer/Offer';

export const Offers = () => {
  const offers = useCurrentPage().offers;

  return (
      <Grid container justify='center'>
        {offers.map(offer => (
            <Offer key={offer.id}
                   offer={offer}/>
        ))}
      </Grid>
  );
};