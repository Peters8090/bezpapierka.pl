import React from 'react';
import {useCurrentPage} from '../../../../App';
import {insertIfArray, isEmpty} from '../../../../utility';
import {CrudDialogForm} from '../../DialogForm/CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from '../../DialogForm/Field/Field';
import {TextInputField} from '../../DialogForm/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const SectionAdmin = ({offer, section = {}}) => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...offer,
        sections: [
          ...offer.sections.filter(
              section2 => section2.id !== section.id),
          ...insertIfArray(!isEmpty(data), {
            ...section,
            ...data,
          }),
        ],
      },
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).pop().sections.slice(-1).
      pop();

  return (
      <CrudDialogForm createTitle='Dodaj sekcję' editTitle='Edytuj sekcję'
                      deleteMethod='patch'
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={section}>
        <FieldAutoDefaultValue apiName='title' label='Tytuł'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='contents' label='Zawartość'>
          <TextInputField maxLength={2000} multiline/>
        </FieldAutoDefaultValue>
      </CrudDialogForm>
  );
};

SectionAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  section: PropTypes.object,
};