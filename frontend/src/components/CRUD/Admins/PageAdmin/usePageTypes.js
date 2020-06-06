import React, {useContext} from 'react';

import {ContactPage} from '../../../../pages/CRUD editable/ContactPage/ContactPage';
import {ContentPage} from '../../../../pages/CRUD editable/ContentPage/ContentPage';
import {HomePage} from '../../../../pages/CRUD editable/HomePage/HomePage';
import {OfferPage} from '../../../../pages/CRUD editable/OfferPage/OfferPage';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {TranslationContext} from '../../../Translation/Translation';
import {CRUDField} from '../../CRUDField';

export const usePageTypes = () => {
  const _ = useContext(TranslationContext).gettextDjango;

  return [
    {
      name: _`Home page`,
      fields: (
          <React.Fragment>
            <CRUDField apiName='heading'>
              <TextInputField maxLength={50}/>
            </CRUDField>
            <CRUDField apiName='subheading'>
              <TextInputField maxLength={100}/>
            </CRUDField>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/home_page',
      component: HomePage,
    },
    {
      name: _`Content page`,
      fields: (
          <React.Fragment>
            <CRUDField apiName='contents'>
              <TextInputField maxLength={2000} multiline/>
            </CRUDField>
            <CRUDField apiName='image'
                       required={false}>
              <ImageField/>
            </CRUDField>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/content_page',
      component: ContentPage,
    },
    {
      name: _`Offer page`,
      fields: (
          <React.Fragment/>
      ),
      exact: false,
      apiEndpoint: '/offer_page',
      component: OfferPage,
    },
    {
      name: _`Contact page`,
      fields: (
          <React.Fragment>
            <CRUDField apiName='contact_form_email'
                       required={false}
                       helpText='Zostanie użyty do formularza kontaktowego. Pozostaw puste, jeśli nie chcesz formularza kontaktowego.'>
              <TextInputField type='email'/>
            </CRUDField>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/contact_page',
      component: ContactPage,
    },
  ];
};