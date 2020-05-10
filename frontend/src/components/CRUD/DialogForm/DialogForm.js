import {CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

export const DialogFormContext = React.createContext({
  fields: [],
  setFields: () => {
  },
});

const PaperComponent = props => (
    <Draggable handle="#draggable-dialog-title"
               cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
);

export const DialogWithProps = ({children, open, setOpen}) => (
    <Dialog open={open}
            PaperComponent={PaperComponent}
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
        <DialogTitle id="draggable-dialog-title" style={{ cursor: 'move' }}>{title}</DialogTitle>
        <DialogContent>
          <DialogFormContext.Provider
              value={{fields: fields, setFields: setFields}}>
            {children}
          </DialogFormContext.Provider>
        </DialogContent>
        <DialogActions style={{
          height: 50,
        }}>
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