import React, {useContext} from 'react';
import Slider from '@material-ui/core/Slider';

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

                color='primary'
                step={1}
                min={0}
                max={100}
        />
      </StandardFieldTypeWrapper>
  );
};