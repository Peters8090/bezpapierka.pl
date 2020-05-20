import {Box, useTheme} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, {useState} from 'react';
import {getBase64, isEmpty} from '../../../../../utility';
import {FieldContext} from '../Field';
import uniqid from 'uniqid';
import ClearIcon from '@material-ui/icons/Clear';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const ImageField = () => {
  const [filename, setFilename] = useState();
  const [loading, setLoading] = useState(false);

  const [inputId] = useState(uniqid());

  const theme = useTheme();
  const styles = {
    input: css`
      width: 0;
      height: 0;
    `,
    imagePreviewRoot: css`
      border: #ccc 1px dashed;
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    previewWrapper: css`
      border: #ccc 1px dashed;
      display: flex;
      align-items: center;
    `,
    imageNameLabel: css`
      margin-left: ${theme.spacing(1)}px;
    `,
  };

  return (
      <FieldContext.Consumer>
        {
          ({value, setValue, required}) => (
              <React.Fragment>
                <input
                    accept="image/*"
                    css={styles.input}
                    id={inputId}
                    onChange={async event => {
                      const image = event.target.files[0];
                      if (image !== undefined) {
                        setLoading(true);
                        setValue(await getBase64(image));
                        setFilename(image.name);
                        setLoading(false);
                      }
                    }}
                    type="file"
                />
                <Box mt={3}
                     p={1.5}
                     css={styles.imagePreviewRoot}>
                  {value && (
                      <Box mb={2}
                           p={1}
                           css={styles.previewWrapper}>

                        <Avatar alt='Wybrany plik'
                                src={value}/>

                        <Typography css={styles.imageNameLabel}
                                    variant='subtitle1'>
                          {filename ??
                          value.substring(value.lastIndexOf('/') + 1)}
                        </Typography>
                      </Box>
                  )}
                  {loading ? <CircularProgress disableShrink={true}
                                               color='secondary'/> : (
                      <Box display='flex' justifyContent='center'
                           alignItems='center'>
                        <Button variant="contained"
                                color="secondary"
                                size='small'
                                component='label'
                                htmlFor={inputId}>
                          Wybierz plik
                        </Button>
                        {!required && !isEmpty(value) && (
                            <IconButton onClick={() => setValue(null)}>
                              <ClearIcon/>
                            </IconButton>
                        )}
                      </Box>
                  )}
                </Box>
              </React.Fragment>
          )
        }
      </FieldContext.Consumer>
  );
};