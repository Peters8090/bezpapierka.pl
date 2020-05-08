import React from 'react';
import {myAxios} from '../../../axios';
import {emptyValues} from '../../../utility';
import {DialogForm} from '../DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from './Field/FieldAutoDefaultValue';

export const CrudDialogForm = ({
  editValuesRoot,

  checkBeforeSubmit = () => true,
  getRequestBodyStructure, getApiEndpoint,
  getErrorRoot,

  createTitle, editTitle,

  children,
}) => {
  const isEdit = !emptyValues.includes(editValuesRoot);

  const onSubmit = async fields => {
    if (!checkBeforeSubmit(fields)) return;

    let data = {};
    Object.values(fields).forEach(field => {
      if (!(emptyValues.includes(field.value)))
        data[field.apiName] = field.value;
    });

    try {
      const sendRequest = isNaN(getApiEndpoint(fields).slice(-1))
          ? myAxios.post
          : myAxios.patch;
      const response = await sendRequest(getApiEndpoint(fields),
          getRequestBodyStructure(data));

      window.location.replace(response.data.link);
    } catch (error) {
      if (!emptyValues.includes(error) && typeof error.response.data ===
          'object') {
        Object.entries(getErrorRoot(error)).
            forEach(([fieldName, errors]) => {
              const field = Object.values(fields).
                  find(field => field.apiName === fieldName);

              field.setValidationErrors(errors);
            });
      }
    }
  };

  return (
      <DialogForm onSubmit={onSubmit}
                  title={isEdit ? editTitle : createTitle}>
        <FieldAutoDefaultValueContext.Provider
            value={{provideDefaultValue: isEdit, root: editValuesRoot}}>
          {children}
        </FieldAutoDefaultValueContext.Provider>
      </DialogForm>
  );
};

CrudDialogForm.propTypes = {
  editValuesRoot: PropTypes.object.isRequired,

  checkBeforeSubmit: PropTypes.func,
  getRequestBodyStructure: PropTypes.func.isRequired,
  getApiEndpoint: PropTypes.func.isRequired,
  getErrorRoot: PropTypes.func.isRequired,

  createTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,

  children: PropTypes.node.isRequired,
};