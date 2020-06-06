import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {TranslationContext} from '../../../Translation/Translation';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {CRUDField} from '../../CRUDField';

export const OfferAdmin = props => {
  const currentPage = useCurrentPage();
  const pagesAxios = useContext(PagesContext).axios;

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    createTitle: gettext('Add an offer'),
    editTitle: gettext('Edit offer'),
  };

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers.filter(offer2 => offer2.id !== props.offer.id),
      ...insertIfArray(!isEmpty(data), {
        ...props.offer,
        ...data,
      }),
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).
      pop();

  return (
      <CRUDDialogForm createTitle={translations.createTitle}
                      editTitle={translations.editTitle}
                      deleteMethod={pagesAxios.patch}
                      open={props.open}
                      onClose={props.onClose}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={props.offer}>
        <CRUDField apiName='title'>
          <TextInputField maxLength={30}/>
        </CRUDField>
        <CRUDField apiName='slug'>
          <TextInputField/>
        </CRUDField>
        <CRUDField apiName='superscription'
                   required={false}>
          <TextInputField maxLength={50}/>
        </CRUDField>
        <CRUDField apiName='description'>
          <TextInputField maxLength={200} multiline/>
        </CRUDField>
        <CRUDField apiName='image'>
          <ImageField/>
        </CRUDField>
      </CRUDDialogForm>
  );
};

OfferAdmin.propTypes = {
  offer: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

OfferAdmin.defaultProps = {
  offer: {},
};