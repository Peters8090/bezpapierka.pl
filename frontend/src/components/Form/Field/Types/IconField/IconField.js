import {Box} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import React, {useContext} from 'react';
import {isEmpty} from '../../../../../utility';
import {VirtualizedAutocomplete} from '../../../../Miscellaneous/VirtualizedAutocomplete';
import {FieldContext} from '../../Field';
import {TextInputField} from '../TextInputField';
import IconsList from './IconsList';

export const IconField = () => {
  const {value, setValue, setValidationErrors, disabled} = useContext(
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
          options={IconsList}
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
              <TextInputField {...params} onChange={() => {}}/>
          )}
      />
  );
};
