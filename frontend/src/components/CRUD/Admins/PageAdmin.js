import React, {useContext, useState} from 'react';
import {ContactPage} from '../../../pages/CRUD editable/ContactPage/ContactPage';
import {ContentPage} from '../../../pages/CRUD editable/ContentPage/ContentPage';
import {HomePage} from '../../../pages/CRUD editable/HomePage/HomePage';
import {OfferPage} from '../../../pages/CRUD editable/OfferPage/OfferPage';
import {CheckboxField} from '../../Form/Field/Types/CheckboxField';
import {PagesContext, useCurrentPage} from '../../Pages/Pages';
import {CrudDialogForm} from '../CrudDialogForm';
import {Field} from '../../Form/Field/Field';
import {FieldAutoDefaultValue} from '../../Form/Field/Field';
import {IconField} from '../../Form/Field/Types/IconField/IconField';
import {ImageField} from '../../Form/Field/Types/ImageField';
import {SelectField} from '../../Form/Field/Types/SelectField';
import {TextInputField} from '../../Form/Field/Types/TextInputField';
import {isEmpty} from '../../../utility';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const PageAdmin = ({isEdit, open, setOpen}) => {
  const currentPage = useCurrentPage();

  const pageTypes = {
    'Strona główna': {
      fields: (
          <React.Fragment>
            <FieldAutoDefaultValue label='Nagłówek' apiName='heading'>
              <TextInputField maxLength={50}/>
            </FieldAutoDefaultValue>
            <FieldAutoDefaultValue label='Podtytuł' apiName='subheading'>
              <TextInputField maxLength={100}/>
            </FieldAutoDefaultValue>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/home_page',
      component: HomePage,
    },
    'Z zawartością': {
      fields: (
          <React.Fragment>
            <FieldAutoDefaultValue label='Zawartość' apiName='contents'>
              <TextInputField maxLength={2000} multiline/>
            </FieldAutoDefaultValue>
            <FieldAutoDefaultValue label='Obraz' apiName='image'
                                   required={false}>
              <ImageField/>
            </FieldAutoDefaultValue>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/content_page',
      component: ContentPage,
    },
    'Oferta': {
      fields: (
          <React.Fragment/>
      ),
      exact: false,
      apiEndpoint: '/offer_page',
      component: OfferPage,
    },
    'Kontakt': {
      fields: (
          <React.Fragment>
            <FieldAutoDefaultValue label='Email'
                                   apiName='contact_form_email'
                                   required={false}
                                   helpText='Zostanie użyty do formularza kontaktowego. Pozostaw puste, jeśli nie chcesz formularza kontaktowego.'>
              <TextInputField type='email'/>
            </FieldAutoDefaultValue>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/contact_page',
      component: ContactPage,
    },
  };
  const findPageTypeByComponent = component => Object.keys(pageTypes).
      find(
          key => pageTypes[key] === Object.values(pageTypes).
              find(page => page.component ===
                  component));

  const [selectedPage, setSelectedPage] = useState(
      isEdit ?
          findPageTypeByComponent(currentPage.component)
          : undefined,
  );
  const pageFieldApiName = 'NON_API page_type';

  const getApiEndpoint = () => selectedPage ? pageTypes[selectedPage].apiEndpoint +
      (isEdit ? `/${currentPage.id}` : '') : '';

  const checkBeforeSubmit = fields => {
    if (isEmpty(fields[pageFieldApiName].value)) {
      fields[pageFieldApiName].setValidationErrors(
          ['To pole jest wymagane']);
      return false;
    }
    return true;
  };

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CrudDialogForm createTitle='Dodaj stronę' editTitle='Edytuj stronę'
                      getRequestBodyStructure={data => ({
                        ...data,
                        exact: pageTypes[selectedPage].exact,
                      })}
                      open={open}
                      setOpen={setOpen}
                      deleteMethod={pagesAxios.delete}
                      editValuesRoot={isEdit ? currentPage : {}}
                      checkBeforeSubmit={checkBeforeSubmit}
                      getApiEndpoint={getApiEndpoint}>
        <Field label='Typ strony'
               apiName={pageFieldApiName}
               defaultValue={isEdit && findPageTypeByComponent(
                   currentPage.component)}
               disabled={isEdit}>
          <SelectField
              options={Object.keys(pageTypes).
                  map(option => [option, option])}
              onChange={event => setSelectedPage(event.target.value)}/>
        </Field>
        <FieldAutoDefaultValue label='Tytuł' apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Opis'
                               apiName='description'
                               helpText='Ważny tylko i wyłącznie dla SEO.'
                               required={false}>
          <TextInputField maxLength={1000} multiline/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Opublikowana' apiName='published'>
          <CheckboxField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Link'
                               apiName='link'
                               helpText="Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt'.">
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Ikona' apiName='icon'>
          <IconField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Tło' apiName='background_image'
                               required={false}>
          <ImageField/>
        </FieldAutoDefaultValue>
        {selectedPage && pageTypes[selectedPage].fields}
      </CrudDialogForm>
  );
};

PageAdmin.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};