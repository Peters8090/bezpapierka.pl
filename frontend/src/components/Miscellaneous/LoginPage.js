import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import Cookie from 'js-cookie';
import FormHelperText from '@material-ui/core/FormHelperText';
import React, {useContext, useEffect, useState} from 'react';
import {apiUrl, AuthContext} from '../../App';
import {Layout, LayoutContext} from '../Layout/Layout';
import {Form} from '../Miscellaneous/Form/Form';
import {Field} from './Form/Field/Field';
import {TextInputField} from './Form/Field/Types/TextInputField';
import axios from 'axios';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [userAlerts, setUserAlerts] = useState({
    error: true,
    alerts: [],
  });

  const authContext = useContext(AuthContext);
  const layoutContext = useContext(LayoutContext);

  useEffect(() => {
    layoutContext.setBackgroundImageURL(
        `${apiUrl}/static/pages/login_page/background_image.png`);
  }, []);

  const loggedInAlert = () => {
    setUserAlerts({
      error: false,
      alerts: [
        'Zalogowano',
      ],
    });
  };

  useEffect(() => {
    if (authContext.isLoggedIn) {
      loggedInAlert();
    } else {
      setUserAlerts({error: true, alerts: []});
    }
  }, [authContext.isLoggedIn]);

  const styles = {
    root: css`
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
    linearProgress: css`
      height: 4px;
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
              Zaloguj
            </Typography>
            <Form
                getApiEndpoint={() => `${apiUrl}/accounts/obtain-auth-token`}
                doAfterSubmit={response => {
                  const token = response.data.token;

                  loggedInAlert();
                  Cookie.set('token', token, {expires: 365});
                  authContext.dispatchAuthToken({
                    type: 'SET',
                    authToken: token,
                  })
                }}
                getErrorRoot={error => {
                  if (error.response.data.hasOwnProperty(
                      'non_field_errors')) {
                    setUserAlerts({
                      error: true,
                      alerts: error.response.data.non_field_errors,
                    });
                    return {};
                  } else {
                    return error.response.data;
                  }
                }}
                sendRequest={axios.post}
                setLoading={setLoading}>

              <Field label='Nazwa użytownika' apiName='username'>
                <TextInputField/>
              </Field>
              <Field label='Hasło' apiName='password'>
                <TextInputField type='password'/>
              </Field>
              {userAlerts.alerts.map(nonFieldError => (
                  <FormHelperText
                      error={userAlerts.error}>{nonFieldError}</FormHelperText>
              ))}
              <Box mt={2}/>
              <Button variant='contained'
                      type='submit' fullWidth
                      color='secondary'>
                Zatwierdź
              </Button>
            </Form>
          </Box>
          {loading ? <LinearProgress color='secondary'/> : <div css={styles.linearProgress}/>}
        </Card>
      </Container>
  );
};