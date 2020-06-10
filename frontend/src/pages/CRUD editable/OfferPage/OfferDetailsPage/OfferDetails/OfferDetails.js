import React, {useContext, useState} from 'react';
import useTheme from '@material-ui/core/styles/useTheme';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {AuthContext} from '../../../../../components/Auth/Auth';
import {SectionAdmin} from '../../../../../components/CRUD/Admins/OfferPage/SectionAdmin';
import {StepAdmin} from '../../../../../components/CRUD/Admins/OfferPage/StepAdmin';
import {LoggedInOnly} from '../../../../../components/Auth/LoggedInOnly';
import {TranslationContext} from '../../../../../components/Translation/Translation';
import {sentenceCaseUtf8} from '../../../../../utility';
import {useCurrentOffer} from '../OfferDetailsPage';
import {OfferSteps} from './OfferSteps/OfferSteps';

export const OfferDetails = () => {
  const offer = useCurrentOffer();

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

            <SectionAdmin offer={offer}
                          open={sectionCreateDialogOpen}
                          onClose={() => setSectionCreateDialogOpen(false)}/>
          </LoggedInOnly>
        </Box>
        {offer.sections.map(section => {
          return (
              <SectionDetail key={section.id} section={section}/>
          );
        })}
        {(offer.steps.length > 0 || isLoggedIn) &&
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

Detail.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  setDialogOpen: PropTypes.func.isRequired,
};

const StepperDetail = () => {
  const offer = useCurrentOffer();
  const [stepCreateDialogOpen, setStepCreateDialogOpen] = useState(false);

  const _ = useContext(TranslationContext).gettextDjango;

  return (
      <Detail title={sentenceCaseUtf8(_`steps`)} setDialogOpen={setStepCreateDialogOpen}
              icon={AddIcon}>
        <OfferSteps steps={offer.steps}/>
        <LoggedInOnly>
          <StepAdmin offer={offer} open={stepCreateDialogOpen}
                     onClose={() => setStepCreateDialogOpen(false)}/>
        </LoggedInOnly>
      </Detail>
  );
};

const SectionDetail = props => {
  const offer = useCurrentOffer();
  const [sectionEditDialogOpen, setSectionEditDialogOpen] = useState(false);
  return (
      <Detail title={props.section.title} setDialogOpen={setSectionEditDialogOpen}
              icon={EditIcon}>
        <Typography variant='h5' align='justify'>
          {props.section.contents}
        </Typography>

        <LoggedInOnly>
          <SectionAdmin offer={offer} section={props.section}
                        open={sectionEditDialogOpen}
                        onClose={() => setSectionEditDialogOpen(false)}/>
        </LoggedInOnly>
      </Detail>
  );
};

SectionDetail.propTypes = {
  section: PropTypes.object.isRequired,
};