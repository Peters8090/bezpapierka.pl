import React, {useContext} from 'react';
import {AuthContext, useCurrentPage} from '../../../../App';
import {insertIfArray, isEmpty} from '../../../../utility';
import {CrudDialogForm} from '../../CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const SectionAdmin = ({open, setOpen, offer, section = {}}) => {
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

  const myAxios = useContext(AuthContext).axios;

  return (
      <CrudDialogForm createTitle='Dodaj sekcję' editTitle='Edytuj sekcję'
                      open={open}
                      setOpen={setOpen}
                      deleteMethod={myAxios.patch}
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