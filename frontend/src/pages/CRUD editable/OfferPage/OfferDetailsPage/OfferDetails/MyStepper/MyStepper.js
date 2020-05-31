import React, {useContext, useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import StepContent from '@material-ui/core/StepContent';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Step from '@material-ui/core/Step';
import Stepper from '@material-ui/core/Stepper';
import EditIcon from '@material-ui/icons/Edit';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {StepAdmin} from '../../../../../../components/CRUD/Admins/OfferPage/StepAdmin';
import {LoggedInOnly} from '../../../../../../components/Auth/LoggedInOnly';
import {OfferDetailsPageContext} from '../../OfferDetailsPage';

export const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const offerDetailsPageContext = useContext(OfferDetailsPageContext);

  const steps = offerDetailsPageContext.steps;

  const styles = {
    root: css`
      padding: 0;
    `,
    stepTitle: css`
      display: flex;
      align-items: center;
    `,
    stepDescription: css`
      color: #888;
    `,
  };

  return (
      <Stepper orientation='vertical' activeStep={activeStep}
               css={styles.root}>
        {
          steps.map(step => (
              <Step key={step.id}>
                <StepLabel>
                  <Typography variant='h5' css={styles.stepTitle}>
                    {step.title}
                    <LoggedInOnly>
                      <StepCrudFunctionality step={step}/>
                    </LoggedInOnly>
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant='body1' align='justify'
                              css={styles.stepDescription}>
                    {step.description}
                  </Typography>
                  <Box pt={2}/>
                  {activeStep < steps.length - 1 ? (
                      <Button
                          variant="contained" color='primary'
                          onClick={() => setActiveStep(
                              prevState => prevState + 1)}>
                        Dalej
                      </Button>
                  ) : (
                      <Button variant="contained" color='primary'
                              onClick={() => setActiveStep(0)}>
                        Od nowa
                      </Button>
                  )}
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