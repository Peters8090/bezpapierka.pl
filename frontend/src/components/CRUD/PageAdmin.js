import React, {useContext, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../App';
import {ContactPage} from '../../pages/ContactPage/ContactPage';
import {ContentPage} from '../../pages/ContentPage/ContentPage';
import {HomePage} from '../../pages/HomePage/HomePage';
import {OfferPage} from '../../pages/OfferPage/OfferPage';
import {CrudDialogForm} from './DialogForm/CrudDialogForm';
import {Field} from './DialogForm/Field/Field';
import {FieldAutoDefaultValue} from './DialogForm/Field/Field';
import {ImageField} from './DialogForm/Field/Types/ImageField';
import {SelectField} from './DialogForm/Field/Types/SelectField';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';
import {emptyValues} from '../../utility';
import PropTypes from 'prop-types';

export const PageAdmin = withRouter(
    ({isEdit, location}) => {
      const currentPage = useContext(PagesContext).pages.
          find(page => page.link === location.pathname);

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

      const getApiEndpoint = () => pageTypes[selectedPage].apiEndpoint +
          (isEdit ? `/${currentPage.id}` : '');

      const checkBeforeSubmit = fields => {
        if (emptyValues.includes(
            fields[pageFieldApiName].value)) {
          fields[pageFieldApiName].setValidationErrors(
              ['To pole jest wymagane']);
          return false;
        }
        return true;
      };

      return (
          <CrudDialogForm createTitle='Dodaj stronę' editTitle='Edytuj stronę'
                          getRequestBodyStructure={data => ({
                            ...data,
                            exact: pageTypes[selectedPage].exact,
                          })}
                          useDeleteMethodOnApiEndpoint={true}
                          editValuesRoot={isEdit ? currentPage : undefined}
                          getErrorRoot={error => error.response.data}
                          checkBeforeSubmit={checkBeforeSubmit}
                          getApiEndpoint={getApiEndpoint}
                          isEdit={isEdit}>
            <Field label='Typ strony'
                   apiName={pageFieldApiName}
                   defaultValue={isEdit && findPageTypeByComponent(
                       currentPage.component)}
                   disabled={isEdit}>
              <SelectField
                  options={Object.keys(pageTypes)}
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
            <FieldAutoDefaultValue label='Ikona' apiName='icon'
                                   helpText="Wpisz nazwę ikony z https://material.io/resources/icons. Na przykład 'accessibility'.">
              <TextInputField maxLength={50}/>
            </FieldAutoDefaultValue>
            {selectedPage && pageTypes[selectedPage].fields}
          </CrudDialogForm>
      );
    });

PageAdmin.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};