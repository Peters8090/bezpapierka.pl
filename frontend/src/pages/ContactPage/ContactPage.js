import AddIcon from '@material-ui/icons/Add';
import React, {useContext, useState} from 'react';

import {Box, CardHeader, IconButton, Typography} from '@material-ui/core';
import {BasicInfoCreateEditDialog} from '../../components/CRUD/BasicInfoCreateEditDialog';
import {PageTitle} from '../../components/Miscellaneous/PageTitle';

import {PagesContext} from '../../App';
import {ContactForm} from './ContactForm/ContactForm';
import {BasicInfo} from './BasicInfo/BasicInfo';

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
  const page = useContext(PagesContext).find(page => props.pageId === page.id);

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
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span>Podstawowe informacje</span>
                <IconButton
                    onClick={() => setBasicInfoCreateDialogOpen(
                        prevState => !prevState)}>
                  <AddIcon/>
                </IconButton>

                <BasicInfoCreateEditDialog open={basicInfoCreateDialogOpen}
                                           setOpen={setBasicInfoCreateDialogOpen}
                                           isEdit={false}
                />
              </div>
            }
            component={<BasicInfo/>}/>
            {page.contact_form_email &&
            <Section text='Formularz kontaktowy' component={<ContactForm/>}/>}
          </Box>
        </ContactPageContext.Provider>
      </div>
  );
};

export const ContactPageContext = React.createContext({});