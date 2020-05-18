import {Box, useTheme} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import {getBase64, isEmpty} from '../../../../../utility';
import {FieldContext} from '../Field';
import ClearIcon from '@material-ui/icons/Clear';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const ImageField = () => {
  const theme = useTheme();

  const [filename, setFilename] = useState();

  return (
      <FieldContext.Consumer>
        {
          ({label, value, setValue, required}) => (
              <React.Fragment>
                <input
                    accept="image/*"
                    css={{width: 0, height: 0}}
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
                     css={{border: '#ccc 1px dashed'}}
                     p={1.5}
                     display='flex'
                     flexDirection='column'
                     alignItems='center'>
                  {value && (
                      <Box mb={2}
                           p={1}
                           css={{border: '#ccc 1px dashed'}}
                           display='flex'
                           alignItems='center'>

                        <Avatar alt='Wybrany plik'
                                src={value}/>

                        <Typography css={{marginLeft: theme.spacing(1)}}
                                    variant='subtitle1'>
                          {filename ??
                          value.substring(value.lastIndexOf('/') + 1)}
                        </Typography>
                      </Box>
                  )}
                  <Box display='flex' justifyContent='center'
                       alignItems='center'>
                    <Button variant="contained"
                            color="primary"
                            size='small'
                            component='label'
                            htmlFor={label}>
                      Wybierz plik
                    </Button>
                    {!required && !isEmpty(value) && (
                        <IconButton onClick={() => setValue(null)}>
                          <ClearIcon/>
                        </IconButton>
                    )}
                  </Box>
                </Box>
              </React.Fragment>
          )
        }
      </FieldContext.Consumer>
  );
};