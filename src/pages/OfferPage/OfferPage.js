import React from "react";
import {WaveBorder} from "../../components/UI/WaveBorder/WaveBorder";

import {Offer} from "./Offer/Offer";
import Grid from "@material-ui/core/Grid";

import classes from './OfferPage.module.scss';

export const OfferPage = props => {
    return (
        <div className={classes.OfferPage}>
            <Grid container justify='center'>
                <Offer/>
                <Offer/>
            </Grid>
            <WaveBorder/>
        </div>
    );
};