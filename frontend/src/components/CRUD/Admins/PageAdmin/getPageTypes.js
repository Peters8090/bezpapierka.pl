import React from 'react';

import {ContactPage} from '../../../../pages/CRUD editable/ContactPage/ContactPage';
import {ContentPage} from '../../../../pages/CRUD editable/ContentPage/ContentPage';
import {HomePage} from '../../../../pages/CRUD editable/HomePage/HomePage';
import {OfferPage} from '../../../../pages/CRUD editable/OfferPage/OfferPage';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';

export default () => ({
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
});