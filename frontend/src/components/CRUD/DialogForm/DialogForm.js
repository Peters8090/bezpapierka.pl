import {CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const DialogFormContext = React.createContext({
  fields: [],
  setFields: () => {
  },
});

export const DialogWithProps = ({children, open, setOpen}) => (
    <Dialog open={open}
            onClose={() => setOpen(false)}
            keepMounted={false}>
      {children}
    </Dialog>
);

DialogWithProps.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export const DialogForm = ({title, onSubmit, children}) => {
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(false);

  return (
        <form autoComplete="false"
              noValidate
              autoSave="true"
              onSubmit={async event => {
                event.preventDefault();
                setLoading(true);
                await onSubmit(fields);
                setLoading(false);
              }}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogFormContext.Provider
                value={{fields: fields, setFields: setFields}}>
              {children}
            </DialogFormContext.Provider>
          </DialogContent>
          <DialogActions>
            <Button type='submit'
                    color="secondary"
                    disableRipple={loading}
                    style={{cursor: loading && 'default'}}>
              {
                loading
                    ?
                    <CircularProgress color='secondary'
                                      style={{width: '1rem', height: '1rem'}}/>
                    :
                    <span>Zatwierdź</span>
              }
            </Button>
          </DialogActions>
        </form>
  );
};

DialogForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};