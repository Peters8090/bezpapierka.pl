import React, {useContext} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {FieldContext} from '../Field';
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