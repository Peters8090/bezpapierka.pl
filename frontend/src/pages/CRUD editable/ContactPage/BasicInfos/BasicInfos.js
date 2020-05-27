import Paper from '@material-ui/core/Paper';
import useTheme from '@material-ui/core/styles/useTheme';
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
import {jsx, css} from '@emotion/core';
import {LoggedInOnly} from '../../../../components/Auth/LoggedInOnly';
import {useCurrentPage} from '../../../../components/Pages/Pages';

export const BasicInfos = () => {
  const basicInfos = useCurrentPage().basic_infos;

  return (
      <div>
        {
          basicInfos.map(info => (
              <BasicInfo key={info.id} info={info}/>
          ))
        }
      </div>
  );
};

const BasicInfo = ({info}) => {
  const [basicInfoEditDialogOpen, setBasicInfoEditDialogOpen] = useState(false);

  const theme = useTheme();
  const styles = {
    root: css`
      border-radius: 50px;
      margin-top: ${theme.spacing(1)}px;
      margin-bottom: ${theme.spacing(3)}px;
    `,
  };

  return (
      <Paper css={styles.root} elevation={0}>
        <CardHeader
            css={{
              padding: theme.spacing(1.5),
            }}
            avatar={
              <Avatar>
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
                    variant='h6'>{info.title}</Typography>
                <LoggedInOnly>
                  <IconButton
                      onClick={() => setBasicInfoEditDialogOpen(
                          prevState => !prevState)}>
                    <EditIcon fontSize='small'/>
                  </IconButton>
                </LoggedInOnly>
              </div>
            }/>

        <LoggedInOnly>
          <BasicInfoAdmin basic_info={info} open={basicInfoEditDialogOpen}
                          setOpen={setBasicInfoEditDialogOpen}/>
        </LoggedInOnly>
      </Paper>
  );
};