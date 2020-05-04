import React, {useState} from 'react';
import {DialogForm} from './DialogForm/DialogForm';
import {Field} from './DialogForm/Field/Field';
import {SelectField} from './DialogForm/Field/Types/SelectField';
import {TextInputField} from './DialogForm/Field/Types/TextInputField';

export const PageCreateEditDialog = ({open, setOpen}) => {
  const onSubmit = (fields, setLoading) => {
    setLoading(true);
  };

  const pages = {
    'Strona główna': (
        <React.Fragment>
          Strona główna
        </React.Fragment>
    ),
    'Z zawartością': (
        <React.Fragment>
          Z zawartością
        </React.Fragment>
    ),
    'Oferta': (
        <React.Fragment>
          Oferta
        </React.Fragment>
    ),
    'Kontakt': (
        <React.Fragment>
          Kontakt
        </React.Fragment>
    ),
  };

  const [selectedPage, setSelectedPage] = useState();

  return (
      <DialogForm title='Dodaj stronę'
                  onSubmit={onSubmit}
                  open={open}
                  setOpen={setOpen}>
        <Field label='Typ strony' apiName='page type (non-api)'>
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
        {pages[selectedPage]}
      </DialogForm>
  );
};