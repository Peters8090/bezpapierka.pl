import React, {useContext} from 'react';

import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import {Box, Divider, Typography, Card, CardContent} from "@material-ui/core";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";

import {OfferPageContext} from "../../OfferPage";

import classes from "./Offer.module.scss";

export const Offer = withRouter(props => {
        const offerPageContext = useContext(OfferPageContext);
        const offer = offerPageContext.offers.find(offer => offer.id === props.id);

        return (
            <Box m={2} onClick={_ => props.history.push(`${props.match.url}/${offer.slug}`)} className={classes.Offer}>
                <Card style={{width: '100%', height: '100%', borderRadius: 20}}>
                    <BrandCardHeader image={offer.image}/>
                    <CardContent>
                        <TextInfoContent heading={offer.title}
                                         overline={offer.superscription}
                                         body={offer.description}/>
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
        )
    }
);


Offer.propTypes = {
    id: PropTypes.any.isRequired
};