import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const LinearProgressWithPlaceholder = props => {
  const styles = {
    placeholder: css`
      height: 4px;
    `,
  };

  if(props.loading)
    return <LinearProgress color='primary'/>;
  else
    return <div css={styles.placeholder}/>
};

LinearProgressWithPlaceholder.propTypes = {
  loading: PropTypes.bool.isRequired,
};