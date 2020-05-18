import {IconButton, useTheme} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useContext, useState} from 'react';
import {AuthContext, PagesContext} from '../../App';
import {isEmpty} from '../../utility';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from '../Miscellaneous/Form/Field/Field';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Form} from '../Miscellaneous/Form/Form';
import {SimpleDialog} from '../Miscellaneous/SimpleDialog/SimpleDialog';

export const CrudDialogForm = ({
  editValuesRoot,

  deleteMethod,
  checkBeforeSubmit = (fields) => true,
  getRequestBodyStructure, getApiEndpoint,
  getErrorRoot,

  createTitle, editTitle,

  open, setOpen,

  children,
}) => {
  const isEdit = !isEmpty(editValuesRoot);
  const [loading, setLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteEnabled = isEdit && deleteMethod !== undefined;

  const pagesContext = useContext(PagesContext);
  const myAxios = useContext(AuthContext).axios;
  const theme = useTheme();

  return (
      <React.Fragment>
        <SimpleDialog loading={loading} open={deleteDialogOpen ? false : open}
                      draggable
                      setOpen={setOpen}
                      title={isEdit ? editTitle : createTitle}
                      dialogWrapper={(
                          <Form
                              getRequestBodyStructure={getRequestBodyStructure}
                              getApiEndpoint={getApiEndpoint}
                              checkBeforeSubmit={checkBeforeSubmit}
                              getErrorRoot={getErrorRoot}
                              doAfterSubmit={async () => await pagesContext.fetchData()}
                              sendRequest={isNaN(getApiEndpoint().slice(-1))
                                  ? myAxios.post
                                  : myAxios.patch}
                              setLoading={setLoading}/>
                      )}>
          {deleteEnabled && (
              <IconButton css={{
                position: 'absolute',
                right: theme.spacing(1),
                top: theme.spacing(1),
              }} onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon/>
              </IconButton>
          )}
          <FieldAutoDefaultValueContext.Provider
              value={{provideDefaultValue: isEdit, root: editValuesRoot}}>
            {children}
          </FieldAutoDefaultValueContext.Provider>
        </SimpleDialog>

        {deleteEnabled && (
            <DeleteDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                getApiEndpoint={getApiEndpoint}
                deleteMethod={deleteMethod}
                getRequestBodyStructure={getRequestBodyStructure}/>

        )}
      </React.Fragment>
  );
};

CrudDialogForm.propTypes = {
  editValuesRoot: PropTypes.object.isRequired,

  deleteMethod: PropTypes.func,
  checkBeforeSubmit: PropTypes.func,
  getRequestBodyStructure: PropTypes.func,
  getApiEndpoint: PropTypes.func.isRequired,
  getErrorRoot: PropTypes.func,

  createTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,

  children: PropTypes.node.isRequired,
};

const DeleteDialog = ({open, setOpen, deleteMethod, getApiEndpoint, getRequestBodyStructure}) => {
  const [loading, setLoading] = useState(false);

  const pagesContext = useContext(PagesContext);

  return (
      <React.Fragment>

        <SimpleDialog open={open} setOpen={setOpen} loading={loading}
                      title='Czy na pewno?'
                      dialogWrapper={(
                          <Form setLoading={setLoading}
                                sendRequest={deleteMethod}
                                doAfterSubmit={async () => await pagesContext.fetchData()}
                                getErrorRoot={error => error}
                                getApiEndpoint={getApiEndpoint}
                                getRequestBodyStructure={getRequestBodyStructure}/>
                      )}/>
      </React.Fragment>
  );
};