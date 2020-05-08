import {Box, useTheme} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, {useState} from 'react';
import {getBase64} from '../../../../../utility';
import {FieldContext} from '../Field';

export const ImageField = () => {
    const theme = useTheme();

    const [filename, setFilename] = useState();

    return (
        <FieldContext.Consumer>
            {
                ({label, value, setValue}) => (
                    <React.Fragment>
                        <input
                            accept="image/*"
                            style={{width: 0, height: 0}}
                            id={label}
                            onChange={async event => {
                                const image = event.target.files[0];
                                if (image !== undefined) {
                                    setFilename(image.name);
                                    setValue(await getBase64(image));
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
                                            src={value}/>

                                    <Typography style={{marginLeft: theme.spacing(1)}}
                                                variant='subtitle1'>
                                        {filename ?? value.substring(value.lastIndexOf('/') + 1)}
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