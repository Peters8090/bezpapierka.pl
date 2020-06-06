import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {ConfigurationContext} from '../../Configuration/Configuration';
import {SliderField} from '../../Form/Field/Types/SliderField';
import {ColorField} from '../../Form/Field/Types/ColorField';
import {ImageField} from '../../Form/Field/Types/ImageField';
import {SelectField} from '../../Form/Field/Types/SelectField';
import {TextInputField} from '../../Form/Field/Types/TextInputField';
import {TranslationContext} from '../../Translation/Translation';
import {CRUDDialogForm} from '../CRUDDialogForm';
import {CRUDField} from '../CRUDField';

export const ConfigurationAdmin = props => {
  const configurationContext = useContext(ConfigurationContext);
  const translationContext = useContext(TranslationContext);

  const getText = translationContext.gettext;
  const _ = translationContext.gettextDjango;
  const translations = {
    editTitle: getText('Configure your website'),
  };

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
                      editTitle={translations.editTitle}
                      editValuesRoot={configurationContext.configuration}>
        <CRUDField apiName='site_name'>
          <TextInputField maxLength={30}/>
        </CRUDField>
        <CRUDField apiName='language'>
          <SelectField options={[['pl', _`Polish`], ['en-us', _`English`]]}/>
        </CRUDField>
        <CRUDField apiName='favicon'>
          <ImageField/>
        </CRUDField>
        <CRUDField apiName='logo' required={false}>
          <ImageField/>
        </CRUDField>
        <CRUDField apiName='wave_border_height'
                   helpText={_`1vh = 1% viewport height.`}>
          <SliderField valueLabelFormat={value => `${value}vh`}/>
        </CRUDField>
        <CRUDField apiName='theme'>
          <SelectField options={[['light', _`Light`], ['dark', `Dark`]]}/>
        </CRUDField>
        <CRUDField apiName='primary_color'>
          <ColorField/>
        </CRUDField>
        <CRUDField apiName='secondary_color'>
          <ColorField/>
        </CRUDField>
        <CRUDField apiName='default_background_image'
                   required={false}>
          <ImageField/>
        </CRUDField>
        <CRUDField apiName='default_background_size'
                   required={false} defaultValue='cover'>
          <SelectField options={[
            ['auto', _`Auto`],
            ['cover', _`Cover`],
            ['contain', _`Contain`]]}/>
        </CRUDField>
      </CRUDDialogForm>
  );
};

ConfigurationAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};