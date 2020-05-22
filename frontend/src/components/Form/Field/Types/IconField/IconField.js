import {Box} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import React, {useContext} from 'react';
import {isEmpty} from '../../../../../utility';
import {VirtualizedAutocomplete} from '../../../../Miscellaneous/VirtualizedAutocomplete';
import {FieldContext, NoFormControl} from '../../Field';
import IconsList from './IconsList';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const IconField = () => {
  const icons = IconsList;

  const {label, value, setValue, required, setValidationErrors, validationErrors, disabled, helpText} = useContext(
      FieldContext);

  return (
      <VirtualizedAutocomplete
          disabled={disabled}
          value={value}
          onChange={(_, newValue) => {
            if (!isEmpty(newValue))
              setValue(newValue);
          }}
          onFocus={() => setValidationErrors([])}
          options={icons}
          getOptionLabel={option => option}
          openOnFocus
          renderOption={(option) => (
              <React.Fragment>
                <Icon>{option}</Icon>
                <Box mr={2}/>
                {option}
              </React.Fragment>
          )}
          renderInput={params => (
              <TextField {...params}
                         margin='dense'
                         color='primary'
                         fullWidth
                         error={validationErrors.length > 0}
                         label={label}
                         helperText={
                           <React.Fragment>
                             {validationErrors.map(
                                 validationError => (
                                     <FormHelperText
                                         error>{validationError}</FormHelperText>
                                 ))}
                             <FormHelperText
                                 error={false}>{helpText}</FormHelperText>
                           </React.Fragment>
                         }
                         required={required}

              />
          )}
      />
  );
};