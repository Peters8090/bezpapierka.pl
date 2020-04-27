import React, {useState} from 'react';

import {Box, Button, Step, StepContent, StepLabel, Typography, Stepper} from "@material-ui/core";

export const MyStepper = props => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Stepper orientation='vertical' activeStep={activeStep} style={{padding: 0}}>
            {
                props.steps.map(step => (
                    <Step key={step.title}>
                        <StepLabel>
                            <Typography variant='h5'>{step.title}</Typography>
                        </StepLabel>
                        <StepContent>
                            <Typography variant='body1' align='justify' style={{color: '#888'}}>
                                {step.description}
                            </Typography>
                            <Box pt={2}>
                                {
                                    activeStep < props.steps.length - 1 ? <Button variant="contained" color="primary"
                                                                                  onClick={() => setActiveStep(prevState => prevState + 1)}>
                                            Dalej
                                        </Button> :
                                        <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                                            Od nowa
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