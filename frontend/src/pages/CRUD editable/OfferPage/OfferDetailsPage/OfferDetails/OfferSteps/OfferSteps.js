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
import {TranslationContext} from '../../../../../../components/Translation/Translation';
import {useCurrentOffer} from '../../OfferDetailsPage';

export const OfferSteps = () => {
  const steps = useCurrentOffer().steps;
  const [activeStep, setActiveStep] = useState(0);

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    next: gettext('Next'),
    startOver: gettext('Start over'),
  };

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
        {steps.map(step => (
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
                      {translations.next}
                    </Button>
                ) : (
                    <Button variant="contained" color='primary'
                            onClick={() => setActiveStep(0)}>
                      {translations.startOver}
                    </Button>
                )}
              </StepContent>
            </Step>
        ))}
      </Stepper>
  );
};

const StepCrudFunctionality = ({step}) => {
  const [stepEditDialogOpen, setStepEditDialogOpen] = useState(false);
  const offer = useCurrentOffer();

  return (
      <React.Fragment>
        <IconButton onClick={setStepEditDialogOpen}>
          <EditIcon/>
        </IconButton>

        <StepAdmin open={stepEditDialogOpen}
                   onClose={() => setStepEditDialogOpen(false)}
                   offer={offer} step={step}/>
      </React.Fragment>
  );
};