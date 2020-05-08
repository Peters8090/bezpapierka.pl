import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../App';
import {emptyValues} from '../../utility';
import {CrudDialogForm} from './DialogForm/CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from './DialogForm/Field/Field';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';

export const BasicInfoAdmin = withRouter(
    ({basic_info, location}) => {
      const currentPage = useContext(PagesContext).
          find(page => page.link === location.pathname);

      const getRequestBodyStructure = data => ({
        basic_infos: emptyValues.includes(data) ?
            [
              ...currentPage.basic_infos.filter(
                  basic_info2 => basic_info2.id !== basic_info.id),
            ] :
            [
              ...currentPage.basic_infos,
              {
                ...data,
                ...(basic_info && {id: basic_info.id}),
              },
            ],
      });

      const getApiEndpoint = () => `/contact_page/${currentPage.id}`;

      const getErrorRoot = error => error.response.data.basic_infos.slice(-1).
          pop();

      return (
          <CrudDialogForm
              getApiEndpoint={getApiEndpoint}
              getRequestBodyStructure={getRequestBodyStructure}
              getErrorRoot={getErrorRoot}
              useDeleteMethodOnApiEndpoint={false}
              createTitle='Dodaj informację'
              editTitle='Edytuj informację'
              editValuesRoot={basic_info}>
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

BasicInfoAdmin.propTypes = {
  basic_info: PropTypes.object,
};