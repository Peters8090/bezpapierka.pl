import React, {useContext} from "react";

import {AppContext} from "../../../contexts/AppContext";
import {Offer} from "./Offer/Offer";

import classes from './Offers.module.scss';

export const Offers = () => {
    const appContext = useContext(AppContext);

    return (
        <div className={classes.Offers}>
            {
                appContext.offers.map(offer => (
                    <Offer key={offer.id}
                            id={offer.id} />
                ))
            }
        </div>
    );
};