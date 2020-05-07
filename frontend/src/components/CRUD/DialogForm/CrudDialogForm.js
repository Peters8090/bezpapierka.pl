import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../../App';
import {myAxios} from '../../../axios';
import {emptyValues} from '../../../utility';
import {DialogForm, DialogWithProps} from '../DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {
  FieldAutoDefaultValue,
  FieldAutoDefaultValueContext,
} from './Field/FieldAutoDefaultValue';
import {TextInputField} from './Field/Types/TextInputField';

export const ExampleCreateEditDialog = withRouter(props => {
  const currentPage = useContext(PagesContext).
      find(page => page.link === props.location.pathname);

  const getReqSkeleton = requestBody => ({
    basic_infos: [
      ...currentPage.basic_infos,
      {
        ...requestBody,
        ...(props.basic_info && {id: props.basic_info.id}),
      },
    ],
  });

  return (
      <CrudDialogForm isEdit={false}
                      endpoint={`/contact_page/${currentPage.id}`}
                      reqSkeleton={getReqSkeleton}
                      root={props.basic_info}>
        <FieldAutoDefaultValue label='Tytuł' apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Ikona' apiName='icon'
                               helpText="Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.">
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
      </CrudDialogForm>
  );
});

export const CrudDialogForm = ({isEdit, root, reqSkeleton, endpoint, children}) => {
  const onSubmit = async fields => {
    let requestBody = {};
    Object.values(fields).forEach(field => {
      if (!(emptyValues.includes(field.value)))
        requestBody[field.apiName] = field.value;
    });

    try {
      const response = await myAxios.patch(endpoint, reqSkeleton(requestBody));

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
            value={{provideDefaultValue: isEdit, root: root}}>
          {children}
        </FieldAutoDefaultValueContext.Provider>
      </DialogForm>
  );
};