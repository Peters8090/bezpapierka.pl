import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import useTheme from '@material-ui/core/styles/useTheme';
import React, {useContext, useState} from 'react';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Box, Button, CircularProgress} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {Field} from '../../../../components/Form/Field/Field';
import {TextInputField} from '../../../../components/Form/Field/Types/TextInputField';
import {Form} from '../../../../components/Form/Form';
import {PagesContext, useCurrentPage} from '../../../../components/Pages/Pages';

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const contact_page = useCurrentPage();
  const pagesAxios = useContext(PagesContext).axios;

  const theme = useTheme();
  const styles = {
    root: css`
    `,
  };

  return (
      <Container maxWidth='xs'>
        <div css={styles.root}>
          <Form setLoading={setLoading} sendRequest={pagesAxios.post}
                getRequestBodyStructure={data => ({
                  ...data,
                  contactPage: contact_page.id,
                })}
                getApiEndpoint={() => '/contact_form/'}>
            <Field label='Tytuł' apiName='title'>
              <TextInputField variant='outlined'/>
            </Field>
            <Field label='Email' apiName='email'>
              <TextInputField type='email' variant='outlined'/>
            </Field>
            <Field label='Treść wiadomości' apiName='message'>
              <TextInputField multiline variant='outlined'/>
            </Field>
            <Box align='center' m={2}>
              {
                loading ?
                    <CircularProgress color='primary' size={20}/>
                    : <Button variant="text"
                              color='primary'
                              type='submit'
                              endIcon={<SendIcon/>}>
                      Wyślij
                    </Button>
              }
            </Box>
          </Form>
        </div>
      </Container>
  );
};