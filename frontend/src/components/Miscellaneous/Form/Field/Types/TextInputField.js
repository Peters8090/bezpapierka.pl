import {Input} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {FieldContext} from '../Field';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const TextInputField = ({type = 'text', maxLength, multiline = false, leadingIcon}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <FieldContext.Consumer>
        {
          ({label, value, setValue}) => (
              <Input label={label}
                     inputProps={maxLength
                         ? {'maxLength': maxLength}
                         : undefined}
                     type={type === 'password' ?
                         (showPassword
                             ? 'text'
                             : 'password')
                         : type}
                     multiline={multiline}
                     rowsMin={1}
                     rowsMax={10}
                     endAdornment={type === 'password' && (
                         <InputAdornment position="end">
                           <IconButton
                               onClick={() => setShowPassword(
                                   prevState => !prevState)}>
                             {showPassword ? <Visibility/> :
                                 <VisibilityOff/>}
                           </IconButton>
                         </InputAdornment>
                     )}
                     value={value}
                     onChange={event => setValue(event.target.value)}/>
          )
        }
      </FieldContext.Consumer>
  );
};

TextInputField.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
};