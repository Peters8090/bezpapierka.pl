import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../App';
import {Form} from '../Miscellaneous/Form/Form';
import {Field} from './Form/Field/Field';
import {TextInputField} from './Form/Field/Types/TextInputField';
import axios from 'axios';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const LoginPage = ({}) => {
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const theme = useTheme();

  return (
      <div>
        <Container maxWidth='md'>
          <Form
              getApiEndpoint={() => 'http://localhost:8000/accounts/obtain-auth-token'}
              doAfterSubmit={response => authContext.setAuthToken(
                  response.data.token)}
              getErrorRoot={error => {
                if(error.response.data.hasOwnProperty('non_field_errors')) {
                  return {};
                } else {
                  return error.response.data;
                }
              }}
              sendRequest={axios.post}
              setLoading={setLoading}>
            <Typography variant='h3' gutterBottom align='center'>Zaloguj
              się</Typography>
            <Field label='Nazwa użytownika' apiName='username'>
              <TextInputField/>
            </Field>
            <Field label='Hasło' apiName='password'>
              <TextInputField type='password'/>
            </Field>
            <Box mt={2}/>
            <Button type='submit'
                    fullWidth
                    onClick={() => {}}
                    variant='contained'
                    color='secondary'>
              Zaloguj
            </Button>
            {loading && <LinearProgress color='secondary'/>}
          </Form>
        </Container>
      </div>
  );
};