import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import React, {useEffect, useState} from 'react';
import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
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

  const {handleError, message} = useHttpErrorHandler();

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
                        data[apiName] = properties.value;
                      });

              await handleError(async () => {
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
                  } else {
                    throw error;
                  }
                } finally {
                  setLoading(false);
                }
              });
            }}>
        <FormContext.Provider
            value={{fields: fields, setFields: setFields}}>
          {children}
        </FormContext.Provider>

        {message}
      </form>
  );
};