import {Input} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import useTheme from '@material-ui/core/styles/useTheme';
import React, {useContext, useState} from 'react';
import {FieldContext, FieldWrapper} from '../Field';
import {SketchPicker} from 'react-color';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const ColorField = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const fieldContext = useContext(FieldContext);
  const {labelFor, value, setValue} = fieldContext;

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
      <FieldWrapper {...fieldContext}>
        <Input inputProps={{style: {textTransform: 'uppercase'}}}
               id={labelFor}
               onMouseDown={event => {
                 setAnchorEl(event.currentTarget);
                 setShowPicker(true);
               }}
               value={value}/>

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
      </FieldWrapper>
  );
};