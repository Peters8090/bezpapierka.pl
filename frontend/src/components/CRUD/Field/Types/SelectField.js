import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import PropTypes from "prop-types";
import React from "react";
import {FieldContext} from '../Field';

export const SelectField = ({options}) => (
    <FieldContext.Consumer>
        {
            ({value, setValue}) => (
                <Select value={value}
                        style={{width: '100%'}}
                        onChange={event => setValue(event.target.value)}>
                    {
                        options.map(option => (
                            <MenuItem key={option}
                                      value={option}>{option}</MenuItem>
                        ))
                    }
                </Select>
            )
        }
    </FieldContext.Consumer>
);

SelectField.propTypes = {
    options: PropTypes.array.isRequired,
};
