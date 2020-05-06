import React from 'react';
import {withRouter} from 'react-router-dom';
import {DialogForm, DialogWithProps} from './DialogForm/DialogForm';
import PropTypes from 'prop-types';

const BasicInfoCreateEditDialogChild = withRouter(
    ({isEdit, location}) => {
      return (
          <DialogForm onSubmit={() => {}}
                      title={isEdit ? 'Edytuj informację' : 'Dodaj informację'}>

          </DialogForm>
      );
    });

BasicInfoCreateEditDialogChild.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export const BasicInfoCreateEditDialog = props => (
    <DialogWithProps setOpen={props.setOpen} open={props.open}>
      <BasicInfoCreateEditDialogChild {...props}/>
    </DialogWithProps>
);

BasicInfoCreateEditDialog.propTypes = {
  ...BasicInfoCreateEditDialogChild.propTypes,
  ...DialogWithProps.propTypes,
};