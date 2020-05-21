import React, {useContext} from 'react';
import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {CrudDialogForm} from '../../CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {IconField} from '../../../Form/Field/Types/IconField/IconField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const BasicInfoAdmin = ({open, setOpen, basic_info = {}}) => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    basic_infos: [
      ...currentPage.basic_infos.filter(
          basic_info2 => basic_info2.id !== basic_info.id),
      ...insertIfArray(!isEmpty(data), {
        ...data,
        ...(basic_info && {id: basic_info.id}),
      }),
    ],
  });

  const getApiEndpoint = () => `/contact_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.basic_infos.slice(-1).
      pop();

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CrudDialogForm
          getApiEndpoint={getApiEndpoint}
          open={open}
          setOpen={setOpen}
          getRequestBodyStructure={getRequestBodyStructure}
          getErrorRoot={getErrorRoot}
          deleteMethod={pagesAxios.patch}
          createTitle='Dodaj informację'
          editTitle='Edytuj informację'
          editValuesRoot={basic_info}>
        <FieldAutoDefaultValue label='Tytuł' apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Ikona' apiName='icon'>
          <IconField/>
        </FieldAutoDefaultValue>
      </CrudDialogForm>
  );
};

BasicInfoAdmin.propTypes = {
  basic_info: PropTypes.object,
};