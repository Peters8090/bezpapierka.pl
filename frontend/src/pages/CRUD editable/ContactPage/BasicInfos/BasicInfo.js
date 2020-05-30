import {css} from '@emotion/core';
import {
  Avatar,
  CardHeader,
  Icon,
  IconButton,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import useTheme from '@material-ui/core/styles/useTheme';
import EditIcon from '@material-ui/icons/Edit';
import React, {useState} from 'react';
import {LoggedInOnly} from '../../../../components/Auth/LoggedInOnly';
import {BasicInfoAdmin} from '../../../../components/CRUD/Admins/ContactPage/BasicInfoAdmin';
import PropTypes from 'prop-types';

export const BasicInfo = props => {
  const [basicInfoEditDialogOpen, setBasicInfoEditDialogOpen] = useState(false);

  const theme = useTheme();
  const styles = {
    root: css`
      border-radius: 50px;
      margin-top: ${theme.spacing(1)}px;
      margin-bottom: ${theme.spacing(3)}px;
    `,
    cardHeader: css`
      padding: ${theme.spacing(1.5)}px;
    `,
    titleWrapper: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
  };

  return (
      <Paper css={styles.root} elevation={0}>
        <CardHeader
            css={styles.cardHeader}
            avatar={
              <Avatar>
                <Icon>{props.info.icon}</Icon>
              </Avatar>
            }
            title={
              <div css={styles.titleWrapper}>
                <Typography
                    display='block'
                    variant='h6'>{props.info.title}</Typography>
                <LoggedInOnly>
                  <IconButton
                      onClick={() => setBasicInfoEditDialogOpen(true)}>
                    <EditIcon fontSize='small'/>
                  </IconButton>
                </LoggedInOnly>
              </div>
            }/>

        <LoggedInOnly>
          <BasicInfoAdmin basic_info={props.info} open={basicInfoEditDialogOpen}
                          setOpen={setBasicInfoEditDialogOpen}/>
        </LoggedInOnly>
      </Paper>
  );
};

BasicInfo.propTypes = {
  info: PropTypes.object.isRequired,
}