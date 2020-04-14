import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React, {useContext} from 'react';
import {withRouter} from "react-router-dom";

import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import {AppContext} from "../../../../contexts/AppContext";
import {OfferPageContext} from "../../OfferPage";

import classes from "./Offer.module.scss";

export const Offer = withRouter(props => {
        const offerPageContext = useContext(OfferPageContext);

        const offer = offerPageContext.misc.offers.find(offer => offer.id === props.id);
        const learnMoreText = offerPageContext.misc.learnMoreText;

        return (
            <div onClick={_ => props.history.push(`${props.match.url}/${offer.slug}`)} className={classes.Offer}>
                <Card className={classes.Card}>
                    <BrandCardHeader image={offer.image} extra={<Rating name="disabled" value={offer.rating} disabled/>}/>
                    <CardContent>
                        <TextInfoContent heading={offer.title}
                                         overline={offer.author}
                                         body={offer.description}/>
                        <Box p={1}/>
                        <Divider/>
                        <Box pt={2}>
                            <Typography variant='body1' align='right'>
                                <strong><i>{learnMoreText}</i></strong>
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        )
    }
);


Offer.propTypes = {
    id: PropTypes.any.isRequired
};