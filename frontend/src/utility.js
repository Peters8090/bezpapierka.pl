import React, {useRef, useEffect} from 'react';
import * as locales from '@material-ui/core/locale';
import Slide from '@material-ui/core/Slide';

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
    (props, ref) => <Slide direction="up" ref={ref} {...props} />);

export function hexToRGBA(hex, alpha) {
  hex = hex.replace('#', '');
  let r = parseInt(
      hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
  let g = parseInt(
      hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
  let b = parseInt(
      hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
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

// examples: en-us => enUS; pl => plPL (like in @material-ui/core/locale)
export const convertLanguageCodeToMaterialUILocale = tag => {
  if(typeof tag !== 'string')
    throw new Error('Language code must be a string.')
  let tagParts = [];
  if (/^[a-zA-Z][a-zA-Z]-[a-zA-Z][a-zA-Z]$/.test(tag))
    tagParts = tag.split('-');
  else if (/^[a-zA-Z][a-zA-Z]$/.test(tag))
    tagParts = [tag, tag];
  else
    throw new Error('Language code is in the wrong format.');

  tagParts[0] = tagParts[0].toLowerCase();
  tagParts[1] = tagParts[1].toUpperCase();

  const locale = tagParts.join('');
  if({...locales}.hasOwnProperty(locale))
    return locales[locale];
  else
    throw new Error('Language code is not supported by @material-ui/core/locale');
};