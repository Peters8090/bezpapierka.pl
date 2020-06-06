import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {CRUDDialogForm} from '../../CRUDDialogForm';

export const SectionAdmin = props => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...props.offer,
        sections: [
          ...props.offer.sections.filter(
              section2 => section2.id !== props.section.id),
          ...insertIfArray(!isEmpty(data), {
            ...props.section,
            ...data,
          }),
        ],
      },
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).pop().sections.slice(-1).
      pop();

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CRUDDialogForm createTitle='Dodaj sekcję' editTitle='Edytuj sekcję'
                      open={props.open}
                      onClose={props.onClose}
                      deleteMethod={pagesAxios.patch}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={props.section}>
        <FieldAutoDefaultValue apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='contents'>
          <TextInputField maxLength={2000} multiline/>
        </FieldAutoDefaultValue>
      </CRUDDialogForm>
  );
};

SectionAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  section: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

SectionAdmin.defaultProps = {
  section: {},
}