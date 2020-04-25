import React, {useContext} from 'react';

import {withRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import {Typography, Box, Avatar, AppBar, Toolbar, IconButton} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import {OfferPageContext} from "../OfferPage";
import {Sections} from "./Sections/Sections";

import classes from './OfferDetailsPage.module.scss';

export const OfferDetailsPage = withRouter(props => {
    const offerPageContext = useContext(OfferPageContext);
    const offer = offerPageContext.offers.find(offer => offer.slug === props.match.params.offerSlug);

    return (
        <div>
            <Helmet>
                <title>{offerPageContext.title} — {offer.title} | bezpapierka.pl</title>
                <meta name="description" content={offer.description} />
            </Helmet>

            <OfferDetailsPageContext.Provider value={{
                offer: offer,
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
                        <Sections/>
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