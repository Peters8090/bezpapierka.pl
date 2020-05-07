import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../App';
import {myAxios} from '../../axios';
import {emptyValues} from '../../utility';
import {DialogForm, DialogWithProps} from './DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {Field} from './DialogForm/Field/Field';
import {
  FieldAutoDefaultValue,
  FieldAutoDefaultValueContext,
} from './DialogForm/Field/FieldAutoDefaultValue';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';

export const BasicInfoCreateEditDialog = withRouter(
    ({isEdit, basic_info, location}) => {
      const currentPage = useContext(PagesContext).
          find(page => page.link === location.pathname);
      const onSubmit = async fields => {
        let requestBody = {};
        Object.values(fields).forEach(field => {
          if (!(emptyValues.includes(field.value)))
            requestBody[field.apiName] = field.value;
        });

        requestBody = {
          basic_infos: [
            ...currentPage.basic_infos,
            {
              ...requestBody,
              ...(basic_info && {id: basic_info.id}),
            },
          ],
        };

        try {
          const response = await myAxios.patch(`/contact_page/${currentPage.id}`,
              requestBody);

          window.location.replace(response.data.link);
        } catch (error) {
          if (!emptyValues.includes(error) && error.response.data.basic_infos) {
            Object.entries(error.response.data.basic_infos.slice(-1).pop()).
                forEach(([fieldName, errors]) => {
                  const field = Object.values(fields).
                      find(field => field.apiName === fieldName);

                  field.setValidationErrors(errors);
                });
          }
        }
      };

      return (
          <DialogForm onSubmit={onSubmit}
                      title={isEdit ? 'Edytuj informację' : 'Dodaj informację'}>
            <FieldAutoDefaultValueContext.Provider
                value={{provideDefaultValue: isEdit, root: basic_info}}>
              <FieldAutoDefaultValue label='Tytuł' apiName='title'>
                <TextInputField maxLength={50}/>
              </FieldAutoDefaultValue>
              <FieldAutoDefaultValue label='Ikona' apiName='icon'
                                     helpText="Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.">
                <TextInputField maxLength={50}/>
              </FieldAutoDefaultValue>
            </FieldAutoDefaultValueContext.Provider>
          </DialogForm>
      );
    });

BasicInfoCreateEditDialog.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  basic_info: PropTypes.object,
};