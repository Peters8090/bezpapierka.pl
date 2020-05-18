import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {ConfigurationContext} from '../../../App';
import {CrudDialogForm} from '../CrudDialogForm';
import {FieldAutoDefaultValue} from '../../Miscellaneous/Form/Field/Field';
import {ColorField} from '../../Miscellaneous/Form/Field/Types/ColorField';
import {ImageField} from '../../Miscellaneous/Form/Field/Types/ImageField';
import {SelectField} from '../../Miscellaneous/Form/Field/Types/SelectField';
import {TextInputField} from '../../Miscellaneous/Form/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const ConfigurationAdmin = ({open, setOpen}) => {
  const configurationContext = useContext(ConfigurationContext);

  const getRequestBodyStructure = data => data;

  const getApiEndpoint = () => `/configuration/1`;

  const getErrorRoot = error => error.response.data;

  return (
      <CrudDialogForm getApiEndpoint={getApiEndpoint}
                      open={open}
                      setOpen={setOpen}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getErrorRoot={getErrorRoot}
                      createTitle=''
                      editTitle='Skonfiguruj stronę'
                      editValuesRoot={configurationContext}>
        <FieldAutoDefaultValue apiName='site_name' label='Nazwa strony'>
          <TextInputField maxLength={30}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='logo' label='Logo' required={false}>
          <ImageField/>
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
      </CrudDialogForm>
  );
};