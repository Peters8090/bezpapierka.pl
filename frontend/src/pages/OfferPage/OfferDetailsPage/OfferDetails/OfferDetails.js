import {Add} from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import React, {useContext, useState} from 'react';

import {
  Box,
  Container,
  Divider,
  IconButton,
  Typography, useTheme,
} from '@material-ui/core';
import {DialogWithProps} from '../../../../components/CRUD/DialogForm/DialogForm';
import {SectionAdmin} from '../../../../components/CRUD/SectionAdmin';

/** @jsx jsx */
import {jsx} from '@emotion/core';

import {OfferDetailsPageContext} from '../OfferDetailsPage';
import {MyStepper} from './MyStepper/MyStepper';

export const OfferDetails = () => {
  const offerDetailsPageContext = useContext(OfferDetailsPageContext);

  const [sectionCreateDialogOpen, setSectionCreateDialogOpen] = useState(false);

  return (
      <Container maxWidth='md'>
        <Box textAlign='center'>
          <IconButton onClick={() => setSectionCreateDialogOpen(
              prevState => !prevState)}>
            <AddIcon/>
          </IconButton>

          <DialogWithProps open={sectionCreateDialogOpen}
                           setOpen={setSectionCreateDialogOpen}>
            <SectionAdmin offer={offerDetailsPageContext}/>
          </DialogWithProps>
        </Box>
        {offerDetailsPageContext.sections.map(section => {
          return (
              <SectionDetail section={section}/>
          );
        })}
        {offerDetailsPageContext.steps.length > 0 &&
        (
            <StepperDetail/>
        )}
      </Container>
  );
};

const Detail = props => {
  const theme = useTheme();

  return (
      <section>
        <Box pt={4} pb={4}>
          <Typography variant='h3' align='center' gutterBottom style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {props.title}
            <IconButton
                style={{marginLeft: theme.spacing(1)}}
                onClick={() => props.setDialogOpen(
                    prevState => !prevState)}>
              <props.icon css={{
                [theme.breakpoints.up('md')]: {
                  fontSize: 35,
                },
              }}/>
            </IconButton>
          </Typography>
          {props.children}
        </Box>
        <Divider/>
      </section>
  );
};

const StepperDetail = () => {
      const offerDetailsPageContext = useContext(OfferDetailsPageContext);
      const [stepAddDialogOpen, setStepAddDialogOpen] = useState(false);

      return (
          <Detail title='Etapy' setDialogOpen={setStepAddDialogOpen} icon={AddIcon}>
            <MyStepper steps={offerDetailsPageContext.steps}/>
            <DialogWithProps open={stepAddDialogOpen}
                             setOpen={setStepAddDialogOpen}>
            </DialogWithProps>
          </Detail>
      );
    }
;

const SectionDetail = ({section}) => {
      const offerDetailsPageContext = useContext(OfferDetailsPageContext);
      const [sectionEditDialogOpen, setSectionEditDialogOpen] = useState(false);

      return (
          <Detail title={section.title} setDialogOpen={setSectionEditDialogOpen}
                  icon={EditIcon}>
            <Typography variant='h5' align='justify'
                        style={{whiteSpace: 'pre-wrap'}}>
              {section.contents}
            </Typography>

            <DialogWithProps open={sectionEditDialogOpen}
                             setOpen={setSectionEditDialogOpen}>
              <SectionAdmin offer={offerDetailsPageContext} section={section}/>
            </DialogWithProps>
          </Detail>
      );
    }
;