import React, {useContext, useState} from 'react';
import Popover from '@material-ui/core/Popover';
import useTheme from '@material-ui/core/styles/useTheme';
import {SketchPicker} from 'react-color';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {FieldContext} from '../Field';
import {TextInputField} from './TextInputField';

export const ColorField = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fieldContext = useContext(FieldContext);
  const {value, setValue} = fieldContext;

  const theme = useTheme();
  const styles = {
    popOver: css`
      user-select: none;
      .sketch-picker {
        background-color: ${theme.palette.background.paper} !important;
        font-family: ${theme.typography.fontFamily};
        
        & > *:nth-child(3) * {
          background-color: inherit !important;
          color: ${theme.palette.text.primary} !important;
        }
      }
    `,
  };

  return (
      <React.Fragment>
        <TextInputField inputProps={{style: {textTransform: 'uppercase'}}}
                        onMouseDown={event => {
                          setAnchorEl(event.currentTarget);
                          setShowPicker(true);
                        }}
        />

        <Popover open={showPicker}
                 anchorEl={anchorEl}
                 css={styles.popOver}
                 anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                 transformOrigin={{vertical: 'top', horizontal: 'left'}}
                 onClose={() => setShowPicker(false)}>
          <SketchPicker onChange={color => setValue(color.hex)}
                        disableAlpha
                        color={value}/>
        </Popover>
      </React.Fragment>
  );
};