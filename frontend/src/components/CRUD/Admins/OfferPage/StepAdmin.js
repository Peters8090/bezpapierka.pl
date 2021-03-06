import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import {insertIfArray, isEmpty} from '../../../../utility';
import {PagesContext, useCurrentPage} from '../../../Pages/Pages';
import {TranslationContext} from '../../../Translation/Translation';
import {CRUDDialogForm} from '../../CRUDDialogForm';
import {TextInputField} from '../../../Form/Field/Types/TextInputField';
import {CRUDField} from '../../CRUDField';

export const StepAdmin = props => {
  const currentPage = useCurrentPage();

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    createTitle: gettext('Add a step'),
    editTitle: gettext('Edit step'),
  }

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
      <CRUDDialogForm createTitle={translations.createTitle} editTitle={translations.editTitle}
                      open={props.open}
                      onClose={props.onClose}
                      deleteMethod={pagesAxios.patch}
                      getRequestBodyStructure={getRequestBodyStructure}
                      getApiEndpoint={getApiEndpoint}
                      getErrorRoot={getErrorRoot} editValuesRoot={props.step}>
        <CRUDField apiName='title'>
          <TextInputField maxLength={30}/>
        </CRUDField>
        <CRUDField apiName='description'>
          <TextInputField maxLength={500} multiline/>
        </CRUDField>
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