import React, {Fragment, useContext} from "react";

import {NavigationItem} from "./NavigationItem/NavigationItem";
import {PagesContext} from "../../../../contexts/PagesContext";

export const NavigationItems = props => {
    const pages = useContext(PagesContext);

    return <Fragment>
        {
            pages.map(
                page => (
                    <div className={props.className} key={page.link}>
                        <NavigationItem link={page.link}
                                        name={page.name}
                                        icon={page.icon}/>
                    </div>
                )
            )
        }
    </Fragment>
};