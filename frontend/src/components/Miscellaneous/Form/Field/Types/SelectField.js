import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import {FieldContext, FieldWrapper} from '../Field';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const SelectField = ({options, onChange = () => {}}) => (
    <FieldContext.Consumer>
      {
        ({value, setValue}) => (
            <FieldWrapper>
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
            </FieldWrapper>
        )
      }
    </FieldContext.Consumer>
);

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
