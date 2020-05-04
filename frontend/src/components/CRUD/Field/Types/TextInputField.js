import {Input} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import {FieldContext} from '../Field';

export const TextInputField = ({maxLength, type = 'text'}) => (
    <FieldContext.Consumer>
        {
            ({label, value, setValue}) => (
                <Input label={label}
                       inputProps={maxLength ? {'maxLength': maxLength} : undefined}
                       type={type}
                       value={value}
                       onChange={event => setValue(event.target.value)}/>
            )
        }
    </FieldContext.Consumer>
);

TextInputField.propTypes = {
    maxLength: PropTypes.number,
    type: PropTypes.oneOf(['text', 'email']),
};