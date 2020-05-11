import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../App';
import {CrudDialogForm} from './DialogForm/CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from './DialogForm/Field/Field';
import {ImageField} from './DialogForm/Field/Types/ImageField';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';

export const SectionAdmin = withRouter(({offer, section = {}, location}) => {
  const currentPage = useContext(PagesContext).pages.
      find(page => page.link === location.pathname);

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...offer,
        sections: [
          ...currentPage.offers.sections.filter(
              section2 => section2.id !== section.id),
          {
            ...section,
            ...data,
          },
        ],
      },
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).
      pop();

  return (
      <CrudDialogForm createTitle='Dodaj ofertę' editTitle='Edytuj ofertę'
                      useDeleteMethodOnApiEndpoint={false}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={offer}>
        <FieldAutoDefaultValue apiName='title' label='Tytuł'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='slug' label='Slug'>
          <TextInputField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='superscription' label='Nadtytuł'
                               required={false}>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='description' label='Opis'>
          <TextInputField maxLength={200} multiline/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='image' label='Miniaturka'>
          <ImageField/>
        </FieldAutoDefaultValue>
      </CrudDialogForm>
  );
});

SectionAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  section: PropTypes.object,
};