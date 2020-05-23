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
import {AppContext} from '../../App';
import {AuthContext} from '../../components/Auth/Auth';
import {Layout, LayoutContext} from '../../components/Layout/Layout';
import {Form} from '../../components/Form/Form';
import {Field} from '../../components/Form/Field/Field';
import {TextInputField} from '../../components/Form/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [userAlerts, setUserAlerts] = useState({
    error: true,
    alerts: [],
  });

  const authContext = useContext(AuthContext);

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
                getApiEndpoint={() => `/obtain-auth-token`}
                doAfterSubmit={response => {
                  const token = response.data.token;

                  loggedInAlert();
                  Cookie.set('token', token, {expires: 365});
                  authContext.authTokenDispatch({
                    type: 'SET',
                    authToken: token,
                    setCookie: true,
                  });
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
                sendRequest={authContext.axios.post}
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
                      color='primary'>
                Zatwierdź
              </Button>
            </Form>
          </Box>
          {loading ? <LinearProgress color='primary'/> : <div
              css={styles.linearProgress}/>}
        </Card>
      </Container>
  );
};