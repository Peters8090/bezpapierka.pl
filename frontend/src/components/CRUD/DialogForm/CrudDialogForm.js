import React from 'react';
import {myAxios} from '../../../axios';
import {emptyValues} from '../../../utility';
import {DialogForm} from '../DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from './Field/FieldAutoDefaultValue';

export const CrudDialogForm = ({
  isEdit, editValuesRoot,

  checkBeforeSubmit = () => true, useFormData = false,
  getRequestBodyStructure, getApiEndpoint,
  getErrorRoot, useResponseDataLink = false,

  createTitle, editTitle,

  children,
}) => {
  const onSubmit = async fields => {
    if (!checkBeforeSubmit(fields)) return;

    let data;
    if (useFormData) {
      data = new FormData();
      Object.values(fields).forEach(field => {
        if (!(emptyValues.includes(field.value)))
          data.append(field.apiName, field.value);
      });
    } else {
      data = {};
      Object.values(fields).forEach(field => {
        if (!(emptyValues.includes(field.value)))
          data[field.apiName] = field.value;
      });
    }

    try {
      const sendRequest = isNaN(getApiEndpoint(fields).slice(-1))
          ? myAxios.post
          : myAxios.patch;
      const response = await sendRequest(getApiEndpoint(fields),
          getRequestBodyStructure(data));

      if (useResponseDataLink)
        window.location.replace(response.data.link);
      else
        window.location.reload();
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
  isEdit: PropTypes.bool.isRequired,
  editValuesRoot: PropTypes.object.isRequired,

  checkBeforeSubmit: PropTypes.func,
  useFormData: PropTypes.bool,
  getRequestBodyStructure: PropTypes.func.isRequired,
  getApiEndpoint: PropTypes.func.isRequired,
  getErrorRoot: PropTypes.func.isRequired,
  useResponseDataLink: PropTypes.bool,

  createTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,

  children: PropTypes.node.isRequired,
};