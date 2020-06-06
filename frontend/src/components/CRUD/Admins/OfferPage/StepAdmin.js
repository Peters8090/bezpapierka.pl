import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {FieldAutoDefaultValue} from '../../../Form/Field/Field';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';

export const StepAdmin = props => {
  const currentPage = useCurrentPage();

  const getRequestBodyStructure = data => ({
    offers: [
      ...currentPage.offers,
      {
        ...props.offer,
        steps: [
          ...props.offer.steps.filter(
              step2 => step2.id !== props.step.id),
          ...insertIfArray(!isEmpty(data), {
            ...props.step,
            ...data,
          }),
        ],
      },
    ],
  });

  const getApiEndpoint = () => `/offer_page/${currentPage.id}`;

  const getErrorRoot = error => error.response.data.offers.slice(-1).pop().steps.slice(-1).
      pop();

  const pagesAxios = useContext(PagesContext).axios;

  return (
      <CRUDDialogForm createTitle='Dodaj etap' editTitle='Edytuj etap'
                      open={props.open}
                      onClose={props.onClose}
                      deleteMethod={pagesAxios.patch}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={props.step}>
        <FieldAutoDefaultValue apiName='title'>
          <TextInputField maxLength={50}/>
        </FieldAutoDefaultValue>
        <FieldAutoDefaultValue apiName='description'>
          <TextInputField maxLength={500} multiline/>
        </FieldAutoDefaultValue>
      </CRUDDialogForm>
  );
};

StepAdmin.propTypes = {
  offer: PropTypes.object.isRequired,
  step: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

StepAdmin.defaultProps = {
  step: {},
}