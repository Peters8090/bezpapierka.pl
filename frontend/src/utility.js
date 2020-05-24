import Slide from '@material-ui/core/Slide';
import React, {useRef, useEffect} from 'react';

export const getBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = _ => resolve(reader.result);
  reader.onerror = e => reject(e);
});

export const isEmpty = value => {
  if ([undefined, null, ''].includes(value)) return true;
  if (typeof value === 'object') {
    return Object.keys(value).length <= 0;
  }
  if (Array.isArray(value)) {
    return value.length <= 0;
  }
};

export const insertIfArray = (condition, ...elements) => {
  return condition ? elements : [];
};

export const SlideTransition = React.forwardRef(
    function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });

export function hexToRGBA(hex, alpha) {
  hex = hex.replace('#', '');
  var r = parseInt(
      hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  var g = parseInt(
      hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  var b = parseInt(
      hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};