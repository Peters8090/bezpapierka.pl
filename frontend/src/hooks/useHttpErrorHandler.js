import Snackbar from '@material-ui/core/Snackbar';
import {Alert} from '@material-ui/lab';
import React, {useState} from 'react';
import {isEmpty} from '../utility';

export const useHttpErrorHandler = (throwError = false) => {
  const [isError, setIsError] = useState(false);
  const [messageText, setMessageText] = useState('');


  const handleError = async sendRequest => {
    setIsError(false);
    try {
      await sendRequest();
    } catch (error) {
      if (!error.request)
        throw error;

      if (error.response) {
        setIsError(true);
        setMessageText(`${error.response.status} ${error.response.statusText}`);
      } else {
        setIsError(true);
        setMessageText(error.message);
      }
      if(throwError)
        throw error;
    }
  };

  return {
    handleError: handleError,
    message: (
        <Snackbar open={isError} onClose={() => setIsError(false)}>
          <Alert onClose={() => setIsError(false)} severity='error'>
            Wystąpił błąd: {messageText}
          </Alert>
        </Snackbar>
    ),
    errorHasOccurred: !isEmpty(messageText),
  };
};