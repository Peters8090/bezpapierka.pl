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
                      setOpen={props.setOpen}
                      doAfterSubmit={configurationContext.fetchConfiguration}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getErrorRoot={getErrorRoot}
                      createTitle=''
                      editTitle='Skonfiguruj stronę'
                      editValuesRoot={configurationContext.configuration}>
        <FieldAutoDefaultValue apiName='site_name' label='Nazwa strony'>
          <TextInputField maxLength={30}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='favicon' label='Ikona ulubionych'>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='logo' label='Logo' required={false}>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='wave_border_height' label='Wysokość fali' helpText='1vh = 1% wysokości obszaru roboczego ekranu'>
          <SliderField valueLabelFormat={value => `${value}vh`}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='theme' label='Motyw'>
          <SelectField options={[['light', 'Jasny'], ['dark', 'Ciemny']]}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='primary_color'
                               label='Kolor podstawowy'>
          <ColorField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='secondary_color'
                               label='Kolor pochodny'>
          <ColorField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Domyślne tło' apiName='default_background_image'
                               required={false}>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='default_background_size' label='Rozmiar domyślnego tła' required={false} defaultValue='cover'>
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
  setOpen: PropTypes.func.isRequired,
};