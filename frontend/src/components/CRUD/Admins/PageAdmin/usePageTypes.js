import React, {useContext} from 'react';

import {ContactPage} from '../../../../pages/CRUD editable/ContactPage/ContactPage';
import {ContentPage} from '../../../../pages/CRUD editable/ContentPage/ContentPage';
import {HomePage} from '../../../../pages/CRUD editable/HomePage/HomePage';
import {OfferPage} from '../../../../pages/CRUD editable/OfferPage/OfferPage';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {TranslationContext} from '../../../Translation/Translation';

export const usePageTypes = () => {
  const _ = useContext(TranslationContext).gettextDjango;

  return [
    {
      name: _`Home page`,
      fields: (
          <React.Fragment>
            <FieldAutoDefaultValue label={_`Heading`} apiName='heading'>
              <TextInputField maxLength={50}/>
            </FieldAutoDefaultValue>
            <FieldAutoDefaultValue label={_`Subheading`} apiName='subheading'>
              <TextInputField maxLength={100}/>
            </FieldAutoDefaultValue>
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
            <FieldAutoDefaultValue label={_`Contents`} apiName='contents'>
              <TextInputField maxLength={2000} multiline/>
            </FieldAutoDefaultValue>
            <FieldAutoDefaultValue label={_`Image`} apiName='image'
                                   required={false}>
              <ImageField/>
            </FieldAutoDefaultValue>
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
            <FieldAutoDefaultValue label={_`Contact form email`}
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
  ];
};