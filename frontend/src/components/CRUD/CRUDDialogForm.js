import React, {useContext, useState} from 'react';
import {IconButton, useTheme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {isEmpty, SlideTransition} from '../../utility';
import {FieldAutoDefaultValueContext} from '../Form/Field/Field';
import {Form} from '../Form/Form';
import {DraggableDialog} from '../Miscellaneous/DraggableDialog';
import {LinearProgressWithPlaceholder} from '../Miscellaneous/LinearProgressWithPlaceholder';
import {PagesContext} from '../Pages/Pages';
import {TranslationContext} from '../Translation/Translation';
import {DeleteDialog} from './CRUDDeleteDialog';

export const CRUDDialogForm = props => {
  const isEdit = !isEmpty(props.editValuesRoot);
  const deleteEnabled = isEdit && props.deleteMethod !== undefined;

  const gettext = useContext(TranslationContext).gettext;
  const translations = {
    submit: gettext('Submit'),
    clickToPreviewChanges: gettext('Click to preview changes'),
  };

  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hideBackdrop, setHideBackdrop] = useState(false);

  const pagesContext = useContext(PagesContext);
  const pagesAxios = useContext(PagesContext).axios;
  const theme = useTheme();

  const styles = {
    deleteButton: css`
      position: absolute;
      right: ${theme.spacing(1)}px;
      top: ${theme.spacing(1)}px;
    `,
    dialogActions: css`
      height: 50px;
      justify-content: space-between;
    `,
  };

  return (
      <React.Fragment>
        <DraggableDialog open={deleteDialogOpen ? false : props.open}
                         onClose={props.onClose} fullWidth
                         TransitionComponent={SlideTransition}
                         hideBackdrop={hideBackdrop}
                         keepMounted>
          <DialogTitle>
            {isEdit ? props.editTitle : props.createTitle}
          </DialogTitle>
          {deleteEnabled && (
              <IconButton css={styles.deleteButton}
                          onClick={() => setDeleteDialogOpen(true)}>
                <DeleteIcon/>
              </IconButton>
          )}
          <Form
              getRequestBodyStructure={props.getRequestBodyStructure}
              getApiEndpoint={props.getApiEndpoint}
              checkBeforeSubmit={props.checkBeforeSubmit}
              getErrorRoot={props.getErrorRoot}
              doAfterSubmit={props.doAfterSubmit ??
              pagesContext.fetchPages}
              sendRequest={isNaN(props.getApiEndpoint().slice(-1))
                  ? pagesAxios.post
                  : pagesAxios.patch}
              setLoading={setLoading}>
            <DialogContent>
              <FieldAutoDefaultValueContext.Provider
                  value={{
                    provideDefaultValue: isEdit,
                    root: props.editValuesRoot,
                  }}>
                {props.children}
              </FieldAutoDefaultValueContext.Provider>
            </DialogContent>
            <DialogActions
                css={styles.dialogActions}>
              <Tooltip title={translations.clickToPreviewChanges}>
                <IconButton onClick={() => setHideBackdrop(
                    prevState => !prevState)}>
                  {hideBackdrop ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                </IconButton>
              </Tooltip>
              <Button type='submit'
                      color='primary'>
                {translations.submit}
              </Button>
            </DialogActions>
            <LinearProgressWithPlaceholder loading={loading}/>
          </Form>
        </DraggableDialog>
        {deleteEnabled && (
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
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
  onClose: PropTypes.func.isRequired,

  children: PropTypes.node.isRequired,
};