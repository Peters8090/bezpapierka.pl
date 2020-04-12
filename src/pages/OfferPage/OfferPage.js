import React, {createRef, useState} from "react";

import {Typography, Dialog, Slide, Grow, Zoom, Fade} from "@material-ui/core";
import {Route, withRouter} from "react-router-dom";
import {OfferDetailsPage} from "./OfferDetailsPage/OfferDetailsPage";
import {Offers} from "./Offers/Offers";

import classes from './OfferPage.module.scss';


export const OfferPage = withRouter(props => {
    const dialogOnClose = () => props.history.push('/oferta');

    return (
        <div>
            <Typography variant='h1' align='center' className={classes.Title}>
                Nasze Kursy
            </Typography>
            <Offers/>

            <Route exact path={`${props.match.url}/:offerSlug`} children={({match}) => (
                <Dialog open={match != null}
                        fullScreen
                        onClose={dialogOnClose}>
                    {match && (
                        <OfferDetailsPage offerSlug={match.params.offerSlug} dialogOnClose={dialogOnClose}/>
                    )}
                </Dialog>
            )}/>
        </div>
    );
});