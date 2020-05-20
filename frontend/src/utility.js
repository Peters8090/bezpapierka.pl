import Slide from '@material-ui/core/Slide';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';

export const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = _ => resolve(reader.result);
  reader.onerror = e => reject(e);
});

export const isEmpty = value => {
  if ([undefined, null, ''].includes(value)) return true;
  if(typeof value === 'object') {
    return Object.keys(value).length <= 0;
  }
  if(Array.isArray(value)) {
    return value.length <= 0;
  }
};

export const insertIfArray = (condition, ...elements) => {
  return condition ? elements : [];
};

export const SlideTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});