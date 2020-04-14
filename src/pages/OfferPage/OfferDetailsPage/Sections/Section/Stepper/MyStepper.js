import {Box, Button, Step, StepContent, StepLabel, Typography, Stepper} from "@material-ui/core";
import React, {useContext, useState} from 'react';
import {OfferDetailsPageContext} from "../../../OfferDetailsPage";

export const MyStepper = props => {
    const [activeStep, setActiveStep] = useState(0);

    const offerDetailsPageContext = useContext(OfferDetailsPageContext);

    return (
        <Stepper orientation='vertical' activeStep={activeStep} style={{
            padding: 0,
        }}>
            {
                offerDetailsPageContext.offer.steps.map(step => (
                    <Step key={step.name}>
                        <StepLabel>
                            <Typography variant='h5'>{step.name}</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography variant='body2' align='justify' style={{
                                color: '#888'
                            }}>{step.description}
                            </Typography>
                            <Box pt={2}>
                                {
                                    activeStep < 2 ? <Button variant="contained" color="primary"
                                                             onClick={() => setActiveStep(prevState => prevState + 1)}>
                                            {offerDetailsPageContext.page.nextText}
                                        </Button> :
                                        <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                                            {offerDetailsPageContext.page.againText}
                                        </Button>
                                }
                            </Box>
                        </StepContent>
                    </Step>
                ))
            }
        </Stepper>
    );
};