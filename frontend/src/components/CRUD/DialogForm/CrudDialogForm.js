import {CircularProgress, IconButton, useTheme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useContext, useState} from 'react';
import {PagesContext} from '../../../App';
import {myAxios} from '../../../axios';
import {isEmpty, SlideTransition} from '../../../utility';
import {DialogForm} from '../DialogForm/DialogForm';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from './Field/Field';

export const CrudDialogForm = ({
  editValuesRoot,

  deleteMethod,
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
      data[field.apiName] = field.value;
    });

    try {
      // if the last character in the api endpoint is a digit,
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
      <DialogForm onSubmit={onSubmit}
                  title={isEdit ? editTitle : createTitle}>
        {isEdit && deleteMethod !== undefined && (
            <React.Fragment>
              <DeleteDialog open={deleteDialogOpen}
                            setOpen={setDeleteDialogOpen}
                            getApiEndpoint={getApiEndpoint}
                            deleteMethod={deleteMethod}
                            getRequestBodyStructure={getRequestBodyStructure}/>
              <IconButton style={{
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(1),
              }} onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon/>
              </IconButton>
            </React.Fragment>
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

  deleteMethod: PropTypes.oneOf(['delete', 'patch']),
  checkBeforeSubmit: PropTypes.func,
  getRequestBodyStructure: PropTypes.func.isRequired,
  getApiEndpoint: PropTypes.func.isRequired,
  getErrorRoot: PropTypes.func.isRequired,

  createTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,

  children: PropTypes.node.isRequired,
};

const DeleteDialog = ({open, setOpen, deleteMethod, getApiEndpoint, getRequestBodyStructure}) => {
  const [loading, setLoading] = useState(false);

  const pagesContext = useContext(PagesContext);

  return (
      <Dialog open={open}
              TransitionComponent={SlideTransition}
              onClose={() => setOpen(false)}>
        <DialogTitle>Czy na pewno?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpen(false)}
                  color="secondary">
            Anuluj
          </Button>
          <Button color="secondary"
                  onClick={async () => {
                    setLoading(true);
                    if (deleteMethod === 'delete') {
                      await myAxios.delete(getApiEndpoint());
                    } else if (deleteMethod === 'patch') {
                      const payload = getRequestBodyStructure();
                      await myAxios.patch(getApiEndpoint(), {...payload});
                    }
                    await pagesContext.fetchData();
                    setLoading(false);
                    setOpen(false);
                  }}
                  disableRipple={loading}
                  style={{cursor: loading && 'default'}}>
            {
              loading
                  ?
                  <CircularProgress color='secondary'
                                    style={{
                                      width: '1rem',
                                      height: '1rem',
                                    }}/>
                  :
                  <span>OK</span>
            }
          </Button>
        </DialogActions>
      </Dialog>
  );
};