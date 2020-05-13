import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {PagesContext} from '../../../../App';
import {OfferPage} from '../../../../pages/OfferPage/OfferPage';
import {insertIf, isEmpty} from '../../../../utility';
import {CrudDialogForm} from '../../DialogForm/CrudDialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValue} from '../../DialogForm/Field/Field';
import {TextInputField} from '../../DialogForm/Field/Types/TextInputField';

export const StepAdmin = withRouter(({offer, step = {}, location}) => {
  const currentPage = useContext(PagesContext).pages.
      find(page => location.pathname.includes(page.link) && page.component ===
          OfferPage);

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...offer,
        steps: [
          ...offer.steps.filter(
              step2 => step2.id !== step.id),
          ...insertIf(!isEmpty(data), {
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

  return (
      <CrudDialogForm createTitle='Dodaj etap' editTitle='Edytuj etap'
                      deleteMethod='patch'
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
});

StepAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  step: PropTypes.object,
};