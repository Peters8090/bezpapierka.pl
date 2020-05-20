import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React, {useContext} from 'react';
import {VirtualizedAutocomplete} from '../../../VirtualizedAutocomplete';
import {FieldContext, FieldWrapper} from '../Field';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const CheckboxField = () => {
  const fieldContext = useContext(FieldContext);
  const {label, value, setValue, required} = fieldContext;

  const styles = {
    formControlLabel: css`
      user-select: none;
    `,
  };

  return (
      <FieldWrapper shrinkLabel margin='none' {...{
        ...fieldContext,
        label: '',
        required: false,
      }}>
          <FormControlLabel
              css={styles.formControlLabel}
              control={
                <Checkbox
                    checked={value ?? false}
                    onChange={event => setValue(event.target.checked)}
                    required={required}
                    color="secondary"
                />
              }
              label={label}
          />
      </FieldWrapper>
  );
};