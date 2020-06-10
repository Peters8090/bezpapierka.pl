import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

import {sentenceCaseUtf8} from '../../../../utility';
import {TextInputField} from './TextInputField';

export const SelectField = props => (
    <TextInputField select>
      {props.options.map(option => {
        return (
            <MenuItem key={option[0]}
                      value={option[0]}>{sentenceCaseUtf8(option[1])}</MenuItem>
        );
      })}
    </TextInputField>
);

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
};