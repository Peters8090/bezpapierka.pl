import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useState} from 'react';

/** @jsx jsx */
import {jsx} from '@emotion/core';

import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {
  Box,
  Divider,
  Typography,
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import {DialogWithProps} from '../../../../components/CRUD/DialogForm/DialogForm';
import {OfferAdmin} from '../../../../components/CRUD/OfferAdmin';

import {OfferPageContext} from '../../OfferPage';

export const Offer = withRouter(props => {
      const offer = useContext(OfferPageContext).
          offers.
          find(offer => offer.id === props.id);

      const styles = {
        root: {
          userSelect: 'none',
          transition: '0.3s cubic-bezier(.47, 1.64, .41, .8)',
          ':hover': {
            transform: 'scale(1.04)',
            cursor: 'pointer',
          },
        },
      };

      const [offerEditDialogOpen, setOfferEditDialogOpen] = useState(false);

      return (
          <Grid item
                md={5}
                onClick={_ => !offerEditDialogOpen && props.history.push(
                    `${props.match.url}/${offer.slug}`)}
                css={styles.root}>

            <DialogWithProps setOpen={setOfferEditDialogOpen}
                             open={offerEditDialogOpen}>
              <OfferAdmin offer={offer}/>
            </DialogWithProps>

            <Box m={2} mt={5}>
              <Card style={{width: '100%', height: '100%', borderRadius: 20}}>
                <BrandCardHeader image={offer.image} extra={(
                    <IconButton onClick={event => {
                      event.stopPropagation();
                      setOfferEditDialogOpen(true);
                    }}>
                      <EditIcon/>
                    </IconButton>
                )}/>
                <CardContent>
                  <TextInfoContent heading={offer.title}
                                   overline={offer.superscription}
                                   body={
                                     <Typography color='textPrimary'>
                                       {offer.description}
                                     </Typography>
                                   }/>
                  <Box p={1}/>
                  <Divider/>
                  <Box pt={2}>
                    <Typography variant='body1' align='right'>
                      <strong><i>Dowiedz się więcej...</i></strong>
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
      );
    },
);

Offer.propTypes = {
  id: PropTypes.any.isRequired,
};