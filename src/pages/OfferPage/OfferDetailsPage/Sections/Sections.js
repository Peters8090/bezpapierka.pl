import {Box, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {OfferDetailsPageContext} from "../OfferDetailsPage";
import classes from "../OfferDetailsPage.module.scss";
import {Paragraph} from "./Section/Paragraph/Paragraph";
import {MyStepper} from "./Section/Stepper/MyStepper";
import {Section} from "./Section/Section";

export const Sections = props => {
    const offerDetailsPageContext = useContext(OfferDetailsPageContext);

    // const a = (
    //     <>
    //         {props.sections.map(section => {
    //             if (section.title === 'Stepper')
    //                 return (
    //                     <section className={classes.Section}>
    //                         <Typography variant='h3' align='center' gutterBottom>
    //                             {offerPageContext.misc.offerDetailsPage.stepperTitle}
    //                         </Typography>
    //
    //                         <MyStepper offer={offer} nextText={offerPageContext.misc.offerDetailsPage.nextText}
    //                                    againText={offerPageContext.misc.offerDetailsPage.againText}/>
    //                     </section>
    //                 );
    //             else
    //                 return (
    //                     <section className={classes.Section}>
    //                         <Paragraph title={section.title} body={section.body}/>
    //                     </section>
    //                 );
    //         })}
    //     </>
    // );

    return (
        <>
            {offerDetailsPageContext.offer.sections.map(section => {
                return <Section {...section}/>;
            })}
        </>
    );
};