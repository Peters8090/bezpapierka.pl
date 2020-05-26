import {Input} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {FieldContext, FieldWrapper} from '../Field';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const TextInputField = ({type = 'text', maxLength, multiline = false, variant='standard'}) => {
  const [showPassword, setShowPassword] = useState(false);

  const fieldContext = useContext(FieldContext);
  const {value, setValue, setValidationErrors, required, label, disabled, helpText, validationErrors} = fieldContext;

  return (
      <React.Fragment>
        <TextField type={type}
                   inputProps={{
                     maxLength: maxLength,
                     endAdornment: type === 'password' && (
                         <InputAdornment position="end">
                           <IconButton
                               onClick={() => setShowPassword(
                                   prevState => !prevState)}>
                             {showPassword ? <Visibility/> :
                                 <VisibilityOff/>}
                           </IconButton>
                         </InputAdornment>
                     ),
                   }}
                   variant={variant}
                   multiline={multiline}
                   rows={5}
                   rowsMax={10}
                   fullWidth={true}
                   disabled={disabled}
                   error={validationErrors.length > 0}
                   onFocus={() => setValidationErrors([])}
                   value={value}
                   color='primary'
                   label={label}
                   helperText={
                     <React.Fragment>
                       {validationErrors.map(validationError => (
                           <FormHelperText
                               error>{validationError}</FormHelperText>
                       ))}
                       <FormHelperText
                           error={false}>{helpText}</FormHelperText>
                     </React.Fragment>
                   }
                   margin='dense'
                   required={required}
                   onChange={event => setValue(event.target.value)}
        />
      </React.Fragment>
  );
};

TextInputField.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
};