import React, {useContext} from "react";

import {NavigationItem} from "./NavigationItem/NavigationItem";
import {PagesContext} from "../../../../contexts/PagesContext";

export const NavigationItems = _ => {
    const pagesContext = useContext(PagesContext);

    return <>
        {
            pagesContext.map(
                page => (
                    <div key={page.id}>
                        <NavigationItem link={page.link}
                                        name={page.title}
                                        exact={page.exact}
                                        icon={page.icon}/>
                    </div>
                )
            )
        }
    </>
};