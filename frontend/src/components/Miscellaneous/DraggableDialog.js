import React, {useState, cloneElement} from 'react';
import Dialog, {DialogProps} from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import uniqid from 'uniqid';

const PaperComponent = ({handleId, ...otherProps}) => (
    <Draggable handle={`#${handleId}`}
               cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...otherProps} />
    </Draggable>
);

export const DraggableDialog = (props: DialogProps) => {
  const [handleId] = useState(uniqid());

  const dialogTitle = props.children.find(child => child.type === DialogTitle);

  const clonedDialogTitleProps = {
    id: handleId,
    style: {cursor: 'move'},
  };

  return (
      <Dialog PaperComponent={PaperComponent}
              PaperProps={{handleId: handleId}} {...props}>
        {dialogTitle && cloneElement(dialogTitle, clonedDialogTitleProps)}
        {props.children.filter(child => child.type !== DialogTitle)}
      </Dialog>
  );
};