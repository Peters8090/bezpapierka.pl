import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import PropTypes from 'prop-types';
/** @jsx jsx */
import {jsx, css} from '@emotion/core';

export const LinearProgressWithPlaceholder = ({show, ...otherProps}) => {
  const styles = {
    placeholder: css`
      height: 4px;
    `,
  };

  if(show)
    return <LinearProgress {...otherProps}/>;
  else
    return <div css={styles.placeholder}/>
};

LinearProgressWithPlaceholder.propTypes = {
  show: PropTypes.bool.isRequired,
};