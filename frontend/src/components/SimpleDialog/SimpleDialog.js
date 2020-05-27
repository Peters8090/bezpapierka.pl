import {CircularProgress} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import useTheme from '@material-ui/core/styles/useTheme';
import Tooltip from '@material-ui/core/Tooltip';
import React, {useState} from 'react';
import uniqid from 'uniqid';
import Draggable from 'react-draggable';
import {SlideTransition} from '../../utility';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
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
      <div/>, draggable = false, hideViewChangesButton = false,
}) => {
  const [handleId] = useState(uniqid());
  const [hideBackdrop, setHideBackdrop] = useState(false);

  const theme = useTheme();

  return (
      <Dialog open={open}
              fullWidth={children !== undefined}
              TransitionComponent={SlideTransition}
              PaperComponent={draggable ? PaperComponent : undefined}
              PaperProps={{handleId: handleId}}
              hideBackdrop={hideBackdrop}
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
                <DialogActions
                    css={css`height: 50px; justify-content: space-between`}>
                  {!hideViewChangesButton ? (
                      <Tooltip title="Naciśnij, aby podejrzeć zmiany">
                        <IconButton onClick={() => setHideBackdrop(
                            prevState => !prevState)}>
                          {hideBackdrop ? <VisibilityOffIcon/> :
                              <VisibilityIcon/>}
                        </IconButton>
                      </Tooltip>
                  ) : <div/>}
                  <Button type='submit'
                          color='primary'
                          disableRipple={loading}
                          css={{cursor: loading && 'default'}}>
                    {
                      loading
                          ?
                          <CircularProgress color='primary' size={20}/>
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