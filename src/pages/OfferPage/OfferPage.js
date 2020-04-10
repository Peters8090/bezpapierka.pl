import React from "react";

import Typography from "@material-ui/core/Typography";
import {Offers} from "./Offers/Offers";

import classes from './OfferPage.module.scss';

export const OfferPage = props => {
    return (
        <div>
            <Typography variant='h1' align='center' className={classes.Title}>
                Nasze Kursy
            </Typography>
            <Offers/>
        </div>
    );
};