import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {CheckboxField} from '../../../Form/Field/Types/CheckboxField';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {Field} from '../../../Form/Field/Field';
import {IconField} from '../../../Form/Field/Types/IconField/IconField';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {SelectField} from '../../../Form/Field/Types/SelectField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {isEmpty} from '../../../../utility';
import {TranslationContext} from '../../../Translation/Translation';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {CRUDField} from '../../CRUDField';
import {usePageTypes} from './usePageTypes';

export const PageAdmin = props => {
  const currentPage = useCurrentPage();
  const pageTypes = usePageTypes();

  const translationContext = useContext(TranslationContext);
  const _ = translationContext.gettextDjango;
  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    createTitle: gettext('Add a page'),
    editTitle: gettext('Edit page'),
    pageFieldLabel: gettext('Page type'),
  }

  const [selectedPage, setSelectedPage] = useState(
      props.isEdit ?
          pageTypes.findIndex(pageType => pageType.component === currentPage.component)
          : undefined
  );

  const PAGE_TYPE_FIELD_API_NAME = 'NON_API page_type';

  const getApiEndpoint = () => {
    if(!isEmpty(selectedPage)) {
      if(props.isEdit) {
        return `${pageTypes[selectedPage].apiEndpoint}/${currentPage.id}`;
      } else {
        return pageTypes[selectedPage].apiEndpoint;
      }
    } else {
      return '';
    }
  };

  const checkBeforeSubmit = fields => {
    if (isEmpty(fields[PAGE_TYPE_FIELD_API_NAME].value)) {
      fields[PAGE_TYPE_FIELD_API_NAME].setValidationErrors(
          [_`This field may not be blank.`]);
      return false;
    }
    return true;
  };

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CRUDDialogForm createTitle={translations.createTitle} editTitle={translations.editTitle}
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
        <Field label={translations.pageFieldLabel}
               apiName={PAGE_TYPE_FIELD_API_NAME}
               defaultValue={props.isEdit && pageTypes[selectedPage].apiEndpoint}
               onChange={value => !isEmpty(value) && setSelectedPage(
                   pageTypes.findIndex(({apiEndpoint}) => apiEndpoint === value))}
               disabled={props.isEdit}>
          <SelectField
              options={pageTypes.map(
                  pageType => [pageType.apiEndpoint, pageType.name])}/>
        </Field>
        <CRUDField apiName='title'>
          <TextInputField maxLength={30}/>
        </CRUDField>
        <CRUDField
            apiName='description'
            helpText={_`Valid only for SEO.`}
            required={false}>
          <TextInputField maxLength={1000} multiline/>
        </CRUDField>
        <CRUDField apiName='background_image'
                   required={false}>
          <ImageField/>
        </CRUDField>
        <CRUDField apiName='background_size'
                   required={false} defaultValue='cover'>
          <SelectField options={[
            ['auto', _`Auto`],
            ['cover', _`Cover`],
            ['contain', _`Contain`]]}/>
        </CRUDField>
        <CRUDField apiName='published'>
          <CheckboxField/>
        </CRUDField>
        <CRUDField apiName='link'
                   helpText={_`Leave '/' for the homepage, for the other pages start it with '/', for example '/contact'.`}>
          <TextInputField maxLength={50}/>
        </CRUDField>
        <CRUDField apiName='icon'>
          <IconField/>
        </CRUDField>
        {!isEmpty(selectedPage) && pageTypes[selectedPage].fields}
      </CRUDDialogForm>
  );
};

PageAdmin.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};