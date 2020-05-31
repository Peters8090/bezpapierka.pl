import React, {useState} from 'react';
import Box from '@material-ui/core/Box';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';

import {useHttpErrorHandler} from '../../hooks/useHttpErrorHandler';
import {isEmpty} from '../../utility';

export const FormContext = React.createContext({
  fields: [],
  setFields: () => { },
});

export const Form = props => {
  const [fields, setFields] = useState({});

  const [nonFieldValidationErrors, setNonFieldValidationErrors] = useState([]);

  const {handleError, message} = useHttpErrorHandler();

  return (
      <form autoComplete="false"
            noValidate={props.noValidate}
            onSubmit={async event => {
              event.preventDefault();

              if (!props.checkBeforeSubmit(fields)) return;

              props.setLoading(true);

              let data = {};
              Object.entries(fields).
                  forEach(
                      ([apiName, properties]) => {
                        data[apiName] = properties.value;
                      });

              await handleError(async () => {
                try {
                  const response = await props.sendRequest(
                      props.getApiEndpoint(),
                      props.getRequestBodyStructure(data));

                  Object.values(fields).forEach(field => {
                    if (field.resetValueAfterSubmit) {
                      field.resetValue();
                    }
                  });

                  await props.doAfterSubmit(response);
                } catch (error) {
                  if (error.response && error.response.status === 400) {
                    Object.entries(props.getErrorRoot(error)).
                        forEach(([fieldApiName, errors]) => {
                          if (fieldApiName === 'non_field_errors') {
                            setNonFieldValidationErrors(errors);
                          } else {
                            fields[fieldApiName].setValidationErrors(errors);
                          }
                        });
                  } else {
                    throw error;
                  }
                } finally {
                  props.setLoading(false);
                }
              });
            }}>
        <FormContext.Provider
            value={{fields: fields, setFields: setFields}}>
          {props.children}
        </FormContext.Provider>
        {!isEmpty(nonFieldValidationErrors) && (
            <React.Fragment>
              <Box mt={2}/>
              {nonFieldValidationErrors.map(nonFieldError => (
                  <FormHelperText error>{nonFieldError}</FormHelperText>
              ))}
            </React.Fragment>
        )}
        {message}
      </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  noValidate: PropTypes.bool,
  setLoading: PropTypes.func.isRequired,
  checkBeforeSubmit: PropTypes.func,
  doAfterSubmit: PropTypes.func,
  getApiEndpoint: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  getRequestBodyStructure: PropTypes.func,
  getErrorRoot: PropTypes.func,
};

Form.defaultProps = {
  noValidate: true,
  checkBeforeSubmit: () => true,
  doAfterSubmit: () => {},
  getRequestBodyStructure: data => data,
  getErrorRoot: error => error.response.data,
};