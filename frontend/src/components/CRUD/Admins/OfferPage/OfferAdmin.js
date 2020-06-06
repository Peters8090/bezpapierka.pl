import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';

export const OfferAdmin = props => {
  const currentPage = useCurrentPage();

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

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CRUDDialogForm createTitle='Dodaj ofertę' editTitle='Edytuj ofertę'
                      deleteMethod={pagesAxios.patch}
                      open={props.open}
                      onClose={props.onClose}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={props.offer}>
        <FieldAutoDefaultValue apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='slug'>
          <TextInputField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='superscription'
                               required={false}>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='description'>
          <TextInputField maxLength={200} multiline/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='image'>
          <ImageField/>
        </FieldAutoDefaultValue>
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
}