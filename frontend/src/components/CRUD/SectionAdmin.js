import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../App';
import {OfferPage} from '../../pages/OfferPage/OfferPage';
import {insertIf, isEmpty} from '../../utility';
import {CrudDialogForm} from './DialogForm/CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from './DialogForm/Field/Field';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';

export const SectionAdmin = withRouter(({offer, section = {}, location}) => {
  const currentPage = useContext(PagesContext).pages.
      find(page => location.pathname.includes(page.link) && page.component ===
          OfferPage);

  console.log(offer);

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...offer,
        sections: [
          ...offer.sections.filter(
              section2 => section2.id !== section.id),
          ...insertIf(!isEmpty(data), {
            ...section,
            ...data,
          }),
        ],
      },
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).
      pop();

  return (
      <CrudDialogForm createTitle='Dodaj sekcję' editTitle='Edytuj sekcję'
                      useDeleteMethodOnApiEndpoint={false}
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
});

SectionAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  section: PropTypes.object,
};