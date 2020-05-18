import EditIcon from '@material-ui/icons/Edit';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useContext, useState} from 'react';

import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Typography,
  Stepper, IconButton,
} from '@material-ui/core';
import {StepAdmin} from '../../../../../components/CRUD/Admins/OfferPage/StepAdmin';
import {LoggedInOnly} from '../../../../../components/Miscellaneous/LoggedInOnly';
import {OfferDetailsPageContext} from '../../OfferDetailsPage';

export const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const offerDetailsPageContext = useContext(OfferDetailsPageContext);

  const steps = offerDetailsPageContext.steps;

  return (
      <Stepper orientation='vertical' activeStep={activeStep}
               css={{padding: 0}}>
        {
          steps.map(step => (
              <Step key={step.id}>
                <StepLabel>
                  <Typography variant='h5' css={{
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    {step.title}
                    <LoggedInOnly>
                      <StepCrudFunctionality step={step}/>
                    </LoggedInOnly>
                  </Typography>
                </StepLabel>

                <StepContent>
                  <Typography variant='body1' align='justify'
                              css={{color: '#888'}}>
                    {step.description}
                  </Typography>
                  <Box pt={2}>
                    {
                      activeStep < steps.length - 1 ? <Button
                              variant="contained" color="primary"
                              onClick={() => setActiveStep(
                                  prevState => prevState + 1)}>
                            Dalej
                          </Button> :
                          <Button variant="contained" color="primary"
                                  onClick={() => setActiveStep(0)}>
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

const StepCrudFunctionality = ({step}) => {
  const [stepEditDialogOpen, setStepEditDialogOpen] = useState(false);
  const offerDetailsPageContext = useContext(OfferDetailsPageContext);

  return (
      <React.Fragment>
        <IconButton onClick={setStepEditDialogOpen}>
          <EditIcon/>
        </IconButton>

        <StepAdmin open={stepEditDialogOpen}
                   setOpen={setStepEditDialogOpen}
                   offer={offerDetailsPageContext} step={step}/>
      </React.Fragment>
  );
};