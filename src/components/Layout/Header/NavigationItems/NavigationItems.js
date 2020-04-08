import React, {Fragment} from "react";
import {NavigationItem} from "./NavigationItem/NavigationItem";
import HomeIcon from "@material-ui/icons/Home";
import ContactsIcon from "@material-ui/icons/Contacts";

export const NavigationItems = props => (
    <Fragment>
        <div className={props.className}>
            <NavigationItem link="/"
                            name="Home"
                            icon={HomeIcon}/>
        </div>
        <div className={props.className}>
            <NavigationItem link="/kontakt"
                            name="Kontakt"
                            icon={ContactsIcon}/>
        </div>
    </Fragment>
);