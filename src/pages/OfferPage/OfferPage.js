import React, {useContext} from "react";

import {Typography, Dialog} from "@material-ui/core";
import {Route, withRouter} from "react-router-dom";

import {AppContext} from "../../contexts/AppContext";
import {OfferDetailsPage} from "./OfferDetailsPage/OfferDetailsPage";
import {Offers} from "./Offers/Offers";

import classes from './OfferPage.module.scss';


export const OfferPage = withRouter(props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    const dialogOnClose = () => props.history.push(page.link);

    return (
        <div>
            <OfferPageContext.Provider value={page}>
                <Typography variant='h1' align='center' className={classes.Title}>
                    {page.misc.title}
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
            </OfferPageContext.Provider>
        </div>
    );
});

export const OfferPageContext = React.createContext({});