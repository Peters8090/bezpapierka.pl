import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import {TextInputField} from './TextInputField';

export const SelectField = props => (
    <TextInputField select>
      {props.options.map(option => (
          <MenuItem key={option[0]}
                    value={option[0]}>{option[1]}</MenuItem>
      ))}
    </TextInputField>
)

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
}