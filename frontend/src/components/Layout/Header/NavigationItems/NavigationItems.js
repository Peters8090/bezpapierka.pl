import React, {useContext} from "react";

import {NavigationItem} from "./NavigationItem/NavigationItem";
import {PagesContext} from "../../../../contexts/PagesContext";

export const NavigationItems = props => {
    const appContext = useContext(PagesContext);

    return <>
        {
            appContext.map(
                page => (
                    <div className={props.className} key={page.id}>
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