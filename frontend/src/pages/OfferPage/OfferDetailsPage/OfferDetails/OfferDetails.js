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
import {AuthContext} from '../../../../App';
import {DialogWithProps} from '../../../../components/CRUD/DialogForm/DialogForm';
import {SectionAdmin} from '../../../../components/CRUD/Admins/OfferPage/SectionAdmin';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {StepAdmin} from '../../../../components/CRUD/Admins/OfferPage/StepAdmin';
import {LoggedInOnly} from '../../../../components/Miscellaneous/LoggedInOnly';
import {OfferDetailsPageContext} from '../OfferDetailsPage';
import {MyStepper} from './MyStepper/MyStepper';

export const OfferDetails = () => {
  const offerDetailsPageContext = useContext(OfferDetailsPageContext);

  const isLoggedIn = useContext(AuthContext).isLoggedIn;

  const [sectionCreateDialogOpen, setSectionCreateDialogOpen] = useState(false);

  return (
      <Container maxWidth='md'>
        <Box textAlign='center'>

          <LoggedInOnly>
            <IconButton onClick={() => setSectionCreateDialogOpen(
                prevState => !prevState)}>
              <AddIcon/>
            </IconButton>

            <DialogWithProps open={sectionCreateDialogOpen}
                             setOpen={setSectionCreateDialogOpen}>
              <SectionAdmin offer={offerDetailsPageContext}/>
            </DialogWithProps>
          </LoggedInOnly>
        </Box>
        {offerDetailsPageContext.sections.map(section => {
          return (
              <SectionDetail key={section.id} section={section}/>
          );
        })}
        {(offerDetailsPageContext.steps.length > 0 || isLoggedIn) &&
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
          <Typography variant='h3' align='center' gutterBottom css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {props.title}
            <LoggedInOnly>
              <IconButton
                  css={{marginLeft: theme.spacing(1)}}
                  onClick={() => props.setDialogOpen(
                      prevState => !prevState)}>
                <props.icon css={{
                  [theme.breakpoints.up('md')]: {
                    fontSize: 35,
                  },
                }}/>
              </IconButton>
            </LoggedInOnly>
          </Typography>
          {props.children}
        </Box>
        <Divider/>
      </section>
  );
};

const StepperDetail = () => {
      const offerDetailsPageContext = useContext(OfferDetailsPageContext);
      const [stepCreateDialogOpen, setStepCreateDialogOpen] = useState(false);

      return (
          <Detail title='Etapy' setDialogOpen={setStepCreateDialogOpen}
                  icon={AddIcon}>
            <MyStepper steps={offerDetailsPageContext.steps}/>
            <LoggedInOnly>
              <DialogWithProps open={stepCreateDialogOpen}
                               setOpen={setStepCreateDialogOpen}>
                <StepAdmin offer={offerDetailsPageContext}/>
              </DialogWithProps>
            </LoggedInOnly>
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
                        css={{whiteSpace: 'pre-wrap'}}>
              {section.contents}
            </Typography>

            <LoggedInOnly>
              <DialogWithProps open={sectionEditDialogOpen}
                               setOpen={setSectionEditDialogOpen}>
                <SectionAdmin offer={offerDetailsPageContext} section={section}/>
              </DialogWithProps>
            </LoggedInOnly>
          </Detail>
      );
    }
;