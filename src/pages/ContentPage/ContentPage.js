import React, {useContext} from 'react';
import {AppContext} from "../../contexts/AppContext";

export const ContentPage = props => {
    const page = useContext(AppContext).find(page => props.pageId === page.id);

    return (
        <div>
            {page.misc.title}
            <br/>
            {page.misc.subtitle}
        </div>
    );
};