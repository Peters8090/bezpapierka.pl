import React from "react";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

import {WaveBorder} from "../../components/UI/WaveBorder/WaveBorder";
import {Offers} from "./Offers/Offers";

import classes from './OfferPage.module.scss';

export const OfferPage = props => {
    return (
        <div className={classes.OfferPage}>
            <Typography variant='h1' align='center' className={classes.Title}>
                Nasze Kursy
            </Typography>
            <Offers/>
            <WaveBorder/>
        </div>
    );
};