import React, {useContext, useState} from 'react';
import {AuthContext, useCurrentPage} from '../../../App';
import {ContactPage} from '../../../pages/ContactPage/ContactPage';
import {ContentPage} from '../../../pages/ContentPage/ContentPage';
import {HomePage} from '../../../pages/HomePage/HomePage';
import {OfferPage} from '../../../pages/OfferPage/OfferPage';
import {CrudDialogForm} from '../CrudDialogForm';
import {Field} from '../../Miscellaneous/Form/Field/Field';
import {FieldAutoDefaultValue} from '../../Miscellaneous/Form/Field/Field';
import {IconField} from '../../Miscellaneous/Form/Field/Types/IconField/IconField';
import {ImageField} from '../../Miscellaneous/Form/Field/Types/ImageField';
import {SelectField} from '../../Miscellaneous/Form/Field/Types/SelectField';
import {TextInputField} from '../../Miscellaneous/Form/Field/Types/TextInputField';
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
            <FieldAutoDefaultValue label='Tło' apiName='background_image'
                                   required={false}>
              <ImageField/>
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

  const myAxios = useContext(AuthContext).axios;

  return (
      <CrudDialogForm createTitle='Dodaj stronę' editTitle='Edytuj stronę'
                      getRequestBodyStructure={data => ({
                        ...data,
                        exact: pageTypes[selectedPage].exact,
                      })}
                      open={open}
                      setOpen={setOpen}
                      deleteMethod={myAxios.delete}
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
        <FieldAutoDefaultValue label='Link'
                               apiName='link'
                               helpText="Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt'.">
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue label='Ikona' apiName='icon'>
          <IconField/>
        </FieldAutoDefaultValue>
        {selectedPage && pageTypes[selectedPage].fields}
      </CrudDialogForm>
  );
};

PageAdmin.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};