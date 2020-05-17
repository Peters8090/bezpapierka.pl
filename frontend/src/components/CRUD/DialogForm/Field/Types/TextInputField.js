import {Input} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {FieldContext} from '../Field';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const TextInputField = ({type = 'text', maxLength, multiline = false}) => (
    <FieldContext.Consumer>
      {
        ({label, value, setValue}) => (
            <Input label={label}
                   inputProps={maxLength ? {'maxLength': maxLength} : undefined}
                   type={type}
                   multiline={multiline}
                   rowsMin={1}
                   rowsMax={10}
                   value={value}
                   onChange={event => setValue(event.target.value)}/>
        )
      }
    </FieldContext.Consumer>
);

TextInputField.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
};