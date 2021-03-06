import React, {useContext, useState} from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {FieldContext} from '../Field';

export const TextInputField = ({type, maxLength, multiline, children, ...extraProps}) => {
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
                   variant='outlined'
                   multiline={multiline}
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
                           <FormHelperText error>
                             {validationError}
                           </FormHelperText>
                       ))}
                       <FormHelperText
                           error={false}>
                         {helpText}
                       </FormHelperText>
                     </React.Fragment>
                   }
                   margin='dense'
                   required={required}
                   onChange={event => {
                     setValue(event.target.value);
                   }}
                   {...extraProps}>
          {children}
        </TextField>
      </React.Fragment>
  );
};

TextInputField.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['text', 'email', 'password']),
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
};

TextInputField.defaultProps = {
  type: 'text',
  multiline: false,
};