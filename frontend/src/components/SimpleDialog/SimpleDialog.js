import {CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import React, {useState} from 'react';
import uniqid from 'uniqid';
import Draggable from 'react-draggable';
import {SlideTransition} from '../../utility';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

const PaperComponent = ({handleId, ...otherProps}) => (
    <Draggable handle={`#${handleId}`}
               cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...otherProps} />
    </Draggable>
);

export const SimpleDialog = ({
  children, open, setOpen, loading, title, dialogWrapper =
      <div/>, draggable = false,
}) => {
  const [handleId] = useState(uniqid());
  return (
      <Dialog open={open}
              fullWidth={children !== undefined}
              TransitionComponent={SlideTransition}
              PaperComponent={draggable ? PaperComponent : undefined}
              PaperProps={{handleId: handleId}}
              keepMounted
              onClose={() => setOpen(false)}>
        {React.cloneElement(dialogWrapper, {
          children: (
              <React.Fragment>
                <DialogTitle id={handleId}
                             css={{
                               cursor: draggable && 'move',
                             }}>{title}</DialogTitle>
                <DialogContent>
                  {children}
                </DialogContent>
                <DialogActions css={css`height: 50px`}>
                  <Button type='submit'
                          color="secondary"
                          disableRipple={loading}
                          css={{cursor: loading && 'default'}}>
                    {
                      loading
                          ?
                          <CircularProgress color='secondary' size={20}/>
                          :
                          <span>Zatwierdź</span>
                    }
                  </Button>
                </DialogActions>
              </React.Fragment>
          ),
        })}
      </Dialog>
  );
};