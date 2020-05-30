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
import {DeleteDialog} from './CRUDDeleteDialog';
import {CRUDDialog} from './CRUDDialog';

export const CRUDDialogForm = props => {
  const isEdit = !isEmpty(props.editValuesRoot);
  const [loading, setLoading] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteEnabled = isEdit && props.deleteMethod !== undefined;

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
        <CRUDDialog loading={loading} open={deleteDialogOpen ? false : props.open}
                    draggable
                    setOpen={props.setOpen}
                    title={isEdit ? props.editTitle : props.createTitle}
                    dialogWrapper={(
                          <Form
                              getRequestBodyStructure={props.getRequestBodyStructure}
                              getApiEndpoint={props.getApiEndpoint}
                              checkBeforeSubmit={props.checkBeforeSubmit}
                              getErrorRoot={props.getErrorRoot}
                              doAfterSubmit={props.doAfterSubmit ?? pagesContext.fetchPages}
                              sendRequest={isNaN(props.getApiEndpoint().slice(-1))
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
              value={{provideDefaultValue: isEdit, root: props.editValuesRoot}}>
            {props.children}
          </FieldAutoDefaultValueContext.Provider>
        </CRUDDialog>

        {deleteEnabled && (
            <DeleteDialog
                open={deleteDialogOpen}
                setOpen={setDeleteDialogOpen}
                getApiEndpoint={props.getApiEndpoint}
                deleteMethod={props.deleteMethod}
                getRequestBodyStructure={props.getRequestBodyStructure}/>

        )}
      </React.Fragment>
  );
};

CRUDDialogForm.propTypes = {
  editValuesRoot: PropTypes.object.isRequired,

  deleteMethod: PropTypes.func,
  checkBeforeSubmit: PropTypes.func,
  doAfterSubmit: PropTypes.func,
  getRequestBodyStructure: PropTypes.func,
  getApiEndpoint: PropTypes.func.isRequired,
  getErrorRoot: PropTypes.func,

  createTitle: PropTypes.string.isRequired,
  editTitle: PropTypes.string.isRequired,

  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,

  children: PropTypes.node.isRequired,
};

CRUDDialogForm.defaultProps = {
  checkBeforeSubmit: () => {},
};