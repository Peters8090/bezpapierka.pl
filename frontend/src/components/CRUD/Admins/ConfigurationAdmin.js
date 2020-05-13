import PickerDialog from 'material-ui-color-picker/lib/components/PickerDialog';
import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {ConfigurationContext} from '../../../App';
import {CrudDialogForm} from '../DialogForm/CrudDialogForm';
import {FieldAutoDefaultValue} from '../DialogForm/Field/Field';
import {ColorField} from '../DialogForm/Field/Types/ColorField';
import {ImageField} from '../DialogForm/Field/Types/ImageField';
import {SelectField} from '../DialogForm/Field/Types/SelectField';
import {TextInputField} from '../DialogForm/Field/Types/TextInputField';

export const ConfigurationAdmin = withRouter(
    () => {
      const configurationContext = useContext(ConfigurationContext);

      const getRequestBodyStructure = data => data;

      const getApiEndpoint = () => `/configuration/1`;

      const getErrorRoot = error => error.response.data;

      return (
          <CrudDialogForm getApiEndpoint={getApiEndpoint}
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
    });