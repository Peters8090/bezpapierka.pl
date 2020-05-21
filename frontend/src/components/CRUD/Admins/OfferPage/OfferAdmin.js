import React, {useContext} from 'react';
import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {CrudDialogForm} from '../../CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {ImageField} from '../../../Form/Field/Types/ImageField';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const OfferAdmin = ({open, setOpen, offer = {}}) => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers.filter(offer2 => offer2.id !== offer.id),
      ...insertIfArray(!isEmpty(data), {
        ...offer,
        ...data,
      }),
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).
      pop();

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CrudDialogForm createTitle='Dodaj ofertę' editTitle='Edytuj ofertę'
                      deleteMethod={pagesAxios.patch}
                      open={open}
                      setOpen={setOpen}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={offer}>
        <FieldAutoDefaultValue apiName='title' label='Tytuł'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='slug' label='Slug'>
          <TextInputField/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='superscription' label='Nadtytuł'
                               required={false}>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='description' label='Opis'>
          <TextInputField maxLength={200} multiline/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='image' label='Miniaturka'>
          <ImageField/>
        </FieldAutoDefaultValue>
      </CrudDialogForm>
  );
};

OfferAdmin.propTypes = {
  offer: PropTypes.object,
};