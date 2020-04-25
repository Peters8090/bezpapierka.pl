import React, {useContext} from "react";

import {OfferPageContext} from "../OfferPage";
import {Offer} from "./Offer/Offer";

import classes from './Offers.module.scss';

export const Offers = () => {
    const offers = useContext(OfferPageContext).offers;

    return (
        <div className={classes.Offers}>
            {
                offers.map(offer => (
                    <Offer key={offer.id}
                            id={offer.id} />
                ))
            }
        </div>
    );
};