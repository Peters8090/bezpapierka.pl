import React, {useContext} from "react";

import Grid from "@material-ui/core/Grid";
import {AppContext} from "../../../contexts/AppContext";
import {Offer} from "./Offer/Offer";

import classes from './Offers.module.scss';

export const Offers = () => {
    const appContext = useContext(AppContext);

    return (
        <div className={classes.Offers}>
            {
                appContext.offers.map(offer => (
                    <Offer key={offer.title}
                           title={offer.title}
                           description={offer.description}
                           image={offer.image}
                           author={offer.author}
                           rating={offer.rating}/>
                ))
            }
        </div>
    );
};