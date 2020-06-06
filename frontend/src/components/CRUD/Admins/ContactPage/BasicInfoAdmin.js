import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {TranslationContext} from '../../../Translation/Translation';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {IconField} from '../../../Form/Field/Types/IconField/IconField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {CRUDField} from '../../CRUDField';

export const BasicInfoAdmin = props => {
  const currentPage = useCurrentPage();
  const pagesAxios = useContext(PagesContext).axios;

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    createTitle: gettext('Add a basic information'),
    editTitle: gettext('Edit basic information'),
  }

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


  return (
      <CRUDDialogForm
          getApiEndpoint={getApiEndpoint}
          open={props.open}
          onClose={props.onClose}
          getRequestBodyStructure={getRequestBodyStructure}
          getErrorRoot={getErrorRoot}
          deleteMethod={pagesAxios.patch}
          createTitle={translations.createTitle}
          editTitle={translations.editTitle}
          editValuesRoot={props.basic_info}>
        <CRUDField apiName='title'>
          <TextInputField maxLength={50}/>
        </CRUDField>
        <CRUDField apiName='icon'>
          <IconField/>
        </CRUDField>
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