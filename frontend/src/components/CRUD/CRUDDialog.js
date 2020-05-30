import {LinearProgress} from '@material-ui/core';
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
import {LinearProgressWithPlaceholder} from '../Miscellaneous/LinearProgressWithPlaceholder';

const PaperComponent = ({handleId, ...otherProps}) => (
    <Draggable handle={`#${handleId}`}
               cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...otherProps} />
    </Draggable>
);

export const CRUDDialog = ({
  children, open, setOpen, loading, title, dialogWrapper =
      <div/>, draggable = false, hideViewChangesButton = false,
}) => {
  const [handleId] = useState(uniqid());
  const [hideBackdrop, setHideBackdrop] = useState(false);

  const styles = {
    dialogTitle: css`
      cursor: ${draggable && 'move'};
    `,
    dialogActions: css`
      height: 50px;
      justify-content: space-between;
    `,
  };

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
                             css={styles.dialogTitle}>{title}</DialogTitle>
                <DialogContent>
                  {children}
                </DialogContent>
                <DialogActions
                    css={styles.dialogActions}>
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
                          color='primary'>
                    <span>Zatwierdź</span>
                  </Button>
                </DialogActions>
                <LinearProgressWithPlaceholder show={loading}/>
              </React.Fragment>
          ),
        })}
      </Dialog>
  );
};