import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useEffect, useState} from 'react';
import {HeaderIconButton} from '../../components/Layout/Header/Header';
import {LayoutContext} from '../../components/Layout/Layout';
import {LoggedInOnly} from '../../components/Auth/LoggedInOnly';
import {PageAdmin} from '../../components/CRUD/Admins/PageAdmin';

export const CRUDEditablePageWrapper = ({children}) => {
  const layoutContext = useContext(LayoutContext);

  const [pageEditDialogOpen, setPageEditDialogOpen] = useState(false);

  useEffect(() => {
    layoutContext.setHeaderAdditionalItems((<LoggedInOnly>
      <HeaderIconButton onClick={() => setPageEditDialogOpen(true)}>
        <EditIcon/>
      </HeaderIconButton>
    </LoggedInOnly>));

    return () => {
      layoutContext.setHeaderAdditionalItems(<div/>);
    };
  }, []);

  return (
      <div>
        {children}
        <PageAdmin isEdit={true} open={pageEditDialogOpen}
                   setOpen={setPageEditDialogOpen}/>
      </div>
  );
};