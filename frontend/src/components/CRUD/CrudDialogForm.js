import {IconButton, useTheme} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, {useContext, useState} from 'react';
import {isEmpty} from '../../utility';
import PropTypes from 'prop-types';
import {FieldAutoDefaultValueContext} from '../Form/Field/Field';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import {Form} from '../Form/Form';
import {PagesContext} from '../Pages/Pages';
import {SimpleDialog} from '../SimpleDialog/SimpleDialog';

export const CrudDialogForm = ({
  editValuesRoot,

  deleteMethod,
  checkBeforeSubmit = (fields) => true,
  doAfterSubmit,
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
  const pagesAxios = useContext(PagesContext).axios;
  const theme = useTheme();

  const styles = {
    deleteButton: css`
      position: absolute;
      right: ${theme.spacing(1)}px;
      top: ${theme.spacing(1)}px;
    `,
  };

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
                              doAfterSubmit={doAfterSubmit ?? pagesContext.fetchPages}
                              sendRequest={isNaN(getApiEndpoint().slice(-1))
                                  ? pagesAxios.post
                                  : pagesAxios.patch}
                              setLoading={setLoading}/>
                      )}>
          {deleteEnabled && (
              <IconButton css={styles.deleteButton}
                          onClick={() => setDeleteDialogOpen(true)}>
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
  doAfterSubmit: PropTypes.func,
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
                                doAfterSubmit={pagesContext.fetchPages}
                                getErrorRoot={error => error}
                                getApiEndpoint={getApiEndpoint}
                                getRequestBodyStructure={getRequestBodyStructure}/>
                      )}/>
      </React.Fragment>
  );
};