import React, {ReactNode, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {sentenceCase} from 'change-case';
import {sentenceCaseUtf8} from '../../../utility';

import {TranslationContext} from '../../Translation/Translation';
import {FormContext} from '../Form';
import {CheckboxField} from './Types/CheckboxField';
import {IconField} from './Types/IconField/IconField';
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

export interface FieldProps {
  children: ReactNode,
  apiName: string,
  defaultValue?: any,
  resetValueAfterSubmit?: boolean,
  label: string,
  helpText?: string,
  disabled?: boolean,
  required?: boolean,
  onChange?: Function,
}
export const Field = (props: FieldProps) => {
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
      case IconField:
        initialValue = null;
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
        label: sentenceCaseUtf8(props.label),
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

Field.defaultProps = {
  resetValueAfterSubmit: true,
  helpText: '',
  disabled: false,
  required: true,
  onChange: () => {},
};

export const FieldAutoDefaultValueContext = React.createContext({
  provideDefaultValue: false,
  root: {},
});