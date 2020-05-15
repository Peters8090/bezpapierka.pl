import {Input} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import React, {useState} from 'react';
import {FieldContext} from '../Field';
import {SketchPicker} from 'react-color';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const ColorField = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
      <FieldContext.Consumer>
        {({label, value, setValue}) => (
            <React.Fragment>
              <Input label={label}
                     inputProps={{style: {textTransform: 'uppercase'}}}
                     onMouseDown={event => {
                       setAnchorEl(event.currentTarget);
                       setShowPicker(true);
                     }}
                     value={value}/>

              <Popover open={showPicker}
                       anchorEl={anchorEl}
                       anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                       transformOrigin={{vertical: 'top', horizontal: 'left'}}
                       onClose={() => setShowPicker(false)}>
                <Box p={1.5} css={{userSelect: 'none'}}>
                  <SketchPicker onChange={color => setValue(color.hex)}
                               disableAlpha
                               color={value}/>
                </Box>
              </Popover>
            </React.Fragment>
        )}
      </FieldContext.Consumer>
  );
};