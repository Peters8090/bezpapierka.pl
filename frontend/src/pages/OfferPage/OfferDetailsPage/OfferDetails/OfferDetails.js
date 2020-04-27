import React, {useContext} from 'react';

import {Box, Container, Divider, Typography} from "@material-ui/core";

import {OfferDetailsPageContext} from "../OfferDetailsPage";
import {MyStepper} from "./MyStepper/MyStepper";

export const OfferDetails = _ => {
    const offerDetailsPageContext = useContext(OfferDetailsPageContext);

    return (
        <Container maxWidth='md'>
            {offerDetailsPageContext.sections.map(section => {
                return (
                    <Detail key={section.title} title={section.title}>
                        <Typography variant='body2' align='justify'>
                            {section.contents}
                        </Typography>
                    </Detail>
                );
            })}
            {offerDetailsPageContext.steps.length > 0 &&
            (
                <Detail title='Etapy'>
                    <MyStepper steps={offerDetailsPageContext.steps}/>
                </Detail>
            )}
        </Container>
    );
};

const Detail = props => (
    <section>
        <Box p={4}>
            <Typography variant='h3' align='center' gutterBottom>
                {props.title}
            </Typography>
            {props.children}
        </Box>
        <Divider/>
    </section>
);