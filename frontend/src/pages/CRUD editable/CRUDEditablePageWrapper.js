import React, {useContext, useEffect, useState} from 'react';
import EditIcon from '@material-ui/icons/Edit';

import {ConfigurationContext} from '../../components/Configuration/Configuration';
import {HeaderIconButton} from '../../components/Layout/Header/Header';
import {LayoutContext} from '../../components/Layout/Layout';
import {LoggedInOnly} from '../../components/Auth/LoggedInOnly';
import {PageAdmin} from '../../components/CRUD/Admins/PageAdmin/PageAdmin';
import {useCurrentPage} from '../../components/Pages/Pages';
import {isEmpty} from '../../utility';

export const CRUDEditablePageWrapper = ({children}) => {
  const layoutContext = useContext(LayoutContext);
  const configuration = useContext(ConfigurationContext).configuration;
  const currentPage = useCurrentPage();

  const [pageEditDialogOpen, setPageEditDialogOpen] = useState(false);

  useEffect(() => {
    if (isEmpty(currentPage.background_image)) {
      if (!isEmpty(configuration.default_background_image)) {
        layoutContext.setBackgroundSize(configuration.default_background_size);
        layoutContext.setBackgroundImageURL(
            configuration.default_background_image);
      }
    } else {
      layoutContext.setBackgroundSize(currentPage.background_size);
      layoutContext.setBackgroundImageURL(currentPage.background_image);
    }

    return () => {
      layoutContext.setBackgroundImageURL('');
    };
  }, [
    configuration.default_background_image,
    currentPage.background_image,
    configuration.default_background_size,
    currentPage.background_size]);

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
      <React.Fragment>
        {children}
        <LoggedInOnly>
          <PageAdmin isEdit={true} open={pageEditDialogOpen}
                     setOpen={setPageEditDialogOpen}/>
        </LoggedInOnly>
      </React.Fragment>
  );
};