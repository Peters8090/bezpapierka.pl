import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {FieldContext, FieldWrapper} from '../Field';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const SelectField = ({options, onChange = () => {}}) => {
  const fieldContext = useContext(FieldContext);
  const {labelFor, value, setValue} = fieldContext;

  const styles = {
    capitalizeText: css`
      text-transform: capitalize;
    `,
  };

  return (
      <FieldWrapper {...fieldContext}>
        <Select value={value}
                css={styles.capitalizeText}
                labelId={labelFor}
                onChange={event => {
                  setValue(event.target.value);
                  onChange(event);
                }}>
          {options.map(option => (
              <MenuItem key={option[0]}
                        value={option[0]}
                        css={styles.capitalizeText}>{option[1]}</MenuItem>
          ))}
        </Select>
      </FieldWrapper>
  );
};

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};
