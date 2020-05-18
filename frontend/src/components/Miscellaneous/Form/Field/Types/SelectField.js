import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import {FieldContext} from '../Field';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const SelectField = ({options, onChange = () => {}}) => (
    <FieldContext.Consumer>
      {
        ({value, setValue}) => (
            <Select value={value}
                    css={{width: '100%'}}

                    onChange={event => {
                      setValue(event.target.value);
                      onChange(event);
                    }}>
              {
                options.map(option => (
                    <MenuItem key={option[0]}
                              value={option[0]}>{option[1]}</MenuItem>
                ))
              }
            </Select>
        )
      }
    </FieldContext.Consumer>
);

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
