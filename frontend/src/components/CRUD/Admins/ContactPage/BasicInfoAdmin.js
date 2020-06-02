import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {IconField} from '../../../Form/Field/Types/IconField/IconField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';

export const BasicInfoAdmin = props => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    basic_infos: [
      ...currentPage.basic_infos.filter(
          basic_info2 => basic_info2.id !== props.basic_info.id),
      ...insertIfArray(!isEmpty(data), {
        ...data,
        ...(props.basic_info && {id: props.basic_info.id}),
      }),
    ],
  });

  const getApiEndpoint = () => `/contact_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.basic_infos.slice(-1).
      pop();

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CRUDDialogForm
          getApiEndpoint={getApiEndpoint}
          open={props.open}
          onClose={props.onClose}
          getRequestBodyStructure={getRequestBodyStructure}
          getErrorRoot={getErrorRoot}
          deleteMethod={pagesAxios.patch}
          createTitle='Dodaj informację'
          editTitle='Edytuj informację'
          editValuesRoot={props.basic_info}>
        <FieldAutoDefaultValue label='Tytuł' apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Ikona' apiName='icon'>
          <IconField/>
        </FieldAutoDefaultValue>
      </CRUDDialogForm>
  );
};

BasicInfoAdmin.propTypes = {
  basic_info: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

BasicInfoAdmin.defaultProps = {
  basic_info: {},
}