import {IconButton, useTheme} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useContext} from 'react';
import {PagesContext} from '../../../App';
import {myAxios} from '../../../axios';
import {isEmpty} from '../../../utility';
import {DialogForm} from '../DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from './Field/Field';

export const CrudDialogForm = ({
  editValuesRoot,

  useDeleteMethodOnApiEndpoint,
  checkBeforeSubmit = () => true,
  getRequestBodyStructure, getApiEndpoint,
  getErrorRoot,

  createTitle, editTitle,

  children,
}) => {
  const isEdit = !isEmpty(editValuesRoot);

  const pagesContext = useContext(PagesContext);

  const onSubmit = async fields => {
    if (!checkBeforeSubmit(fields)) return;

    let data = {};
    Object.values(fields).forEach(field => {
      if (!(isEmpty(field.value)))
        data[field.apiName] = field.value;
    });

    try {
      // if the last character in the api endpoint is aigit,
      // then use patch (post is not allowed), otherwise post (patch is not allowed)
      const sendRequest = isNaN(getApiEndpoint().slice(-1))
          ? myAxios.post
          : myAxios.patch;
      await sendRequest(getApiEndpoint(),
          getRequestBodyStructure(data));

      await pagesContext.fetchData();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Object.entries(getErrorRoot(error)).
            forEach(([fieldName, errors]) => {
              const field = Object.values(fields).
                  find(field => field.apiName === fieldName);
              field.setValidationErrors(errors);
            });
      } else {
        throw error;
      }
    }
  };

  const theme = useTheme();

  return (
      <DialogForm onSubmit={onSubmit}
                  title={isEdit ? editTitle : createTitle}>
        {isEdit && (
            <IconButton
                style={{
                  position: 'absolute',
                  right: theme.spacing(1),
                  top: theme.spacing(1),
                }}
                onClick={async () => {
                  // eslint-disable-next-line no-restricted-globals
                  if (confirm('Czy na pewno?')) {
                    if (useDeleteMethodOnApiEndpoint) {
                      await myAxios.delete(getApiEndpoint());
                    } else {
                      const payload = getRequestBodyStructure();
                      await myAxios.patch(getApiEndpoint(), {...payload});
                    }
                    await pagesContext.fetchData();
                  } else {
                    console.log('Anulowano');
                  }
                }}>
              <DeleteIcon/>
            </IconButton>
        )}

        <FieldAutoDefaultValueContext.Provider
            value={{provideDefaultValue: isEdit, root: editValuesRoot}}>
          {children}
        </FieldAutoDefaultValueContext.Provider>
      </DialogForm>
  );
};

CrudDialogForm.propTypes = {
  editValuesRoot: PropTypes.object.isRequired,

  useDeleteMethodOnApiEndpoint: PropTypes.bool.isRequired,
  checkBeforeSubmit: PropTypes.func,
  getRequestBodyStructure: PropTypes.func.isRequired,
  getApiEndpoint: PropTypes.func.isRequired,
  getErrorRoot: PropTypes.func.isRequired,

  createTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,

  children: PropTypes.node.isRequired,
};