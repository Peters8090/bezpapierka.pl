import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

import {LoggedInOnly} from '../../../../components/Auth/LoggedInOnly';
import {BasicInfoAdmin} from '../../../../components/CRUD/Admins/ContactPage/BasicInfoAdmin';

export const BasicInfo = props => {
  const [basicInfoEditDialogOpen, setBasicInfoEditDialogOpen] = useState(false);

  const theme = useTheme();
  const styles = {
    root: css`
      border-radius: 50px;
      margin-top: ${theme.spacing(1)}px;
      margin-bottom: ${theme.spacing(3)}px;
      word-break: break-all;
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
            disableTypography
            avatar={
              <Avatar>
                <Icon>{props.info.icon}</Icon>
              </Avatar>
            }
            title={
              <div css={styles.titleWrapper}>
                <Typography
                    display='block'
                    variant='h5'>{props.info.title}
                </Typography>
                <LoggedInOnly>
                  <IconButton
                      onClick={() => setBasicInfoEditDialogOpen(true)}>
                    <EditIcon fontSize='small'/>
                  </IconButton>
                </LoggedInOnly>
              </div>
            } />

        <LoggedInOnly>
          <BasicInfoAdmin basic_info={props.info} open={basicInfoEditDialogOpen}
                          onClose={() => setBasicInfoEditDialogOpen(false)}/>
        </LoggedInOnly>
      </Paper>
  );
};

BasicInfo.propTypes = {
  info: PropTypes.object.isRequired,
}