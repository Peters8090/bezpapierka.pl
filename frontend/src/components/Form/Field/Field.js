import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {FormContext} from '../Form';
import {CheckboxField} from './Types/CheckboxField';
import {SliderField} from './Types/SliderField';

export const FieldContext = React.createContext({
  label: '',
  value: '',
  setValue: () => { },
  required: true,

  setValidationErrors: () => {},
  validationErrors: [],
  disabled: false,
  helpText: '',
});

export const Field = props => {
  let initialValue;
  if (props.defaultValue) {
    initialValue = props.defaultValue;
  } else {
    switch (props.children.type) {
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
      [props.apiName]: {
        value: value,
        setValidationErrors: setValidationErrors,
        resetValue: resetValue,
        resetValueAfterSubmit: props.resetValueAfterSubmit,
      },
    }));
    props.onChange(value);
  }, [value]);

  return (
      <FieldContext.Provider value={{
        label: props.label,
        value: value,
        setValue: setValue,
        required: props.required,

        setValidationErrors: setValidationErrors,
        validationErrors: validationErrors,
        disabled: props.disabled,
        helpText: props.helpText,
      }}>
        {props.children}
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
  onChange: PropTypes.func,
};

Field.propTypes = FieldPropTypes;

Field.defaultProps = {
  resetValueAfterSubmit: true,
  helpText: '',
  disabled: false,
  required: true,
  onChange: () => {},
};

// I put it here because of the lack of the PropTypes autocompletion when importing FieldPropTypes

export const FieldAutoDefaultValueContext = React.createContext({
  provideDefaultValue: false,
  root: {},
});

export const FieldAutoDefaultValue = props => {
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
};

FieldAutoDefaultValue.propTypes = FieldPropTypes;