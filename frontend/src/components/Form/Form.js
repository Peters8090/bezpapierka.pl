import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import React, {useEffect, useState} from 'react';
import {isEmpty} from '../../utility';
import CloseIcon from '@material-ui/icons/Close';

export const FormContext = React.createContext({
  fields: [],
  setFields: () => {
  },
});

export const Form = ({
  setLoading, checkBeforeSubmit = (fields) => true, doAfterSubmit = () => {}, getApiEndpoint,
  sendRequest, getRequestBodyStructure = data => data, getErrorRoot = error => error.response.data, children,
}) => {
  const [fields, setFields] = useState({});

  const [errorMessage, setErrorMessage] = useState('');

  return (
      <form autoComplete="false"
            noValidate
            onSubmit={async event => {
              event.preventDefault();

              if (!checkBeforeSubmit(fields)) return;

              setLoading(true);

              let data = {};
              Object.entries(fields).
                  forEach(
                      ([apiName, properties]) => {
                        if (properties.attachToRequest)
                          data[apiName] = properties.value;
                      });

              try {
                const response = await sendRequest(getApiEndpoint(),
                    getRequestBodyStructure(data));

                Object.values(fields).forEach(field => {
                  if (field.resetValueAfterSubmit) {
                    field.resetValue();
                  }
                });

                await doAfterSubmit(response);
              } catch (error) {
                if (error.response && error.response.status === 400) {
                  Object.entries(getErrorRoot(error)).
                      forEach(([fieldApiName, errors]) => {
                        fields[fieldApiName].setValidationErrors(errors);
                      });
                } else if(error.request) {
                  setErrorMessage(error.message);
                } else {
                  throw error;
                }
              } finally {
                setLoading(false);
              }
            }}>
        <FormContext.Provider
            value={{fields: fields, setFields: setFields}}>
          {children}
        </FormContext.Provider>

        <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={!isEmpty(errorMessage)}
            autoHideDuration={6000}
            onClose={() => setErrorMessage('')}
            message={errorMessage}
            action={
              <React.Fragment>
                <IconButton size="small" color="inherit"
                            onClick={() => setErrorMessage('')}>
                  <CloseIcon fontSize="small"/>
                </IconButton>
              </React.Fragment>
            }
        />

      </form>
  );
};