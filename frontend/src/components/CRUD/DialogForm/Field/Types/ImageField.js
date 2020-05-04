import {Box, useTheme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {FieldContext} from '../Field';

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