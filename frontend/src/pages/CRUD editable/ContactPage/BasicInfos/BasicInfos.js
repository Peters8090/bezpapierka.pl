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
import {BasicInfoAdmin} from '../../../../components/CRUD/Admins/ContactPage/BasicInfoAdmin';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {LoggedInOnly} from '../../../../components/Auth/LoggedInOnly';
import {ContactPageContext} from '../ContactPage';

export const BasicInfos = () => {
  const offerInfoContent = useContext(ContactPageContext).basic_infos;

  return (
      <div>
        {
          offerInfoContent.map(info => (
              <BasicInfo key={info.id} info={info}/>
          ))
        }
      </div>
  );
};

const BasicInfo = ({info}) => {
  const [basicInfoEditDialogOpen, setBasicInfoEditDialogOpen] = useState(false);

  return (
      <Box bgcolor='background.paper'
           borderRadius='50px'
           mt={1} mb={3}>
        <CardHeader
            avatar={
              <Avatar color='background.paper.main'>
                <Icon>{info.icon}</Icon>
              </Avatar>
            }
            title={
              <div css={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <Typography
                    display='block'
                    variant='h5'>{info.title}</Typography>
                <LoggedInOnly>
                  <IconButton
                      onClick={() => setBasicInfoEditDialogOpen(
                          prevState => !prevState)}>
                    <EditIcon/>
                  </IconButton>
                </LoggedInOnly>
              </div>
            }/>

        <LoggedInOnly>
          <BasicInfoAdmin basic_info={info} open={basicInfoEditDialogOpen}
                          setOpen={setBasicInfoEditDialogOpen}/>
        </LoggedInOnly>
      </Box>
  );
};