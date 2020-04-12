import React, {Fragment, useContext} from "react";

import {NavigationItem} from "./NavigationItem/NavigationItem";
import {AppContext} from "../../../../contexts/AppContext";

export const NavigationItems = props => {
    const appContext = useContext(AppContext);

    return <Fragment>
        {
            appContext.pages.map(
                page => (
                    <div className={props.className} key={page.link}>
                        <NavigationItem link={page.link}
                                        name={page.name}
                                        exact={page.exact}
                                        icon={page.icon}/>
                    </div>
                )
            )
        }
    </Fragment>
};