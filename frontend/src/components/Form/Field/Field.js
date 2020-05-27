import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import uniqid from 'uniqid';
import {FormContext} from '../Form';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {CheckboxField} from './Types/CheckboxField';
import {SliderField} from './Types/SliderField';

export const FieldContext = React.createContext({
  labelFor: '',
  label: '',
  value: '',
  setValue: () => { },
  required: true,

  setValidationErrors: () => {},
  validationErrors: [],
  disabled: false,
  helpText: '',
});

export const FieldWrapper = props => (
    <FormControl margin={props.margin ?? 'dense'}
                 onFocus={() => props.setValidationErrors([])}
                 error={props.validationErrors.length > 0}
                 fullWidth={true}
                 disabled={props.disabled}
                 color='primary'
                 required={props.required}>
      <InputLabel shrink={props.shrinkLabel}
                  htmlFor={props.labelFor}>{props.label}</InputLabel>
      {props.children}
      {props.validationErrors.map(validationError => (
          <FormHelperText error>{validationError}</FormHelperText>
      ))}
      <FormHelperText error={false}>{props.helpText}</FormHelperText>
    </FormControl>
);

export const Field = ({children, apiName, defaultValue, resetValueAfterSubmit = true, label, helpText = '', disabled = false, required = true}) => {
  let initialValue;

  if (defaultValue) {
    initialValue = defaultValue;
  } else {
    switch (children.type) {
      case CheckboxField:
        initialValue = false;
        break;
      case SliderField:
        initialValue = 0;
        break;
      default:
        initialValue = '';
        break;
    }
  }

  const [value, setValue] = useState(initialValue);
  const [validationErrors, setValidationErrors] = useState([]);

  const resetValue = () => {
    setValue(initialValue);
  };

  const formContext = useContext(FormContext);
  useEffect(() => {
    formContext.setFields(prevState => ({
      ...prevState,
      [apiName]: {
        value: value,
        setValidationErrors: setValidationErrors,
        resetValue: resetValue,
        resetValueAfterSubmit: resetValueAfterSubmit,
      },
    }));
  }, [value]);

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
        {children}
      </FieldContext.Provider>
  );
};

const FieldPropTypes = {
  children: PropTypes.node.isRequired,
  apiName: PropTypes.string.isRequired,
  defaultValue: PropTypes.any,
  resetValueAfterSubmit: PropTypes.bool,
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
      <Field
          resetValueAfterSubmit={!fieldAutoDefaultValueContext.provideDefaultValue} {...props}
          defaultValue={fieldAutoDefaultValueContext.provideDefaultValue
              ? fieldAutoDefaultValueContext.root[props.apiName]
              : props.defaultValue}>
        {props.children}
      </Field>
  );
});

FieldAutoDefaultValue.propTypes = FieldPropTypes;