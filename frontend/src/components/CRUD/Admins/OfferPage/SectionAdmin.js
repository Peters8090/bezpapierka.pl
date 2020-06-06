import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {TranslationContext} from '../../../Translation/Translation';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {CRUDField} from '../../CRUDField';

export const SectionAdmin = props => {
  const currentPage = useCurrentPage();

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    createTitle: gettext('Add a section'),
    editTitle: gettext('Edit section'),
  };

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

  const getErrorRoot = error => error.response.data.offers.slice(-1).
      pop().
      sections.
      slice(-1).
      pop();

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CRUDDialogForm createTitle={translations.createTitle} editTitle={translations.editTitle}
                      open={props.open}
                      onClose={props.onClose}
                      deleteMethod={pagesAxios.patch}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot}
                      editValuesRoot={props.section}>
        <CRUDField apiName='title'>
          <TextInputField maxLength={50}/>
        </CRUDField>
        <CRUDField apiName='contents'>
          <TextInputField maxLength={2000} multiline/>
        </CRUDField>
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
};