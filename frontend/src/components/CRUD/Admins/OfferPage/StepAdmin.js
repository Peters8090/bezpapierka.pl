import React, {useContext} from 'react';
import {AuthContext, useCurrentPage} from '../../../../App';
import {insertIfArray, isEmpty} from '../../../../utility';
import {CrudDialogForm} from '../../CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const StepAdmin = ({open, setOpen, offer, step = {}}) => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...offer,
        steps: [
          ...offer.steps.filter(
              step2 => step2.id !== step.id),
          ...insertIfArray(!isEmpty(data), {
            ...step,
            ...data,
          }),
        ],
      },
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).pop().steps.slice(-1).
      pop();

  const myAxios = useContext(AuthContext).axios;

  return (
      <CrudDialogForm createTitle='Dodaj etap' editTitle='Edytuj etap'
                      open={open}
                      setOpen={setOpen}
                      deleteMethod={myAxios.patch}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={step}>
        <FieldAutoDefaultValue apiName='title' label='Tytuł'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='description' label='Opis'>
          <TextInputField maxLength={500} multiline/>
        </FieldAutoDefaultValue>
      </CrudDialogForm>
  );
};

StepAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  step: PropTypes.object,
};