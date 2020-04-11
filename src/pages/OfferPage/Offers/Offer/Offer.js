import React, {useContext} from 'react';

import PropTypes from 'prop-types';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import Rating from "@material-ui/lab/Rating";
import BrandCardHeader from "@mui-treasury/components/cardHeader/brand";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import {Link, withRouter} from "react-router-dom";
import {AppContext} from "../../../../contexts/AppContext";

import classes from "./Offer.module.scss";

export const Offer = withRouter(props => {
        const offer = useContext(AppContext).offers.find(offer => offer.id === props.id);

        return <Link to={`${props.match.url}/${offer.slug}`} className={classes.Offer}>
            <Card className={classes.Card}>
                <BrandCardHeader image={offer.image}
                                 extra={<Rating name="disabled" value={offer.rating} disabled/>}/>
                <CardContent>
                    <TextInfoContent overline={offer.author}
                                     heading={offer.title}
                                     body={offer.description}/>
                </CardContent>
            </Card>
        </Link>
    }
);


Offer.propTypes = {
    id: PropTypes.any.isRequired
};