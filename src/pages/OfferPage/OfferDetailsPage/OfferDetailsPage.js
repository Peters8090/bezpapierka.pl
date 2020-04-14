import Divider from "@material-ui/core/Divider";
import React, {Fragment, useContext, useState} from 'react';

import {
    Stepper,
    Step,
    Typography,
    StepLabel,
    StepContent,
    Box,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
    Button
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import withRouter from "react-router-dom/es/withRouter";

import {OfferPageContext} from "../OfferPage";

import classes from './OfferDetailsPage.module.scss';
import {Paragraph} from "./Sections/Section/Paragraph/Paragraph";
import {Sections} from "./Sections/Sections";
import {MyStepper} from "./Sections/Section/Stepper/MyStepper";

export const OfferDetailsPage = withRouter(props => {
    const offerPageContext = useContext(OfferPageContext);
    const offer = offerPageContext.misc.offers.find(offer => offer.slug === props.match.params.offerSlug);
    console.log(props);

    return (
        <div>
            <OfferDetailsPageContext.Provider value={{
                offer: offer,
                page: offerPageContext.misc.offerDetailsPage,
            }}>
                <AppBar position='sticky' color='primary'>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.dialogOnClose}>
                            <CloseIcon/>
                        </IconButton>

                        <Box className={classes.HeadingWrapper} ml={2}>
                            <Avatar
                                alt={`${offer.title}`}
                                src={offer.image}
                                className={classes.Avatar}/>
                            <Box ml={1.5}>
                                <Typography variant='h6'>{offer.title}</Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                <main className={classes.Content}>
                    <Box p={5}>
                        <Sections />
                    </Box>
                </main>
            </OfferDetailsPageContext.Provider>
        </div>
    );
});

export const OfferDetailsPageContext = React.createContext({
    offer: {},
    page: {},
});