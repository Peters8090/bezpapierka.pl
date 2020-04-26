import React, {useContext} from 'react';

import {OfferDetailsPageContext} from "../OfferDetailsPage";
import {Section} from "./Section/Section";

export const Sections = props => {
    const offerDetailsPageContext = useContext(OfferDetailsPageContext);

    return (
        <>
            <Section type='Stepper' title='Kroki'/>
            {offerDetailsPageContext.offer.sections.map(section => {
                return <Section {...section} key={section.title}/>;
            })}
        </>
    );
};