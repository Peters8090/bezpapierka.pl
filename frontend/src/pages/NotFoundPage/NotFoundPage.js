import React, {useEffect} from 'react';

export const NotFoundPage = ({setIs404}) => {
  useEffect(() => {
    setIs404(true);
    return () => {
      setIs404(false);
    };
  }, []);
  return null;
};
