import React, {useState} from "react";

import {Typography, Dialog, Slide} from "@material-ui/core";
import {Route, withRouter} from "react-router-dom";
import {OfferDetailsPage} from "./OfferDetailsPage/OfferDetailsPage";
import {Offers} from "./Offers/Offers";

import classes from './OfferPage.module.scss';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const OfferPage = withRouter(props => {
    return (
        <div>
            <Typography variant='h1' align='center' className={classes.Title}>
                Nasze Kursy
            </Typography>
            <Offers/>

            <Route exact path={`${props.match.url}/:offerSlug`} children={({match}) => (
                <Dialog open={match}
                        onClose={() => props.history.push('/oferta')} TransitionComponent={Transition}>
                    {match && (
                        <OfferDetailsPage offerSlug={match.params.offerSlug}/>
                    )}
                </Dialog>
            )}/>
        </div>
    );
});