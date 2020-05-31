import React, {useContext, useState} from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {AuthContext} from '../../../../../components/Auth/Auth';
import {SectionAdmin} from '../../../../../components/CRUD/Admins/OfferPage/SectionAdmin';
import {StepAdmin} from '../../../../../components/CRUD/Admins/OfferPage/StepAdmin';
import {LoggedInOnly} from '../../../../../components/Auth/LoggedInOnly';
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

            <SectionAdmin offer={offerDetailsPageContext}
                          open={sectionCreateDialogOpen}
                          setOpen={setSectionCreateDialogOpen}/>
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

  const styles = {
    title: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    iconButton: css`
      margin-left: ${theme.spacing(1)}px;
    `,
    icon: css`
      ${theme.breakpoints.up('md')} {
        font-size: 35px;
      }
    `,
  };

  return (
      <section>
        <Box pt={4} pb={4}>
          <Typography variant='h3' align='center' gutterBottom
                      css={styles.title}>
            {props.title}
            <LoggedInOnly>
              <IconButton css={styles.iconButton}
                          onClick={() => props.setDialogOpen(true)}>
                <props.icon css={styles.icon}/>
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
              <StepAdmin offer={offerDetailsPageContext} open={stepCreateDialogOpen}
                         setOpen={setStepCreateDialogOpen}/>
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
            <Typography variant='h5' align='justify'>
              {section.contents}
            </Typography>

            <LoggedInOnly>
              <SectionAdmin offer={offerDetailsPageContext} section={section}
                            open={sectionEditDialogOpen}
                            setOpen={setSectionEditDialogOpen}/>
            </LoggedInOnly>
          </Detail>
      );
    }
;