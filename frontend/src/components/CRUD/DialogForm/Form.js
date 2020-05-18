import React, {useState} from 'react';
import {DialogFormContext} from './DialogForm';

export const Form = ({
  setLoading, checkBeforeSubmit = (fields) => true, doAfterSubmit = () => {}, getApiEndpoint,
  sendRequest, getRequestBodyStructure, getErrorRoot, children,
}) => {
  const [fields, setFields] = useState({});

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
                      ([apiName, properties]) => data[apiName] = properties.value);

              try {
                const response = await sendRequest(getApiEndpoint(),
                    getRequestBodyStructure(data));

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
              }

              setLoading(false);
            }}>
        <DialogFormContext.Provider
            value={{fields: fields, setFields: setFields}}>
          {children}
        </DialogFormContext.Provider>
      </form>
  );
};