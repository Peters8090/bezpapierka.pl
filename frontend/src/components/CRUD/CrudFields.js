import {Box, Input, useTheme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const CrudFieldsContext = React.createContext({
    fields: [],
    setFields: () => {
    },
});

export const Field = ({disabled = false, required = true, label, helpText = '', children, defaultState}) => {
    const crudFieldsContext = useContext(CrudFieldsContext);

    const validationErrors = useState([]);
    const state = useState(defaultState);

    useEffect(() => {
        crudFieldsContext.setFields(prevState => prevState.concat([
            {
                state: state,
                validationErrors: validationErrors,
            },
        ]));
    });

    return (
        <FormControl key={label}
                     margin='dense'
                     onFocus={_ => validationErrors[1]([])}
                     error={validationErrors[0].length > 0}
                     fullWidth={true}
                     disabled={disabled}
                     color='secondary'
                     required={required}>
            <InputLabel shrink={[ImageField].includes(children.type) ? true : undefined}>{label}</InputLabel>
            {React.cloneElement(children, {
                state: state,
            })}
            {validationErrors[0].map(validationError =>
                <FormHelperText error>{validationError}</FormHelperText>)}
            <FormHelperText error={false}>{helpText}</FormHelperText>
        </FormControl>
    );
};

Field.propTypes = {
    defaultState: PropTypes.any,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
};

export const CrudTextField = ({label, maxLength, type, state}) => (
    <Input label={label}
           inputProps={maxLength ? {'maxLength': maxLength} : undefined}
           type={type}
           value={state[0]}
           onChange={event => state[1](event.target.value)}/>
);

CrudTextField.propTypes = {
    label: PropTypes.string.isRequired,
    maxLength: PropTypes.number,
    type: PropTypes.oneOf(['text', 'email']).isRequired,
    state: PropTypes.array.isRequired,
};

export const SelectField = ({options, state}) => (
    <Select value={state[0]}
            style={{width: '100%'}}
            onChange={event => state[1](event.target.value)}>
        {
            options.map(option => (
                <MenuItem key={option.component.name}
                          value={option.component.name}>{option.name}</MenuItem>
            ))
        }
    </Select>
);

SelectField.propTypes = {
    options: PropTypes.array.isRequired,
    state: PropTypes.array.isRequired,
};

export const ImageField = ({id, state}) => {
    const theme = useTheme();

    return (
        <React.Fragment>
            <input
                accept="image/*"
                style={{width: 0, height: 0}}
                id={id}
                onChange={event => {
                    const image = event.target.files[0];
                    if (image !== undefined) {
                        if (image.size > 3145728) {
                            event.target.value = '';
                            alert("Przesłany plik jest za duży. Maksymalna wielkość to 3MB.");
                        } else
                            state[1](event.target.files[0]);
                    }
                }}
                type="file"
            />
            <Box mt={3}
                 style={{border: '#ccc 1px dashed'}}
                 p={1.5}
                 display='flex'
                 flexDirection='column'
                 alignItems='center'>
                {state[0] && (
                    <Box mb={2}
                         p={1}
                         style={{border: '#ccc 1px dashed'}}
                         display='flex'
                         alignItems='center'>

                        <Avatar alt='Wybrany plik'
                                src={typeof state[0] === 'string' ? state[0] : URL.createObjectURL(state[0])}/>

                        <Typography style={{marginLeft: theme.spacing(1)}}
                                    variant='subtitle1'>
                            {typeof state[0] === 'string' ?
                                state[0].substring(state[0].lastIndexOf('/') + 1)
                                : state[0].name}
                        </Typography>
                    </Box>
                )}
                <Button variant="contained"
                        color="primary"
                        size='small'
                        component='label'
                        htmlFor={id}>
                    Wybierz plik
                </Button>
            </Box>
        </React.Fragment>
    );
};

ImageField.propTypes = {
    id: PropTypes.any.isRequired,
    state: PropTypes.array.isRequired,
};