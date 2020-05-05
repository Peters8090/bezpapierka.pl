import React, {useState} from 'react';
import {DialogForm} from './DialogForm/DialogForm';
import {Field} from './DialogForm/Field/Field';
import {ImageField} from './DialogForm/Field/Types/ImageField';
import {SelectField} from './DialogForm/Field/Types/SelectField';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';
import {emptyValues} from '../../utility';
import {myAxios} from '../../axios';
import PropTypes from 'prop-types';

export const PageCreateEditDialog = ({open, setOpen, isEdit}) => {
  const [selectedPage, setSelectedPage] = useState();
  const pageFieldApiName = 'NON_API page_type';

  const pages = {
    'Strona główna': {
      fields: (
          <React.Fragment>
            <Field label='Nagłówek' apiName='heading'>
              <TextInputField maxLength={50}/>
            </Field>
            <Field label='Podtytuł' apiName='subheading'>
              <TextInputField maxLength={100}/>
            </Field>
            <Field label='Tło' apiName='background_image' required={false}>
              <ImageField/>
            </Field>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/home_page',
    },
    'Z zawartością': {
      fields: (
          <React.Fragment>
            <Field label='Zawartość' apiName='contents'>
              <TextInputField maxLength={2000} multiline/>
            </Field>
            <Field label='Obraz' apiName='image' required={false}>
              <ImageField/>
            </Field>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/content_page',
    },
    'Oferta': {
      fields: (
          <React.Fragment/>
      ),
      exact: false,
      apiEndpoint: '/offer_page',
    },
    'Kontakt': {
      fields: (
          <React.Fragment>
            <Field label='Email'
                   apiName='contact_form_email'
                   required={false}
                   helpText='Zostanie użyty do formularza kontaktowego. Pozostaw puste, jeśli nie chcesz formularza kontaktowego.'>
              <TextInputField type='email'/>
            </Field>
          </React.Fragment>
      ),
      exact: true,
      apiEndpoint: '/contact_page',
    },
  };

  const onSubmit = async (fields) => {
    if (emptyValues.includes(fields[pageFieldApiName])) {
      fields[pageFieldApiName].setValidationErrors(['To pole jest wymagane']);
    } else {
      const formData = new FormData();
      Object.values(fields).forEach(field => {
        if (!(emptyValues.includes(field.value)))
          formData.append(field.apiName, field.value);
      });
      formData.append('exact', pages[selectedPage].exact);

      try {
        const sendRequest = isEdit ? myAxios.patch : myAxios.post;
        const response = await sendRequest(pages[selectedPage].apiEndpoint,
            formData);

        window.location.replace(response.data.link);
      } catch (error) {
        if (!emptyValues.includes(error) && typeof error.response.data ===
            'object') {
          Object.entries(error.response.data).forEach(([fieldName, errors]) => {
            const field = Object.values(fields).
                find(field => field.apiName === fieldName);

            field.setValidationErrors(errors);
          });
        }
      }
    }
  };

  return (
      <DialogForm title='Dodaj stronę'
                  onSubmit={onSubmit}
                  open={open}
                  setOpen={setOpen}>
        <Field label='Typ strony' apiName={pageFieldApiName}>
          <SelectField
              options={Object.keys(pages)}
              onChange={event => setSelectedPage(event.target.value)}/>
        </Field>
        <Field label='Tytuł' apiName='title'>
          <TextInputField maxLength={50}/>
        </Field>
        <Field label='Opis'
               apiName='description'
               helpText='Ważny tylko i wyłącznie dla SEO.'
               required={false}>
          <TextInputField maxLength={1000} multiline/>
        </Field>
        <Field label='Link'
               apiName='link'
               helpText="Dla strony głównej zostaw '/', a pozostałe strony rozpoczynaj od '/', na przykład '/kontakt'.">
          <TextInputField maxLength={50}/>
        </Field>
        <Field label='Ikona' apiName='icon'>
          <TextInputField maxLength={50}/>
        </Field>
        {selectedPage && pages[selectedPage].fields}
      </DialogForm>
  );
};

PageCreateEditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
};