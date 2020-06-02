import React, {useContext, useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';

import {HeaderIconButton} from '../../components/Layout/Header/Header';
import {LayoutContext} from '../../components/Layout/Layout';
import {LoggedInOnly} from '../../components/Auth/LoggedInOnly';
import {PageAdmin} from '../../components/CRUD/Admins/PageAdmin/PageAdmin';
import {useCurrentPage} from '../../components/Pages/Pages';

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

  const currentPage = useCurrentPage();
  useEffect(() => {
    layoutContext.setBackgroundImage(currentPage.background_image);
    layoutContext.setBackgroundSize(currentPage.background_size);
    layoutContext.setHeadTitleParts([currentPage.title]);
    layoutContext.setHeadDescription(currentPage.description);

    return () => {
      layoutContext.setBackgroundImage('');
      layoutContext.setBackgroundSize('');
      layoutContext.setHeadTitleParts([]);
      layoutContext.setHeadDescription(currentPage.description);
    };
  }, [
    currentPage.background_image,
    currentPage.background_size,
    currentPage.title,
    currentPage.description]);

  return (
      <React.Fragment>
        {children}
        <LoggedInOnly>
          <PageAdmin isEdit={true} open={pageEditDialogOpen}
                     setOpen={setPageEditDialogOpen}/>
        </LoggedInOnly>
      </React.Fragment>
  );
};