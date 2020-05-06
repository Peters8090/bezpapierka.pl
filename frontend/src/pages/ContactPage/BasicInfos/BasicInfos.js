import EditIcon from '@material-ui/icons/Edit';
import React, {useContext, useState} from 'react';
import {
  Avatar,
  Box,
  CardHeader,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import {BasicInfoCreateEditDialog} from '../../../components/CRUD/BasicInfoCreateEditDialog';
import {DialogWithProps} from '../../../components/CRUD/DialogForm/DialogForm';

import {ContactPageContext} from '../ContactPage';

export const BasicInfos = () => {
  const offerInfoContent = useContext(ContactPageContext).basic_infos;

  return (
      <div>
        {
          offerInfoContent.map(info => (
              <BasicInfo key={info.title} info={info}/>
          ))
        }
      </div>
  );
};

const BasicInfo = ({info}) => {
  const [basicInfoEditDialogOpen, setBasicInfoEditDialogOpen] = useState(false);

  return (
      <Box border={1}
           borderColor='grey.600'
           borderRadius='50px'
           mt={1} mb={3}>
        <CardHeader avatar={<Avatar> <Icon>{info.icon}</Icon> </Avatar>}
                    title={
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <Typography
                            display='block'
                            variant='h5'>{info.title}</Typography>
                        <IconButton
                            onClick={() => setBasicInfoEditDialogOpen(
                                prevState => !prevState)}>
                          <EditIcon/>
                        </IconButton>
                      </div>
                    }/>

        <DialogWithProps open={basicInfoEditDialogOpen}
                         setOpen={setBasicInfoEditDialogOpen}>
          <BasicInfoCreateEditDialog isEdit={true} basic_info={info}/>
        </DialogWithProps>
      </Box>
  );
};