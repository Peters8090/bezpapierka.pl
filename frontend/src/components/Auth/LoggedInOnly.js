import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from './Auth';

export const LoggedInOnly = ({children}) => {
  const isLoggedIn = useContext(AuthContext).isLoggedIn;

  if(isLoggedIn) {
    return children;
  } else {
    return null;
  }
};

LoggedInOnly.propTypes = {
  children: PropTypes.node.isRequired,
};