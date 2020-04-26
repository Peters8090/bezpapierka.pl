import React, {useContext} from "react";

import {Dialog} from "@material-ui/core";
import {Route, withRouter} from "react-router-dom";
import {PageTitle} from "../../components/UI/PageTitle";

import {PagesContext} from "../../contexts/PagesContext";
import {OfferDetailsPage} from "./OfferDetailsPage/OfferDetailsPage";
import {Offers} from "./Offers/Offers";


export const OfferPage = withRouter(props => {
    const page = useContext(PagesContext).find(page => props.pageId === page.id);

    const dialogOnClose = () => props.history.push(page.link);

    return (
        <div>
            <OfferPageContext.Provider value={page}>
                <PageTitle title={page.title}/>

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