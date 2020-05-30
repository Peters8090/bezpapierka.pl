import AddIcon from '@material-ui/icons/Add';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Box, IconButton, Typography} from '@material-ui/core';
import {BasicInfoAdmin} from '../../../components/CRUD/Admins/ContactPage/BasicInfoAdmin';
import {LoggedInOnly} from '../../../components/Auth/LoggedInOnly';
import {PageTitle} from '../../../components/Miscellaneous/PageTitle';
import {useCurrentPage} from '../../../components/Pages/Pages';
import {CRUDEditablePageWrapper} from '../CRUDEditablePageWrapper';
import {ContactForm} from './ContactForm/ContactForm';
import {BasicInfos} from './BasicInfos/BasicInfos';

const Section = props => (
    <Box m={2} mt={0}>
      <Typography variant='h4' align='center'>{props.title}</Typography>
      <Box pt={2}/>
      {props.content}
    </Box>
);

Section.propTypes = {
  title: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
};

export const ContactPage = () => {
  const currentPage = useCurrentPage();

  const [basicInfoCreateDialogOpen, setBasicInfoCreateDialogOpen] = useState(
      false);

  const styles = {
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
        <Box display='flex'
             justifyContent='space-evenly'
             flexWrap='wrap'>
          <Section
              title={
                <Box css={styles.basicInfoSection}>
                  <span>Podstawowe informacje</span>
                  <LoggedInOnly>
                    <IconButton onClick={() => setBasicInfoCreateDialogOpen(
                        prevState => !prevState)}>
                      <AddIcon css={styles.addIcon}/>
                    </IconButton>

                    <BasicInfoAdmin open={basicInfoCreateDialogOpen}
                                    setOpen={setBasicInfoCreateDialogOpen}/>
                  </LoggedInOnly>
                </Box>
              }
              content={<BasicInfos/>}/>
          {currentPage.contact_form_email &&
          <Section title='Formularz kontaktowy' content={<ContactForm/>}/>}
        </Box>
      </CRUDEditablePageWrapper>
  );
};