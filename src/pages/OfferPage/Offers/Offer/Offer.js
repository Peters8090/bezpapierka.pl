import React from 'react';

import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";

import classes from "./Offer.module.scss";

export const Offer = props => (
    <Card className={classes.Offer}>
        <BrandCardHeader image={props.image}
                         extra={<Rating name="disabled" value={props.rating} disabled/>}/>
        <CardContent>
            <TextInfoContent overline={props.author}
                             heading={props.title}
                             body={props.description}/>
        </CardContent>
    </Card>
);


Offer.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};