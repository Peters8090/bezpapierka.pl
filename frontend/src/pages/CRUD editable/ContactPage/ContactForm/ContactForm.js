import React, {useContext, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import useTheme from '@material-ui/core/styles/useTheme';
import SendIcon from '@material-ui/icons/Send';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

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
    textInputField: css`
      margin-top: ${theme.spacing(0.75)}px;
      margin-bottom: ${theme.spacing(0.75)}px;
    `,
    actions: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
  };

  return (
      <Container maxWidth='sm'>
        <Form setLoading={setLoading} sendRequest={pagesAxios.post}
              getRequestBodyStructure={data => ({
                ...data,
                contactPage: contact_page.id,
              })}
              getApiEndpoint={() => '/contact_form/'}>
          <Field label='Tytuł' apiName='title'>
            <TextInputField margin='normal' css={styles.textInputField}/>
          </Field>
          <Field label='Email' apiName='email'>
            <TextInputField type='email' margin='normal'
                            css={styles.textInputField}/>
          </Field>
          <Field label='Treść wiadomości' apiName='message'>
            <TextInputField multiline rows={5} margin='normal'
                            css={styles.textInputField}/>
          </Field>
          <Box pt={2}/>
          <Box css={styles.actions}>
            {loading ? (
                <CircularProgress color='primary'/>
            ) : (
                <Button variant="text"
                        color='primary'
                        type='submit'
                        size='large'
                        endIcon={<SendIcon/>}>
                  Wyślij
                </Button>
            )}
          </Box>
        </Form>
      </Container>
  );
};