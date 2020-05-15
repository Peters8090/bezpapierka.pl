import AddIcon from '@material-ui/icons/Add';
import React, {useContext, useState} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Box, IconButton, Typography} from '@material-ui/core';
import {BasicInfoAdmin} from '../../components/CRUD/Admins/ContactPage/BasicInfoAdmin';
import {DialogWithProps} from '../../components/CRUD/DialogForm/DialogForm';
import {PageTitle} from '../../components/Miscellaneous/PageTitle';
import {PagesContext} from '../../App';
import {ContactForm} from './ContactForm/ContactForm';
import {BasicInfos} from './BasicInfos/BasicInfos';

const Section = props => {
  return (
      <Box m={2} mt={0}>
        <Typography variant='h3' align='center'>{props.text}</Typography>
        <Box p={2}/>
        {props.component}
      </Box>
  );
};

export const ContactPage = props => {
  const page = useContext(PagesContext).pages.find(page => props.pageId === page.id);

  const [basicInfoCreateDialogOpen, setBasicInfoCreateDialogOpen] = useState(
      false);

  return (
      <div>
        <PageTitle title={page.title}/>
        <ContactPageContext.Provider value={page}>
          <Box mt={5}
               display='flex'
               justifyContent='space-evenly'
               flexWrap='wrap'>
            <Section text={
              <div css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>Podstawowe informacje</span>
                <IconButton onClick={() => setBasicInfoCreateDialogOpen(
                    prevState => !prevState)}>
                  <AddIcon css={{width: 40, height: 40}}/>
                </IconButton>

                <DialogWithProps open={basicInfoCreateDialogOpen}
                                 setOpen={setBasicInfoCreateDialogOpen}>
                  <BasicInfoAdmin/>
                </DialogWithProps>
              </div>
            }
                     component={<BasicInfos/>}/>
            {page.contact_form_email &&
            <Section text='Formularz kontaktowy' component={<ContactForm/>}/>}
          </Box>
        </ContactPageContext.Provider>
      </div>
  );
};

export const ContactPageContext = React.createContext({});