import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {IconField} from './Types/IconField/IconField';
import {ImageField} from './Types/ImageField';
import uniqid from 'uniqid';
import {FormContext} from '../Form';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const FieldContext = React.createContext({
  label: '',
  value: '',
  setValue: () => {
  },
  required: true,

  setValidationErrors: () => {},
  validationErrors: [],
  disabled: false,
  helpText: '',
});

export const Field = ({children, apiName, defaultValue, label, helpText = '', disabled = false, required = true}) => {
  if (!defaultValue) {
    defaultValue = '';
  }
  const [value, setValue] = useState(defaultValue);
  const [validationErrors, setValidationErrors] = useState([]);

  const formContext = useContext(FormContext);
  useEffect(() => {
    formContext.setFields(prevState => ({
      ...prevState,
      [apiName]: {
        value: value,
        setValidationErrors: setValidationErrors,
      },
    }));
  }, [value]);

  const shrinkLabel = [ImageField].includes(children.type) ? true : undefined;

  const [labelFor] = useState(uniqid());

  return (
      <FieldContext.Provider value={{
        labelFor: labelFor,

        label: label,
        value: value,
        setValue: setValue,
        required: required,

        setValidationErrors: setValidationErrors,
        validationErrors: validationErrors,
        disabled: disabled,
        helpText: helpText,
      }}>
        {
          [IconField].includes(children.type) ? children : (
              <FormControl margin='dense'
                           onFocus={() => setValidationErrors([])}
                           error={validationErrors.length > 0}
                           fullWidth={true}
                           disabled={disabled}
                           color='secondary'
                           required={required}>
                <InputLabel shrink={shrinkLabel} htmlFor={labelFor}>{label}</InputLabel>
                {children}
                {validationErrors.map(validationError => (
                    <FormHelperText error>{validationError}</FormHelperText>
                ))}
                <FormHelperText error={false}>{helpText}</FormHelperText>
              </FormControl>
          )
        }
      </FieldContext.Provider>
  );
};

const FieldPropTypes = {
  children: PropTypes.node.isRequired,
  apiName: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

Field.propTypes = FieldPropTypes;

export const FieldAutoDefaultValueContext = React.createContext({
  provideDefaultValue: false,
  root: {},
});

export const FieldAutoDefaultValue = withRouter(props => {
  const fieldAutoDefaultValueContext = useContext(FieldAutoDefaultValueContext);

  return (
      <Field defaultValue={fieldAutoDefaultValueContext.provideDefaultValue
          ? fieldAutoDefaultValueContext.root[props.apiName]
          : undefined} {...props}>
        {props.children}
      </Field>
  );
});

FieldAutoDefaultValue.propTypes = FieldPropTypes;