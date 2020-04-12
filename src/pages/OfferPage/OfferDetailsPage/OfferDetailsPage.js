import React, {useContext} from 'react';

import {Typography} from "@material-ui/core";

import {AppContext} from "../../../contexts/AppContext";

export const OfferDetailsPage = props => {
    const offer = useContext(AppContext).offers.find(offer => props.offerSlug === offer.slug);

    return (
        <div>
            <Typography variant='h5'>{offer.title}</Typography>
        </div>
    );
};