import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {Form} from '../Form/Form';
import {PagesContext} from '../Pages/Pages';
import {CRUDDialog} from './CRUDDialog';

export const DeleteDialog = props => {
  const [loading, setLoading] = useState(false);

  const fetchPages = useContext(PagesContext).fetchPages;

  return (
      <React.Fragment>
        <CRUDDialog open={props.open} setOpen={props.setOpen} loading={loading} hideViewChangesButton
                    title='Czy na pewno?'
                    dialogWrapper={(
                        <Form setLoading={setLoading}
                              sendRequest={props.deleteMethod}
                              doAfterSubmit={fetchPages}
                              getErrorRoot={error => error}
                              getApiEndpoint={props.getApiEndpoint}
                              getRequestBodyStructure={props.getRequestBodyStructure}/>
                    )}/>
      </React.Fragment>
  );
};

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  deleteMethod: PropTypes.func.isRequired,
  getApiEndpoint: PropTypes.func.isRequired,
  getRequestBodyStructure: PropTypes.func.isRequired,
};