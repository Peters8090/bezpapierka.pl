import React, {useContext, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {AuthContext, authTokenActionTypes} from '../../components/Auth/Auth';
import {Form} from '../../components/Form/Form';
import {Field} from '../../components/Form/Field/Field';
import {TextInputField} from '../../components/Form/Field/Types/TextInputField';
import {LinearProgressWithPlaceholder} from '../../components/Miscellaneous/LinearProgressWithPlaceholder';
import {TranslationContext} from '../../components/Translation/Translation';

export const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    logIn: gettext('Log in'),
    submit: gettext('Submit'),
    username: gettext('Username'),
    password: gettext('Password'),
  };

  const styles = {
    root: css`
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    `,
    card: css`
      border-radius: 12px;
    `,
    title: css`
      font-family: 'Montserrat', sans-serif;
    `,
  };

  return (
      <Container maxWidth='xs' css={styles.root}>
        <Card elevation={0}
              css={styles.card}>
          <Box p={2.5}>
            <Typography variant='h5'
                        gutterBottom
                        css={styles.title}
                        align='center'>
              {translations.logIn}
            </Typography>
            <Form
                getApiEndpoint={() => `/obtain-auth-token`}
                doAfterSubmit={response => {
                  const token = response.data.token;
                  authContext.authTokenDispatch({
                    type: authTokenActionTypes.SET,
                    authToken: token,
                    setCookie: true,
                  });
                }}
                sendRequest={authContext.axios.post}
                setLoading={setLoading}>

              <Field label={translations.username} apiName='username'>
                <TextInputField/>
              </Field>
              <Field label={translations.password} apiName='password'>
                <TextInputField type='password'/>
              </Field>
              <Box mt={1}/>
              <Button variant='contained'
                      type='submit' fullWidth
                      color='primary'>
                {translations.submit}
              </Button>
            </Form>
          </Box>
          <LinearProgressWithPlaceholder loading={loading}/>
        </Card>
      </Container>
  );
};