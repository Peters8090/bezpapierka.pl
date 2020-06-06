import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import {CheckboxField} from '../../../Form/Field/Types/CheckboxField';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {Field} from '../../../Form/Field/Field';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {IconField} from '../../../Form/Field/Types/IconField/IconField';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {SelectField} from '../../../Form/Field/Types/SelectField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {isEmpty} from '../../../../utility';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {usePageTypes} from './usePageTypes';

export const PageAdmin = props => {
  const currentPage = useCurrentPage();

  const pageTypes = usePageTypes();
  
  const findPageTypeByComponent = component => Object.keys(pageTypes).
      find(
          key => pageTypes[key] === Object.values(pageTypes).
              find(page => page.component ===
                  component));

  const [selectedPage, setSelectedPage] = useState(
      props.isEdit ?
          findPageTypeByComponent(currentPage.component)
          : undefined,
  );
  const pageFieldApiName = 'NON_API page_type';

  const getApiEndpoint = () => selectedPage
      ? pageTypes[selectedPage].apiEndpoint +
      (props.isEdit ? `/${currentPage.id}` : '')
      : '';

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
      <CRUDDialogForm createTitle='Dodaj stronę' editTitle='Edytuj stronę'
                      getRequestBodyStructure={data => ({
                        ...data,
                        exact: pageTypes[selectedPage].exact,
                      })}
                      open={props.open}
                      onClose={props.onClose}
                      deleteMethod={pagesAxios.delete}
                      editValuesRoot={props.isEdit ? currentPage : {}}
                      checkBeforeSubmit={checkBeforeSubmit}
                      getApiEndpoint={getApiEndpoint}>
        <Field label='Typ strony'
               apiName={pageFieldApiName}
               defaultValue={props.isEdit && findPageTypeByComponent(
                   currentPage.component)}
               onChange={value => setSelectedPage(value)}
               disabled={props.isEdit}>
          <SelectField
              options={Object.keys(pageTypes).
                  map(option => [option, option])}/>
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
        <FieldAutoDefaultValue label='Tło' apiName='background_image'
                               required={false}>
          <ImageField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='background_size' label='Rozmiar tła' required={false} defaultValue='cover'>
          <SelectField options={[
            ['auto', 'Auto'],
            ['cover', 'Pokrywaj'],
            ['contain', 'Zawieraj']]}/>
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
        {selectedPage && pageTypes[selectedPage].fields}
      </CRUDDialogForm>
  );
};

PageAdmin.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};