import useTheme from '@material-ui/core/styles/useTheme';
import AddIcon from '@material-ui/icons/Add';
import React, {useContext, useState} from 'react';
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

const Section = props => {

  return (
      <Box m={2} mt={0}>
        <Typography variant='h4' align='center'>{props.text}</Typography>
        <Box pt={2}/>
        {props.component}
      </Box>
  );
};

export const ContactPage = () => {
  const currentPage = useCurrentPage();

  const [basicInfoCreateDialogOpen, setBasicInfoCreateDialogOpen] = useState(
      false);

  return (
      <CRUDEditablePageWrapper>
        <PageTitle title={currentPage.title}/>
        <Box display='flex'
             justifyContent='space-evenly'
             flexWrap='wrap'>
          <Section text={
            <Box css={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span>Podstawowe informacje</span>
              <LoggedInOnly>
                <IconButton onClick={() => setBasicInfoCreateDialogOpen(
                    prevState => !prevState)}>
                  <AddIcon css={{width: 30, height: 30}}/>
                </IconButton>

                <BasicInfoAdmin open={basicInfoCreateDialogOpen}
                                setOpen={setBasicInfoCreateDialogOpen}/>
              </LoggedInOnly>
            </Box>
          }
                   component={<BasicInfos/>}/>
          {currentPage.contact_form_email &&
          <Section text='Formularz kontaktowy' component={<ContactForm/>}/>}
        </Box>
      </CRUDEditablePageWrapper>
  );
};