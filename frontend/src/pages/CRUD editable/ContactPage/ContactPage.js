import React, {useContext, useState} from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {BasicInfoAdmin} from '../../../components/CRUD/Admins/ContactPage/BasicInfoAdmin';
import {LoggedInOnly} from '../../../components/Auth/LoggedInOnly';
import {PageTitle} from '../../../components/Miscellaneous/PageTitle';
import {useCurrentPage} from '../../../components/Pages/Pages';
import {TranslationContext} from '../../../components/Translation/Translation';
import {sentenceCaseUtf8} from '../../../utility';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';
import {ContactForm} from './ContactForm/ContactForm';
import {BasicInfos} from './BasicInfos/BasicInfos';

const Section = props => {
  return (
      <Grid item xs={11} sm={9} md={5} xl={4}>
        <Typography variant='h3' align='center' gutterBottom>
          {props.title}
        </Typography>
        <Box mt={5}/>
        {props.content}
      </Grid>
  );
};

Section.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
};

export const ContactPage = () => {
  const currentPage = useCurrentPage();

  const [basicInfoCreateDialogOpen, setBasicInfoCreateDialogOpen] = useState(
      false);

  const translationContext = useContext(TranslationContext);
  const gettext = translationContext.gettext;
  const getTextDjango = translationContext.gettextDjango;
  const translations = {
    basicInfos: sentenceCaseUtf8(getTextDjango`basic informations`),
    contactForm: gettext('Contact form'),
  };

  const styles = {
    contentWrapper: css`
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
    `,
    basicInfoSection: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    addIcon: css`
      width: 30px;
      height: 30px;
    `,
  };

  return (
      <CRUDEditablePageWrapper>
        <PageTitle title={currentPage.title}/>
        <Grid container justify='space-evenly' spacing={2}>
          <Section
              title={
                <Box css={styles.basicInfoSection}>
                  {translations.basicInfos}
                  <LoggedInOnly>
                    <IconButton onClick={() => setBasicInfoCreateDialogOpen(
                        prevState => !prevState)}>
                      <AddIcon css={styles.addIcon}/>
                    </IconButton>

                    <BasicInfoAdmin open={basicInfoCreateDialogOpen}
                                    onClose={() => setBasicInfoCreateDialogOpen(
                                        false)}/>
                  </LoggedInOnly>
                </Box>
              }
              content={<BasicInfos/>}/>
          {currentPage.contact_form_email &&
          <Section title={translations.contactForm} content={<ContactForm/>}/>}
        </Grid>
      </CRUDEditablePageWrapper>
  );
};