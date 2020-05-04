import {CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import {FieldsContext} from './Field/Field';
import {Field} from './Field/Field';
import {ImageField} from './Field/Types/ImageField';
import {SelectField} from './Field/Types/SelectField';
import {TextInputField} from './Field/Types/TextInputField';

export const PageCreateEditDialog = props => (
    <Dialog open={props.open[0]} onClose={() => props.open[1](false)}
            keepMounted={false}>
      <DialogForm {...props}/>
    </Dialog>
);

const DialogForm = withRouter(props => {
  const [fields, setFields] = useState({});

  const setOpen = props.open[1];
  const [loading, setLoading] = useState(false);

  return (
      <form autoComplete="false"
            noValidate
            autoSave="true"
            onSubmit={event => {
              event.preventDefault();
              fields.title.setValidationErrors([fields.title.value]);
            }}>
        <DialogTitle>Dodaj stronę</DialogTitle>
        <DialogContent>
          <FieldsContext.Provider
              value={{fields: fields, setFields: setFields}}>
            <Field label='Zaznacz typ strony' apiName='type'>
              <SelectField options={['Strona główna', 'Oferta']}/>
            </Field>
            <Field label='Example' apiName='title'>
              <TextInputField/>
            </Field>
            <Field label='Zdjęcie' apiName='image'>
              <ImageField/>
            </Field>
          </FieldsContext.Provider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Anuluj
          </Button>
          <Button type='submit'
                  color="secondary"
                  disableRipple={loading}
                  style={{cursor: loading && 'default'}}>
            {
              loading ?
                  <CircularProgress color='secondary'
                                    style={{width: '1rem', height: '1rem'}}/> :
                  <span>Zatwierdź</span>
            }
          </Button>
        </DialogActions>
      </form>
  );
});