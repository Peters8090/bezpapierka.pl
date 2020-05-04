import React from 'react';
import {DialogForm} from './DialogForm/DialogForm';
import {Field} from './Field/Field';
import {TextInputField} from './Field/Types/TextInputField';

export const PageCreateEditDialog = ({open, setOpen}) => {
  const onSubmit = (fields, setLoading) => {
    setLoading(true);
  };

  return (
      <DialogForm title='Dodaj stronę'
                  onSubmit={onSubmit}
                  open={open}
                  setOpen={setOpen}>
        <Field label='Abc' apiName='Abc'>
          <TextInputField/>
        </Field>
      </DialogForm>
  );
};