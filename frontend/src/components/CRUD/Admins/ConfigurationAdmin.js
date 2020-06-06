import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {ConfigurationContext} from '../../Configuration/Configuration';
import {SliderField} from '../../Form/Field/Types/SliderField';
import {FieldAutoDefaultValue} from '../../Form/Field/Field';
import {ColorField} from '../../Form/Field/Types/ColorField';
import {ImageField} from '../../Form/Field/Types/ImageField';
import {SelectField} from '../../Form/Field/Types/SelectField';
import {TextInputField} from '../../Form/Field/Types/TextInputField';
import {CRUDDialogForm} from '../CRUDDialogForm';

export const ConfigurationAdmin = props => {
  const configurationContext = useContext(ConfigurationContext);

  const getRequestBodyStructure = data => data;

  const getApiEndpoint = () => `/configuration/1`;

  const getErrorRoot = error => error.response.data;

  return (
      <CRUDDialogForm getApiEndpoint={getApiEndpoint}
                      open={props.open}
                      onClose={props.onClose}
                      doAfterSubmit={configurationContext.fetchConfiguration}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getErrorRoot={getErrorRoot}
                      createTitle=''
                      editTitle='Skonfiguruj stronę'
                      editValuesRoot={configurationContext.configuration}>
        <FieldAutoDefaultValue apiName='site_name'>
          <TextInputField maxLength={30}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='language'>
          <SelectField options={[['pl', 'Polski'], ['en-us', 'Angielski']]}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='favicon'>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='logo' required={false}>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='wave_border_height'
                               helpText='1vh = 1% wysokości obszaru roboczego ekranu'>
          <SliderField valueLabelFormat={value => `${value}vh`}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='theme'>
          <SelectField options={[['light', 'Jasny'], ['dark', 'Ciemny']]}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='primary_color'>
          <ColorField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='secondary_color'>
          <ColorField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='default_background_image'
                               required={false}>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='default_background_size'
                               required={false} defaultValue='cover'>
          <SelectField options={[
            ['auto', 'Auto'],
            ['cover', 'Pokrywaj'],
            ['contain', 'Zawieraj']]}/>
        </FieldAutoDefaultValue>
      </CRUDDialogForm>
  );
};

ConfigurationAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};