import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../App';
import {DialogFormContext} from '../CRUD/DialogForm/DialogForm';
import {Field} from '../CRUD/DialogForm/Field/Field';
import {TextInputField} from '../CRUD/DialogForm/Field/Types/TextInputField';
import axios from 'axios';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const LoginPage = ({}) => {
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(false);

  const theme = useTheme();

  const authContext = useContext(AuthContext);

  return (
      <div css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '70vh',
        padding: theme.spacing(2),
      }}>
        <Container maxWidth='md'>
          <form noValidate onSubmit={async event => {
            event.preventDefault();
            setLoading(true);

            let data = {};
            Object.entries(fields).
                forEach(([apiName, properties]) => data[apiName] = properties.value);
            try {
              const response = await axios.post('http://localhost:8000/accounts/obtain-auth-token', data);

              authContext.setAuthToken(response.data.token);
            } catch (error) {
              // if (error.response && error.response.status === 400) {
              //   Object.entries(error.response.data).
              //       forEach(([fieldApiName, errors]) => {
              //         fields[fieldApiName].setValidationErrors(errors);
              //       });
              // } else {
              //   throw error;
              // }
            }
            setLoading(false);
          }}>
            <DialogFormContext.Provider value={{
              fields: fields,
              setFields: setFields,
            }}>
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
            </DialogFormContext.Provider>
          </form>
        </Container>
      </div>
  );
};