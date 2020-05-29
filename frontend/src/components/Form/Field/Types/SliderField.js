import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import React, {useContext} from 'react';
import {FieldContext, FieldWrapper} from '../Field';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const SliderField = ({valueLabelFormat}) => {
  const fieldContext = useContext(FieldContext);
  const {setValue, value} = fieldContext;

  return (
      <FieldWrapper {...fieldContext}>
        <Slider value={value}
                onChange={(_, newValue) => setValue(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                step={1}
                min={0}
                max={100}
        />
      </FieldWrapper>
  );
};