import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {ImageField} from './Types/ImageField';
import {SelectField} from './Types/SelectField';
import {TextInputField} from './Types/TextInputField';

export const FieldsContext = React.createContext({
  fields: [],
  setFields: () => {
  },
});

export const FieldContext = React.createContext({
  label: '', value: '', setValue: () => {
  },
});

export const Field = ({children, apiName, defaultValue, label, helpText = '', disabled = false, required = true}) => {
  if (!defaultValue) {
    switch (children.type) {
      case TextInputField:
      case SelectField:
      case ImageField:
        defaultValue = '';
        break;
    }
  }
  const [value, setValue] = useState(defaultValue);
  const [validationErrors, setValidationErrors] = useState([]);

  const fieldsContext = useContext(FieldsContext);
  useEffect(() => {
    fieldsContext.setFields(prevState => ({
      ...prevState,
      [apiName]: {
        value: value,
        setValidationErrors: setValidationErrors,
      },
    }));
  }, [value]);

  const shrinkLabel = [ImageField].includes(children.type) ? true : undefined;

  return (
      <FormControl key={apiName}
                   margin='dense'
                   onFocus={_ => setValidationErrors([])}
                   error={validationErrors.length > 0}
                   fullWidth={true}
                   disabled={disabled}
                   color='secondary'
                   required={required}>
        <InputLabel shrink={shrinkLabel}>{label}</InputLabel>
        <FieldContext.Provider value={{
          label: label,
          value: value,
          setValue: setValue,
        }}>
          {children}
        </FieldContext.Provider>
        {validationErrors.map(validationError => (
            <FormHelperText error>{validationError}</FormHelperText>
        ))}
        <FormHelperText error={false}>{helpText}</FormHelperText>
      </FormControl>
  );
};

Field.propTypes = {
  children: PropTypes.node.isRequired,
  apiName: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};