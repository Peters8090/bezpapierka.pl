import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React from 'react';

export const StandardFieldTypeWrapper = props => (
    <FormControl onFocus={() => props.setValidationErrors([])}
                 error={props.validationErrors.length > 0}
                 disabled={props.disabled}
                 required={props.required}
                 fullWidth={true}
                 margin={props.margin}
                 color='primary'
                 variant='outlined'>
      <InputLabel shrink>{props.label}</InputLabel>
      <Box mt={1.75}/>
      {props.children}
      {props.validationErrors.map(validationError => (
          <FormHelperText error>{validationError}</FormHelperText>
      ))}
      <FormHelperText error={false}>{props.helpText}</FormHelperText>
    </FormControl>
);

StandardFieldTypeWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
  setValidationErrors: PropTypes.func.isRequired,
  validationErrors: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string.isRequired,
};

StandardFieldTypeWrapper.defaultProps = {
  margin: 'dense',
};