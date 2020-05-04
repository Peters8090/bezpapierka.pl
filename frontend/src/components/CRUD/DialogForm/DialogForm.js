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

export const DialogForm = ({title, onSubmit, open, setOpen, children}) => {
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(false);

  const cleanup = () => {
    setFields({});
    setLoading(false);
  };

  return (
      <Dialog open={open}
              onClose={() => setOpen(false)}
              onExited={() => cleanup()}
              keepMounted={false}>
        <form autoComplete="false"
              noValidate
              autoSave="true"
              onSubmit={event => {
                event.preventDefault();
                onSubmit(fields, setLoading);
              }}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogFormContext.Provider
                value={{fields: fields, setFields: setFields}}>
              {children}
            </DialogFormContext.Provider>
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
      </Dialog>
  );
};

DialogForm.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};