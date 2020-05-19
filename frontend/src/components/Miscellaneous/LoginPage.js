import Cookie from "js-cookie"
import FormHelperText from '@material-ui/core/FormHelperText';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../App';
import {Form} from '../Miscellaneous/Form/Form';
import {Field} from './Form/Field/Field';
import {TextInputField} from './Form/Field/Types/TextInputField';
import axios from 'axios';
import {SimpleDialog} from './SimpleDialog/SimpleDialog';

export const LoginPage = () => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userAlerts, setUserAlerts] = useState({
    error: true,
    alerts: [],
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      setUserAlerts({
        error: false,
        alerts: [
          'Zalogowano',
        ],
      });
    }
  }, [authContext.isLoggedIn]);

  return (
      <SimpleDialog open={open} setOpen={setOpen} dialogWrapper={(
          <Form
              getApiEndpoint={() => 'http://localhost:8000/accounts/obtain-auth-token'}
              doAfterSubmit={response => {
                const token = response.data.token;

                Cookie.set('token', token, { expires: 365 });
                authContext.setAuthToken(token);
              }}
              getErrorRoot={error => {
                if (error.response.data.hasOwnProperty('non_field_errors')) {
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
              setLoading={setLoading}/>
      )} loading={loading} title='Zaloguj się'>

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
      </SimpleDialog>
  );
};