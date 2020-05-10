import {IconButton, useTheme} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useContext} from 'react';
import {PagesContext} from '../../../App';
import {myAxios} from '../../../axios';
import {emptyValues} from '../../../utility';
import {DialogForm} from '../DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from './Field/Field';

export const CrudDialogForm = ({
  editValuesRoot,

  useDeleteMethodOnApiEndpoint,
  checkBeforeSubmit = () => true,
  getRequestBodyStructure, getApiEndpoint,
  getErrorRoot,

  targetPage,

  createTitle, editTitle,

  children,
}) => {
  const isEdit = !emptyValues.includes(editValuesRoot);

  const pagesContext = useContext(PagesContext);

  const onSubmit = async fields => {
    if (!checkBeforeSubmit(fields)) return;

    try {
      let data = {};
      Object.values(fields).forEach(field => {
        if (!(emptyValues.includes(field.value)))
          data[field.apiName] = field.value;
      });

      const requestBody = targetPage({...data});

      const sendRequest = requestBody.id ? myAxios.patch : myAxios.post;

      const apiEndpoint = requestBody.id
          ? `${requestBody.apiEndpoint}/${requestBody.id}`
          : requestBody.apiEndpoint;

      await sendRequest(apiEndpoint, requestBody);

      await pagesContext.fetchPages();

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


    // try {
    //   // if the last character in the api endpoint is aigit,
    //   // then use patch (post is not allowed), otherwise post (patch is not allowed)
    //   const sendRequest = isNaN(getApiEndpoint().slice(-1))
    //       ? myAxios.post
    //       : myAxios.patch;
    //   const response = await sendRequest(getApiEndpoint(),
    //       getRequestBodyStructure(data));
    //
    //   window.location.replace(response.data.link);
    // } catch (error) {
    //   if (!emptyValues.includes(error) && typeof error.response.data ===
    //       'object') {
    //     Object.entries(getErrorRoot(error)).
    //         forEach(([fieldName, errors]) => {
    //           const field = Object.values(fields).
    //               find(field => field.apiName === fieldName);
    //
    //           field.setValidationErrors(errors);
    //         });
    //   }
    // }
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
                    window.location.reload();
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