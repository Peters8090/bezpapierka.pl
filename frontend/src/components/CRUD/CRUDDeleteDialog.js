import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {SlideTransition} from '../../utility';
import {Form} from '../Form/Form';
import {LinearProgressWithPlaceholder} from '../Miscellaneous/LinearProgressWithPlaceholder';
import {PagesContext} from '../Pages/Pages';

export const DeleteDialog = props => {
  const [loading, setLoading] = useState(false);

  const fetchPages = useContext(PagesContext).fetchPages;

  return (
      <Dialog open={props.open} onClose={() => props.setOpen(false)}
              TransitionComponent={SlideTransition}>
        <Form setLoading={setLoading}
              sendRequest={props.deleteMethod}
              doAfterSubmit={fetchPages}
              getErrorRoot={error => error}
              getApiEndpoint={props.getApiEndpoint}
              getRequestBodyStructure={props.getRequestBodyStructure}>
          <DialogTitle>
            Czy na pewno?
          </DialogTitle>
          <DialogActions>
            <Button type='submit' color='primary'>
              Zatwierdź
            </Button>
          </DialogActions>
        </Form>
        <LinearProgressWithPlaceholder loading={loading}/>
      </Dialog>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  deleteMethod: PropTypes.func.isRequired,
  getApiEndpoint: PropTypes.func.isRequired,
  getRequestBodyStructure: PropTypes.func.isRequired,
};