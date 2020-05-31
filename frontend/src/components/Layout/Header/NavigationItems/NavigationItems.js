import React, {useContext} from 'react';

import {PagesContext} from '../../../Pages/Pages';
import {NavigationItem} from './NavigationItem/NavigationItem';

export const NavigationItems = () => {
  const pages = useContext(PagesContext).pages;

  return pages.map(page => (
      <div key={page.id}>
        <NavigationItem link={page.link}
                        name={page.title}
                        exact={page.exact}
                        icon={page.icon}/>
      </div>
  ));
};