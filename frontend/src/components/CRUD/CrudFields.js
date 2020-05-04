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

export const FieldsContext = React.createContext({
    fields: [],
    setFields: () => {
    },
});

const FieldContext = React.createContext({
    label: '',
    value: '',
    setValue: () => {
    },
});

export const Field = ({children, apiName, defaultValue, label, helpText = '', disabled = false, required = true}) => {
    if (!defaultValue) {
        switch (children.type) {
            case CrudTextField:
            case SelectField:
            case ImageField:
                defaultValue = '';
                break;
        }
    }
    const [value, setValue] = useState(defaultValue);
    const [validationErrors, setValidationErrors] = useState([]);

    const crudFieldsContext = useContext(FieldsContext);
    useEffect(() => {
        crudFieldsContext.setFields(prevState => ({
            ...prevState,
            [apiName]: {
                value: value,
                setValidationErrors: setValidationErrors,
            },
        }));
    }, [value]);

    return (
        <FormControl key={label}
                     margin='dense'
                     onFocus={_ => setValidationErrors([])}
                     error={validationErrors.length > 0}
                     fullWidth={true}
                     disabled={disabled}
                     color='secondary'
                     required={required}>
            <InputLabel shrink={[ImageField].includes(children.type) ? true : undefined}>{label}</InputLabel>
            <FieldContext.Provider value={{
                label: label,
                value: value,
                setValue: setValue,
            }}>
                {children}
            </FieldContext.Provider>
            {validationErrors.map(validationError => (
                <FormHelperText error>{validationError}</FormHelperText>
            ))}
            <FormHelperText error={false}>{helpText}</FormHelperText>
        </FormControl>
    );
};

Field.propTypes = {
    children: PropTypes.node.isRequired,
    apiName: PropTypes.string.isRequired,
    defaultValue: PropTypes.any,
    label: PropTypes.string.isRequired,
    helpText: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
};

export const CrudTextField = ({maxLength, type = 'text'}) => (
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

CrudTextField.propTypes = {
    maxLength: PropTypes.number,
    type: PropTypes.oneOf(['text', 'email']),
};

export const SelectField = ({options}) => (
    <FieldContext.Consumer>
        {
            ({label, value, setValue}) => (
                <Select value={value}
                        style={{width: '100%'}}
                        onChange={event => setValue(event.target.value)}>
                    {
                        options.map(option => (
                            <MenuItem key={option.component.name}
                                      value={option.component.name}>{option.name}</MenuItem>
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

export const ImageField = () => {
    const theme = useTheme();

    return (
        <FieldContext.Consumer>
            {
                ({label, value, setValue}) => (
                    <React.Fragment>
                        <input
                            accept="image/*"
                            style={{width: 0, height: 0}}
                            id={label}
                            onChange={event => {
                                const image = event.target.files[0];
                                if (image !== undefined) {
                                    if (image.size > 3145728) {
                                        event.target.value = '';
                                        alert("Przesłany plik jest za duży. Maksymalna wielkość to 3MB.");
                                    } else
                                        setValue(event.target.files[0]);
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
                            {value && (
                                <Box mb={2}
                                     p={1}
                                     style={{border: '#ccc 1px dashed'}}
                                     display='flex'
                                     alignItems='center'>

                                    <Avatar alt='Wybrany plik'
                                            src={typeof value === 'string' ? value : URL.createObjectURL(value)}/>

                                    <Typography style={{marginLeft: theme.spacing(1)}}
                                                variant='subtitle1'>
                                        {typeof value === 'string' ?
                                            value.substring(value.lastIndexOf('/') + 1)
                                            : value.name}
                                    </Typography>
                                </Box>
                            )}
                            <Button variant="contained"
                                    color="primary"
                                    size='small'
                                    component='label'
                                    htmlFor={label}>
                                Wybierz plik
                            </Button>
                        </Box>
                    </React.Fragment>
                )
            }
        </FieldContext.Consumer>
    );
};