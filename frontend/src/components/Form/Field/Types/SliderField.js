import Slider from '@material-ui/core/Slider';
import React, {useContext} from 'react';
import {FieldContext} from '../Field';
import {StandardFieldTypeWrapper} from '../StandardFieldTypeWrapper';

export const SliderField = ({valueLabelFormat}) => {
  const fieldContext = useContext(FieldContext);
  const {setValue, value} = fieldContext;

  return (
      <StandardFieldTypeWrapper {...fieldContext}>
        <Slider value={value}
                onChange={(_, newValue) => setValue(newValue)}
                valueLabelDisplay="auto"
                valueLabelFormat={valueLabelFormat}
                step={1}
                min={0}
                max={100}
        />
      </StandardFieldTypeWrapper>
  );
};