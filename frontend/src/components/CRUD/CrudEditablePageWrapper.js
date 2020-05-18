import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useEffect, useState} from 'react';
import {LayoutContext} from '../Layout/Layout';
import {LoggedInOnly} from '../Miscellaneous/LoggedInOnly';
import {PageAdmin} from './Admins/PageAdmin';

export const CrudEditablePageWrapper = ({children}) => {
  const layoutContext = useContext(LayoutContext);

  const [pageEditDialogOpen, setPageEditDialogOpen] = useState(false);

  useEffect(() => {
    layoutContext.setHeaderAdditionalItems((<LoggedInOnly>
      <IconButton
          onClick={() => setPageEditDialogOpen(true)}>
        <EditIcon/>
      </IconButton>
    </LoggedInOnly>));
  }, []);

  return (
      <React.Fragment>
        {children}
        <PageAdmin isEdit={true} open={pageEditDialogOpen}
                   setOpen={setPageEditDialogOpen}/>
      </React.Fragment>
  );
};