import React, {useContext} from 'react';

import {withRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import {
    Typography,
    Box,
    Avatar,
    AppBar,
    Toolbar,
    IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {ConfigurationContext} from '../../../App';

import {OfferPageContext} from "../OfferPage";
import {OfferDetails} from "./OfferDetails/OfferDetails";


export const OfferDetailsPage = withRouter(props => {
    const offerPageContext = useContext(OfferPageContext);

    const offer = offerPageContext.offers.find(offer => offer.slug === props.match.params.offerSlug);
    const site_name = useContext(ConfigurationContext).site_name;

    return (
        <div>
            <Helmet>
                <title>{offerPageContext.title} — {offer.title} | {site_name}</title>
                <meta name="description" content={offer.description}/>
            </Helmet>

            <OfferDetailsPageContext.Provider value={offer}>
                <AppBar position='sticky' color='primary'>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={props.dialogOnClose}>
                            <CloseIcon/>
                        </IconButton>

                        <Box ml={2}
                             display='flex'
                             justifyContent='center'
                             alignItems='center'>
                            <Avatar
                                alt={offer.title}
                                src={offer.image}
                                style={{fontSize: 36}}/>
                            <Box ml={1.5}>
                                <Typography variant='h6'>{offer.title}</Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>

                <Box p={5}
                     display='flex'
                     flexDirection='column'
                     alignItems='center'>
                    <OfferDetails/>
                </Box>
            </OfferDetailsPageContext.Provider>
        </div>
    );
});

export const OfferDetailsPageContext = React.createContext({});