import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React, {useContext} from 'react';
import {VirtualizedAutocomplete} from '../../../Miscellaneous/VirtualizedAutocomplete';
import {FieldContext} from '../Field';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {StandardFieldTypeWrapper} from '../StandardFieldTypeWrapper';

export const CheckboxField = () => {
  const fieldContext = useContext(FieldContext);
  const {label, value, setValue, required} = fieldContext;

  const styles = {
    formControlLabel: css`
      user-select: none;
    `,
  };

  return (
      <StandardFieldTypeWrapper margin='none' {...{
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
                    color='primary'
                />
              }
              label={label}
          />
      </StandardFieldTypeWrapper>
  );
};