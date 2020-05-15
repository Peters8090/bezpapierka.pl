import React, {useContext} from 'react';
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {NavigationItem} from './NavigationItem/NavigationItem';
import {PagesContext} from '../../../../App';

export const NavigationItems = _ => {
  const pagesContext = useContext(PagesContext).pages;

  return (
      <React.Fragment>
        {
          pagesContext.map(
              page => (
                  <div key={page.id}>
                    <NavigationItem link={page.link}
                                    name={page.title}
                                    exact={page.exact}
                                    icon={page.icon}/>
                  </div>
              ),
          )
        }
      </React.Fragment>
  );
};