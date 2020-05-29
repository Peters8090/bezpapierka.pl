import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {FieldContext, FieldWrapper} from '../Field';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {TextInputField} from './TextInputField';

export const SelectField = ({options, onChange = () => {}}) => (
    <TextInputField select onChange={onChange}>
      {options.map(option => (
          <MenuItem key={option[0]}
                    value={option[0]}>{option[1]}</MenuItem>
      ))}
    </TextInputField>
)

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
}
